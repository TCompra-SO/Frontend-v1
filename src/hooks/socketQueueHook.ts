import { useEffect, useState } from "react";
import {
  RequirementState,
  RequirementType,
  SocketChangeType,
  TableTypes,
} from "../utilities/types";
import { SocketResponse } from "../models/Interfaces";
import { BasicRequirement, Requirement } from "../models/MainInterfaces";
import {
  getReversedTransformFieldNameObject,
  isFieldValueI,
  isUserCounterKey,
} from "../utilities/globalFunctions";

export default function useSocketQueueHook(
  createCallback: (data: SocketResponse) => void | Promise<void>,
  updateCallback: (
    data: SocketResponse,
    canAddRow: boolean
  ) => void | Promise<void>,
  deleteCallback?: (data: SocketResponse) => void,
  updateFieldCallback?: (data: SocketResponse) => void
) {
  const [changesQueue, setChangesQueue] = useState<
    {
      type: SocketChangeType;
      key: string;
      data: SocketResponse;
      canAddRowUpdate: boolean;
    }[]
  >([]);

  // Procesa cambios
  useEffect(() => {
    if (changesQueue.length === 0) return;

    async function processQueue() {
      const nextChange = changesQueue[0];
      if (nextChange.type == SocketChangeType.CREATE) {
        await createCallback(nextChange.data);
      } else if (nextChange.type == SocketChangeType.UPDATE)
        await updateCallback(nextChange.data, nextChange.canAddRowUpdate);
      else if (nextChange.type == SocketChangeType.DELETE)
        deleteCallback?.(nextChange.data);
      else if (nextChange.type == SocketChangeType.UPDATE_FIELD)
        updateFieldCallback?.(nextChange.data);
      setChangesQueue((prevQueue) => prevQueue.slice(1));
    }

    processQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changesQueue]);

  function updateChangesQueue(
    payload: SocketResponse,
    canAddRowUpdate: boolean = true
  ) {
    setChangesQueue((prevQueue) => [
      ...prevQueue,
      {
        type: payload.typeSocket,
        key: payload.key,
        data: payload,
        canAddRowUpdate,
      },
    ]);
  }

  function resetChangesQueue() {
    setChangesQueue([]);
  }

  return { updateChangesQueue, resetChangesQueue };
}

