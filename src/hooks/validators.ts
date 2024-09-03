import { Rule, RuleObject } from "antd/lib/form";
import { useTranslation } from "react-i18next";
import { Lengths } from "../utilities/lengths";
import { useState } from "react";

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

/** Rules */

export function useAddressRules(required: boolean) {
  const [addressRules] = useState<Rule[]>([
    {
      required,
    },
    {
      min: Lengths.address.min,
    },
    {
      max: Lengths.address.max,
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
    },
    {
      max: Lengths.phone.max,
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
    },
    {
      max: Lengths.specialty.max,
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
    },
    {
      max: Lengths.dni.max,
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
    },
    {
      max: Lengths.ruc.max,
    },
  ]);
  return { rucRules };
}

export function useEmailRules(required: boolean, tlds: string[]) {
  const [emailRules] = useState<Rule[]>([
    {
      required,
    },
    {
      type: "email",
    },
    {
      min: Lengths.email.min,
    },
    {
      max: Lengths.email.max,
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
    },
    {
      max: Lengths.password.max,
    },
  ]);
  return { passwordRules };
}
