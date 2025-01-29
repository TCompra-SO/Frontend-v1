import { useEffect, useState } from "react";
import { SocketChangeType } from "../utilities/types";
import { SocketResponse } from "../models/Interfaces";

export default function useSocketQueueHook(
  createCallback: (data: SocketResponse) => void | Promise<void>,
  updateCallback: (data: SocketResponse) => void | Promise<void>
) {
  const [changesQueue, setChangesQueue] = useState<
    { type: SocketChangeType; key: string; data: SocketResponse }[]
  >([]);

  // Procesa cambios
  useEffect(() => {
    if (changesQueue.length === 0) return;

    async function processQueue() {
      const nextChange = changesQueue[0];
      if (nextChange.type == SocketChangeType.CREATE) {
        await createCallback(nextChange.data);
      } else if (nextChange.type == SocketChangeType.UPDATE)
        await updateCallback(nextChange.data);
      setChangesQueue((prevQueue) => prevQueue.slice(1));
    }

    processQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changesQueue]);

  function updateChangesQueue(payload: SocketResponse) {
    setChangesQueue((prevQueue) => [
      ...prevQueue,
      {
        type: payload.typeSocket,
        key: payload.dataPack.data[0].key, //payload.key,
        data: payload,
      },
    ]);
  }

  return { updateChangesQueue };
}

export function useAddOrUpdateRow(
  transformData: (
    data: SocketResponse["dataPack"]["data"][number]
  ) => any | Promise<any>,
  list: any[],
  setList: (list: any[]) => void,
  total: number,
  setTotal: (total: number) => void
) {
  async function addNewRow(data: SocketResponse) {
    const newElem = await transformData(data["dataPack"]["data"][0]);
    setList([newElem, ...list.slice(0, list.length - 1)]);
    setTotal(total + 1);
  }

  async function updateRow(data: SocketResponse) {
    const ind = list.findIndex((item) => item.key === data.key);
    if (ind != -1) {
      const updElem = await transformData(data["dataPack"]["data"][0]);
      setList([...list.slice(0, ind), updElem, ...list.slice(ind + 1)]);
    }
  }
  return { updateRow, addNewRow };
}
