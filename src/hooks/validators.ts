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
