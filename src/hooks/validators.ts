import { useTranslation } from "react-i18next";

export function useNoBlankSpacesValidator() {
  const { t } = useTranslation();

  const validateNoBlankSpaces = (_: any, value: string) => {
    if (value.trim().length === 0) {
      return Promise.reject(t("noBlankSpaces"));
    }
    return Promise.resolve();
  };

  return validateNoBlankSpaces;
}
