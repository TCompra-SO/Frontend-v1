type CallbackFunction<T> = (data: T) => Promise<object>;

async function usePost <T>( CallbackFunction: CallbackFunction<T>,  dataToSend: T) {
  const res = await CallbackFunction(dataToSend);
  return res;
}

export default usePost;