import { Rule, RuleObject } from "antd/lib/form";
import { useTranslation } from "react-i18next";
import { Lengths } from "../utilities/lengths";
import { useContext, useState } from "react";
import { ListsContext } from "../contexts/ListsContext";

export function useNumberValidator() {
  const { t } = useTranslation();

  function validateNumber(_: RuleObject, value: string) {
    if (value && isNaN(Number(value))) {
      return Promise.reject(t("validNumber"));
    }
    return Promise.resolve();
  }
  return validateNumber;
}

export function usePositiveNumberValidator() {
  const { t } = useTranslation();

  function validatePositiveNumber(_: RuleObject, value: string) {
    if (value && isNaN(Number(value))) {
      return Promise.reject(t("validNumber"));
    }
    const numberValue = Number(value);
    if (numberValue <= 0) {
      return Promise.reject(t("budgetGreaterThanZero"));
    }
    return Promise.resolve();
  }
  return validatePositiveNumber;
}

export function useNoBlankSpacesValidator() {
  const { t } = useTranslation();

  function validateNoBlankSpaces(_: RuleObject, value: string) {
    if (value)
      if (value.trim().length === 0) {
        return Promise.reject(t("noBlankSpaces"));
      }
    return Promise.resolve();
  }

  return validateNoBlankSpaces;
}

export function useEmailDomainValidator(tlds: string[]) {
  const { t } = useTranslation();

  function validateEmailDomain(_: RuleObject, value: string) {
    if (value && tlds.length > 0) {
      const lastDotIndex: number = value.lastIndexOf(".");
      if (lastDotIndex !== -1) {
        const segment = value.substring(lastDotIndex + 1).toUpperCase();
        if (!tlds.includes(segment))
          return Promise.reject(new Error(t("enterValidEmail")));
      }
    }
    return Promise.resolve();
  }
  return validateEmailDomain;
}

export function useDateOnwardValidator(tlds: string[]) {
  const { t } = useTranslation();

  function validateDateOnward(_: RuleObject, value: string) {
    if (value && tlds.length > 0) {
      const lastDotIndex: number = value.lastIndexOf(".");
      if (lastDotIndex !== -1) {
        const segment = value.substring(lastDotIndex + 1).toUpperCase();
        if (!tlds.includes(segment))
          return Promise.reject(new Error(t("dateBeforeToday")));
      }
    }
    return Promise.resolve();
  }
  return validateDateOnward;
}

export function useTrimmedMinMaxValidator() {
  const { t } = useTranslation();

  function validateTrimmedMinMax(rule: RuleObject, value: string) {
    if (!value) return Promise.resolve();

    const trimmedValue = value.trim();
    if (rule.min && trimmedValue.length < rule.min) {
      return Promise.reject(
        new Error(`${t("minCharMessage")} ${rule.min} ${t("characters")}`)
      );
    }
    if (rule.max && trimmedValue.length > rule.max) {
      return Promise.reject(
        new Error(`${t("maxCharMessage")} ${rule.max} ${t("characters")}`)
      );
    }
    return Promise.resolve();
  }
  return validateTrimmedMinMax;
}

/** Rules */

export function useAddressRules(required: boolean) {
  const [addressRules] = useState<Rule[]>([
    {
      required,
    },
    {
      min: Lengths.address.min,
      max: Lengths.address.max,
      validator: useTrimmedMinMaxValidator(),
    },
    {
      validator: useNoBlankSpacesValidator(),
    },
  ]);
  return { addressRules };
}

export function usePhoneRules(required: boolean) {
  const [phoneRules] = useState<Rule[]>([
    {
      required,
    },
    {
      min: Lengths.phone.min,
      max: Lengths.phone.max,
      validator: useTrimmedMinMaxValidator(),
    },
    {
      validator: useNumberValidator(),
    },
    {
      validator: useNoBlankSpacesValidator(),
    },
  ]);
  return { phoneRules };
}

