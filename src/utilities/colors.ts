import {
  CertificationState,
  CommonFilter,
  OfferState,
  PurchaseOrderState,
  RequirementState,
} from "./types";

export const primaryColor = "#BC1373";
export const mainBackgroundColor = "#ffffff";
export const secondaryBackgroundColor = "#f3f7fa";
export const lightColor = "#fedef3";
export const lighterColor = "#f5e9f0";
export const darkColor = "#510839";
export const linkColor = "#007CD1";
export const tableHeaderTextColor = "#768286";
export const modalBackgroundColor = "#fafafa";
export const white = "#ffffff";
export const rowColor = "#f3f7fa";
export const gray = "#e8e8e8";
export const darkerGray = "#6e6e6e";

export const RequirementStateMeta: {
  [key in RequirementState]: {
    label: string;
    class: string;
  };
} = {
  [RequirementState.SELECTED]: {
    label: "selected",
    class: "es-atendido",
  },
  [RequirementState.FINISHED]: {
    label: "finished",
    class: "es-culminado",
  },
  [RequirementState.PUBLISHED]: {
    label: "published",
    class: "es-publicado",
  },
  [RequirementState.EXPIRED]: {
    label: "expired",
    class: "es-expirado",
  },
  [RequirementState.CANCELED]: {
    label: "canceled",
    class: "es-cancelado",
  },
  [RequirementState.ELIMINATED]: {
    label: "eliminated",
    class: "es-eliminado",
  },
  [RequirementState.DISPUTE]: {
    label: "dispute",
    class: "es-disputa",
  },
};

export const OfferStateMeta: {
  [key in OfferState]: { class: string; label: string };
} = {
  [OfferState.WINNER]: {
    class: "es-atendido",
    label: "winner",
  },
  [OfferState.FINISHED]: {
    class: "es-culminado",
    label: "finished",
  },
  [OfferState.ACTIVE]: {
    class: "es-publicado",
    label: "active",
  },
  [OfferState.CANCELED]: {
    class: "es-cancelado",
    label: "canceled",
  },
  [OfferState.ELIMINATED]: {
    class: "es-eliminado",
    label: "eliminated",
  },
  [OfferState.DISPUTE]: {
    class: "es-disputa",
    label: "dispute",
  },
};

export const PurchaseOrderStateMeta: {
  [key in PurchaseOrderState]: { class: string; label: string };
} = {
  [PurchaseOrderState.FINISHED]: {
    class: "es-culminado",
    label: "finished",
  },

  [PurchaseOrderState.CANCELED]: {
    class: "es-cancelado",
    label: "canceled",
  },
  [PurchaseOrderState.ELIMINATED]: {
    class: "es-eliminado",
    label: "eliminated",
  },
  [PurchaseOrderState.DISPUTE]: {
    class: "es-disputa",
    label: "dispute",
  },
  [PurchaseOrderState.PENDING]: {
    class: "es-atendido",
    label: "pending",
  },
};

export const CardByStateOffer: {
  [key in OfferState]: { label: string; class: string; icon: string };
} = {
  [OfferState.ACTIVE]: {
    label: "activeOffer",
    class: "card-pink",
    icon: "fa-circle-check",
  },
  [OfferState.WINNER]: {
    label: "winningOffer",
    class: "card-green",
    icon: "fa-circle-check",
  },
  [OfferState.FINISHED]: {
    label: "finishedOffer",
    class: "card-blue",
    icon: "fa-circle-check",
  },
  [OfferState.DISPUTE]: {
    label: "disputeOffer",
    class: "card-teal",
    icon: "fa-ban",
  },
  [OfferState.CANCELED]: {
    label: "canceledOffer",
    class: "card-red",
    icon: "fa-ban",
  },
  [OfferState.ELIMINATED]: {
    label: "eliminatedOffer",
    class: "card-black",
    icon: "fa-ban",
  },
};

export const CertificationStateMeta: {
  [key in CertificationState]: { class: string; label: string };
} = {
  [CertificationState.CERTIFIED]: {
    class: "es-culminado",
    label: "certified",
  },

  [CertificationState.REJECTED]: {
    class: "es-cancelado",
    label: "rejected",
  },
  [CertificationState.PENDING]: {
    class: "es-atendido",
    label: "pending",
  },
};

export const filterLabels: {
  [key in CommonFilter]: string;
} = {
  [CommonFilter.ALL]: "all",
  [CommonFilter.ASC]: "ascending",
  [CommonFilter.DESC]: "descending",
};
