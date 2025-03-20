import { useEffect, useState } from "react";
import {
  RequirementState,
  SocketChangeType,
  TableTypes,
} from "../utilities/types";
import { SocketResponse } from "../models/Interfaces";
import { BasicRequirement, Requirement } from "../models/MainInterfaces";

export default function useSocketQueueHook(
  createCallback: (data: SocketResponse) => void | Promise<void>,
  updateCallback: (
    data: SocketResponse,
    canAddRow: boolean
  ) => void | Promise<void>,
  deleteCallback?: (data: SocketResponse) => void
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

export function useAddOrUpdateRow(
  tableType: TableTypes,
  transformData: (
    data: SocketResponse["dataPack"]["data"][number]
  ) => any | Promise<any>,
  list: any[],
  setList: (list: any[]) => void,
  total: number,
  setTotal: (total: number) => void,
  pageSize: number,
  callback?: () => any,
  useFilter?: boolean | null
) {
  async function addNewRow(
    data: SocketResponse,
    transformedData?: any,
    increaseTotal: boolean = true
  ) {
    const newElem =
      transformedData ?? (await transformData(data["dataPack"]["data"][0]));
    if (newElem) {
      if (list.length >= pageSize)
        setList([newElem, ...list.slice(0, list.length - 1)]);
      else setList([newElem, ...list]);
      if (increaseTotal) setTotal(total + 1);
    }
  }

  async function updateRow(data: SocketResponse, canAddRow: boolean) {
    const ind = list.findIndex((item) => item.key === data.key);
    if (ind != -1) {
      const updElem = await transformData(data["dataPack"]["data"][0]);

      if (updElem) {
        if (tableType == TableTypes.HOME) {
          const requirement: Requirement = updElem as Requirement;
          if (requirement.state != RequirementState.PUBLISHED) {
            if (!useFilter) {
              const newList = [...list.slice(0, ind), ...list.slice(ind + 1)];
              setList(newList);
              setTotal(total - 1);
              if (newList.length == 0) callback?.(); // callback recarga la página de home
            }
          } else insertElementInArray(updElem, ind);
        } else if (
          tableType == TableTypes.REQUIREMENT ||
          tableType == TableTypes.ALL_REQUIREMENTS
        ) {
          const requirement = updElem as BasicRequirement;
          // Verificar si requerimiento ha sido republicado
          if (
            (list[ind] as BasicRequirement).state == RequirementState.EXPIRED && // || list[ind] as BasicRequirement).state == RequirementState.CANCELED
            requirement.state == RequirementState.PUBLISHED &&
            canAddRow
          )
            setList([
              requirement,
              ...list.slice(0, ind),
              ...list.slice(ind + 1),
            ]);
          else insertElementInArray(updElem, ind);
        } else insertElementInArray(updElem, ind);
      }
    } else if (
      tableType == TableTypes.HOME ||
      tableType == TableTypes.REQUIREMENT ||
      tableType == TableTypes.ALL_REQUIREMENTS
    ) {
      // caso republicar requerimiento
      const updElem = await transformData(data["dataPack"]["data"][0]);
      if (updElem.state == RequirementState.PUBLISHED && canAddRow)
        addNewRow(data, updElem, tableType == TableTypes.HOME);
    }
  }

  async function deleteRow(data: SocketResponse) {
    const ind = list.findIndex((item) => item.key === data.key);
    if (ind != -1) {
      const newList = [...list.slice(0, ind), ...list.slice(ind + 1)];
      setList(newList);
      setTotal(total - 1);
      if (newList.length == 0) callback?.(); // recargar página
    }
  }

  function insertElementInArray(updElem: any, ind: number) {
    setList([...list.slice(0, ind), updElem, ...list.slice(ind + 1)]);
  }

  return { updateRow, addNewRow, deleteRow };
}
