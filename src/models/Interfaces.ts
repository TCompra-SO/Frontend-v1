export interface CountryObj {
  country: string,
  cities?: string[]
}

export interface CountriesRequest {
  verify: 1 | 2 // 1: Solo paises | 2: Paises y ciudades
}

export interface StepsItemContent {
  key: string,
  title: string,
  status: "finish" | "wait" | "process" | "error" | undefined,
  icon: any,
  text: string,
  showInput: boolean
}