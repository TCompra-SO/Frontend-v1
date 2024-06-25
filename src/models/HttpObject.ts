export interface HttpObject {
  data: any | null,
  loading: boolean,
  error: { default: string, msg: string } | null
}