export function useSpecialtyRules(required: boolean) {
  const [specialtyRules] = useState<Rule[]>([
    {
      required,
    },
    {
      min: Lengths.specialty.min,
      max: Lengths.specialty.max,
      validator: useTrimmedMinMaxValidator(),
    },
    {
      validator: useNoBlankSpacesValidator(),
    },
  ]);
  return { specialtyRules };
}

export function useDniRules(required: boolean) {
  const [dniRules] = useState<Rule[]>([
    {
      required,
    },
    {
      min: Lengths.dni.min,
      max: Lengths.dni.min,
      validator: useTrimmedMinMaxValidator(),
    },
  ]);
  return { dniRules };
}

export function useRucRules(required: boolean) {
  const [rucRules] = useState<Rule[]>([
    {
      required,
    },
    {
      min: Lengths.ruc.min,
      max: Lengths.ruc.min,
      validator: useTrimmedMinMaxValidator(),
    },
  ]);
  return { rucRules };
}

export function useEmailRules(required: boolean) {
  const context = useContext(ListsContext);
  const { tlds } = context;
  const [emailRules] = useState<Rule[]>([
    {
      required,
    },
    {
      type: "email",
    },
    {
      min: Lengths.email.min,
      max: Lengths.email.max,
      validator: useTrimmedMinMaxValidator(),
    },
    {
      validator: useEmailDomainValidator(tlds),
    },
  ]);
  return { emailRules };
}

export function usePasswordRules(required: boolean) {
  const [passwordRules] = useState<Rule[]>([
    {
      required,
    },
    {
      min: Lengths.password.min,
      max: Lengths.password.max,
      validator: useTrimmedMinMaxValidator(),
    },
  ]);
  return { passwordRules };
}

export function useTitleRules(required: boolean) {
  const [titleRules] = useState<Rule[]>([
    {
      required,
    },
    {
      min: Lengths.title.min,
      max: Lengths.title.max,
      validator: useTrimmedMinMaxValidator(),
    },
    {
      validator: useNoBlankSpacesValidator(),
    },
  ]);
  return { titleRules };
}

export function useAboutMeRules(required: boolean) {
  const [aboutMeRules] = useState<Rule[]>([
    {
      required,
    },
    {
      min: Lengths.aboutMe.min,
      max: Lengths.aboutMe.max,
      validator: useTrimmedMinMaxValidator(),
    },
    {
      validator: useNoBlankSpacesValidator(),
    },
  ]);
  return { aboutMeRules };
}

export function useDescriptionCRRules(required: boolean) {
  const [descriptionCRRules] = useState<Rule[]>([
    {
      required,
    },
    {
      min: Lengths.descriptionCR.min,
      max: Lengths.descriptionCR.max,
      validator: useTrimmedMinMaxValidator(),
    },
    {
      validator: useNoBlankSpacesValidator(),
    },
  ]);
  return { descriptionCRRules };
}

export function useOfferDescriptionRules(required: boolean) {
  const [offerDescriptionRules] = useState<Rule[]>([
    {
      required,
    },
    {
      min: Lengths.offerDescription.min,
      max: Lengths.offerDescription.max,
      validator: useTrimmedMinMaxValidator(),
    },
    {
      validator: useNoBlankSpacesValidator(),
    },
  ]);
  return { offerDescriptionRules };
}

export function useTenureRules(required: boolean) {
  const [tenureRules] = useState<Rule[]>([
    {
      required,
    },
    // {
    //   min: Lengths.tenure.min,
    // },
    // {
    //   max: Lengths.tenure.max,
    // },
  ]);
  return { tenureRules };
}

export function useBudgetRules(required: boolean, greaterThanZero?: boolean) {
  const validatePositiveNumberValidator = usePositiveNumberValidator();

  const [budgetRules] = useState<Rule[]>(
    greaterThanZero
      ? [
          {
            required,
          },
          { validator: validatePositiveNumberValidator },
        ]
      : [
          {
            required,
          },
        ]
  );
  return { budgetRules };
}
