export interface Option {
    id: number,
    text: string,
    selected: boolean,
    icon: JSX.Element
}

export interface CardOptionsType {
    listOptions: Option[]
}