export interface HttpObject {
  data: any | null,
  loading: boolean,
  error: string | null
}

export interface CountryObj {
  country: string,
  cities?: string[]
}

export interface CountriesRequest {
  verify: 1 | 2 // 1: Solo países | 2: Países y ciudades
}

export interface StepsItemContent {
  key: string,
  title: string,
  status: "finish" | "wait" | "process" | "error" | undefined,
  icon: any,
  text: string,
  showInput: boolean
}

export interface Category {
  id: string,
  name: string
}

export interface RequirementSearchItem {
  id: string,
  title: string
}