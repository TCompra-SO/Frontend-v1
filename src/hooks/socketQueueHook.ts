import { useEffect, useState } from "react";
import { SocketChangeType } from "../utilities/types";
import { SocketResponse } from "../models/Interfaces";

export default function useSocketQueueHook(
  createCallback: (data: any) => void | Promise<void>,
  updateCallback: (data: any) => void | Promise<void>
) {
  const [changesQueue, setChangesQueue] = useState<
    { type: SocketChangeType; key: string; data: any }[]
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
        key:
          payload.typeSocket == SocketChangeType.CREATE
            ? payload.dataPack.data[0].key
            : payload.key,
        data:
          payload.typeSocket == SocketChangeType.CREATE
            ? payload.dataPack.data[0]
            : payload.dataPack,
      },
    ]);
  }

  return { updateChangesQueue };
}
