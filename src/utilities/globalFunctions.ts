import { RuleObject } from "antd/es/form";

export function validateNumber(_: RuleObject, value: string) {
  if (value && isNaN(Number(value))) {
    return Promise.reject(new Error("Ingresa un número válido"));
  }
  return Promise.resolve();
}
