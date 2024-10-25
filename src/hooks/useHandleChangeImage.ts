import { NotificationInstance } from "antd/es/notification/interface";
import { checkImage } from "../utilities/globalFunctions";
import showNotification from "../utilities/notification/showNotification";
import { maxImageSizeMb } from "../utilities/globals";
import { useTranslation } from "react-i18next";

export function useHandleChangeImage(api: NotificationInstance) {
  const { t } = useTranslation();

  function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const { validImage, validSize } = checkImage(file);
      if (validImage && validSize) return file;
      else if (!validImage) showNotification(api, "error", t("invalidImage"));
      else if (!validSize)
        showNotification(
          api,
          "error",
          t("invalidImageSize") + maxImageSizeMb + " mb"
        );
      return null;
    }
    return null;
  }

  return handleChangeImage;
}
