import { checkImage } from "../utilities/globalFunctions";
import { maxImageSizeMb } from "../utilities/globals";
import { useTranslation } from "react-i18next";
import useShowNotification from "./utilHook";

export function useHandleChangeImage() {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();

  function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const { validImage, validSize } = checkImage(file);
      if (validImage && validSize) return file;
      else if (!validImage) showNotification("error", t("invalidImage"));
      else if (!validSize)
        showNotification(
          "error",
          t("invalidImageSize") + maxImageSizeMb + " mb"
        );
      return null;
    }
    return null;
  }

  return handleChangeImage;
}