export function useActionsForRow(
  tableType: TableTypes,
  transformData: (
    data: SocketResponse["dataPack"]["data"][number]
  ) => any | Promise<any>,
  list: any[],
  setList: React.Dispatch<React.SetStateAction<any[]>>,
  total: number,
  setTotal: (total: number) => void,
  pageSize: number,
  callback?: () => any,
  getUseFilter?: () => boolean | null
) {
  async function addNewRow(
    data: SocketResponse,
    transformedData?: any,
    increaseTotal: boolean = true
  ) {
    try {
      const newElem =
        transformedData ?? (await transformData(data.dataPack.data[0]));
      if (newElem) {
        let insert: boolean = false;
        if (tableType == TableTypes.HOME) {
          // Verificar que sea una liquidación válida
          const requirement: Requirement = newElem as Requirement;
          if (
            requirement.type != RequirementType.SALE ||
            (requirement.type == RequirementType.SALE && requirement.valid)
          )
            insert = true;
        } else insert = true;
        if (insert) {
          if (list.length >= pageSize)
            setList([newElem, ...list.slice(0, list.length - 1)]);
          else setList([newElem, ...list]);
          if (increaseTotal) setTotal(total + 1);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function updateRow(data: SocketResponse, canAddRow: boolean) {
    try {
      const ind = list.findIndex((item) => (item.key ?? item.uid) === data.key);
      if (ind != -1) {
        // actualizar elemento
        const updElem = await transformData(data.dataPack.data[0]);

        if (updElem) {
          if (
            tableType == TableTypes.HOME ||
            tableType == TableTypes.ADMIN_SALES
          ) {
            const requirement: Requirement = updElem as Requirement;
            // Cambio a estado no publicado (ambos) o publicado-inválido (solo home) implica eliminar elemento
            if (
              requirement.state != RequirementState.PUBLISHED ||
              (tableType == TableTypes.HOME &&
                requirement.type == RequirementType.SALE &&
                requirement.state == RequirementState.PUBLISHED &&
                !requirement.valid)
            ) {
              if (!getUseFilter?.()) {
                // no filtros
                const prevLen = list.length;
                const newList = list.filter(
                  (item) => (item.key ?? item.uid) !== data.key
                );
                setList(newList);
                setTotal(total - (prevLen - newList.length));
                if (newList.length == 0) callback?.(); // callback debería recargar la página de home
              }
              return;
            }
            //  estado publicado o publicado-válido implica actualizar elemento
            if (
              requirement.state == RequirementState.PUBLISHED &&
              ((tableType == TableTypes.HOME &&
                requirement.type == RequirementType.SALE &&
                requirement.valid) ||
                (tableType == TableTypes.HOME &&
                  requirement.type != RequirementType.SALE) ||
                tableType == TableTypes.ADMIN_SALES)
            )
              updateElementInArray(updElem);
          } else if (
            tableType == TableTypes.REQUIREMENT ||
            tableType == TableTypes.ALL_REQUIREMENTS
          ) {
            const requirement = updElem as BasicRequirement;
            // Verificar si requerimiento ha sido republicado
            const item = list.find(
              (item) => (item.key ?? item.uid) === data.key
            );
            if (
              item &&
              (item as BasicRequirement).state == RequirementState.EXPIRED && // || list[ind] as BasicRequirement).state == RequirementState.CANCELED
              requirement.state == RequirementState.PUBLISHED &&
              canAddRow
            )
              setList([
                requirement,
                ...list.filter((item) => (item.key ?? item.uid) !== data.key),
              ]);
            else updateElementInArray(updElem);
          } else updateElementInArray(updElem);
        }
      } else {
        // insertar nuevo elemento
        if (
          tableType == TableTypes.HOME ||
          tableType == TableTypes.ADMIN_SALES
        ) {
          // caso republicar requerimiento
          const updElem = await transformData(data.dataPack.data[0]);
          const requirement: Requirement = updElem as Requirement;
          if (
            tableType == TableTypes.ADMIN_SALES ||
            (tableType == TableTypes.HOME &&
              (requirement.type != RequirementType.SALE ||
                (requirement.type == RequirementType.SALE &&
                  requirement.valid)))
          )
            if (
              requirement &&
              requirement.state == RequirementState.PUBLISHED &&
              canAddRow
            )
              addNewRow(data, requirement, true);
        } else if (
          tableType == TableTypes.REQUIREMENT ||
          tableType == TableTypes.ALL_REQUIREMENTS
        ) {
          // caso republicar requerimiento
          const updElem = await transformData(data.dataPack.data[0]);
          if (
            updElem &&
            updElem.state == RequirementState.PUBLISHED &&
            canAddRow
          )
            addNewRow(data, updElem, false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  function deleteRow(data: SocketResponse) {
    try {
      const prevLen = list.length;
      const newList = list.filter(
        (item) => (item.key ?? item.uid) !== data.key
      );
      setList(newList);
      setTotal(total - (prevLen - newList.length));
      if (newList.length == 0) callback?.(); // callback debería recargar página
    } catch (e) {
      console.log(e);
    }
  }

  function updateFieldInRow(data: SocketResponse) {
    try {
      const newObj = list.find((item) => (item.key ?? item.uid) === data.key);

      if (newObj) {
        data.dataPack.data.forEach((pair) => {
          if (isFieldValueI(pair)) {
            Object.keys(pair).forEach((key) => {
              const transformObject =
                getReversedTransformFieldNameObject(tableType);
              const newKey = transformObject ? transformObject[key] : key;
              if (isUserCounterKey(newKey)) newObj[newKey] += pair[key];
              else newObj[newKey] = pair[key];
            });
          }
        });
        updateElementInArray(newObj);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function updateElementInArray(updElem: any) {
    setList((prevList: any[]) => {
      const index = prevList.findIndex(
        (item: any) => (item.key ?? item.uid) === (updElem.key ?? updElem.uid)
      );
      if (index === -1) return prevList;
      const newList = [...prevList];
      newList[index] = updElem;
      return newList;
    });
  }

  return { updateRow, addNewRow, deleteRow, updateFieldInRow };
}
