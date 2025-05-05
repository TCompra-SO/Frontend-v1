import { createContext, ReactNode, useEffect, useState } from "react";
import {
  CountryCities,
  IdValueAliasMap,
  IdValueAliasObj,
  IdValueMap,
  IdValueObj,
} from "../models/Interfaces";
import useApi from "../hooks/useApi";
import {
  categoriesService,
  countriesService,
  currencyService,
  deliveryTimeService,
  paymentMethodService,
  TLDsService,
  userRolesService,
  whoCanOfferService,
} from "../services/requests/utilService";
import { UserRoles } from "../utilities/types";
import { getAllPlansService } from "../services/requests/planService";
import { PlanData } from "../models/MainInterfaces";
import { transformToPlanData } from "../utilities/transform";
import { useGetBannedWords } from "../hooks/utilHooks";

interface ListsContextType {
  tlds: string[];
  countryList: IdValueObj[];
  countryData: CountryCities;
  categoryData: IdValueMap;
  currencyData: IdValueAliasMap;
  paymentMethodData: IdValueMap;
  deliveryTimeData: IdValueMap;
  whoCanOfferData: IdValueMap;
  planTypeData: PlanData[];
  userRolesData: IdValueMap;
  defaultPlanId: string;
  censorText: (text: string) => string;
}

export const ListsContext = createContext<ListsContextType>({
  countryList: [],
  countryData: {},
  tlds: [],
  categoryData: {},
  currencyData: {},
  paymentMethodData: {},
  deliveryTimeData: {},
  whoCanOfferData: {},
  planTypeData: [],
  userRolesData: {},
  defaultPlanId: "",
  censorText: () => "",
});

interface ListsProviderProps {
  children: ReactNode;
}

export function ListsProvider({ children }: ListsProviderProps) {
  const { censorText } = useGetBannedWords();
  const [countryList, setCountryList] = useState<IdValueObj[]>([]);
  const [countryData, setCountryData] = useState<CountryCities>({});
  const { responseData: countryResponseData, fetchData: countryFetchData } =
    useApi({
      service: countriesService(),
      method: "get",
    });

  const [tlds, setTlds] = useState<string[]>([]);
  const { responseData: tldsResponseData, fetchData: tldsFetchData } =
    useApi<any>({
      service: TLDsService(),
      method: "get",
    });

  const [categoryData, setCategoryList] = useState<IdValueMap>({});
  const { responseData: categoryResponseData, fetchData: categoryFetchData } =
    useApi<any>({
      service: categoriesService(),
      method: "get",
    });

  const [currencyData, setCurrencyList] = useState<IdValueAliasMap>({});
  const { responseData: currencyResponseData, fetchData: currencyFetchData } =
    useApi<any>({
      service: currencyService(),
      method: "get",
    });

  const [paymentMethodData, setPaymentMethodList] = useState<IdValueMap>({});
  const {
    responseData: paymentMethodResponseData,
    fetchData: paymentMethodFetchData,
  } = useApi<any>({
    service: paymentMethodService(),
    method: "get",
  });

  const [deliveryTimeData, setDeliveryTimeList] = useState<IdValueMap>({});
  const {
    responseData: deliveryTimeResponseData,
    fetchData: deliveryTimeFetchData,
  } = useApi<any>({
    service: deliveryTimeService(),
    method: "get",
  });

  const [whoCanOfferData, setWhoCanOfferList] = useState<IdValueMap>({});
  const {
    responseData: whoCanOfferResponseData,
    fetchData: whoCanOfferFetchData,
  } = useApi<any>({
    service: whoCanOfferService(),
    method: "get",
  });

  const [defaultPlanId, setDefaultPlanId] = useState("");
  const [planTypeData, setPlanTypeList] = useState<PlanData[]>([]);
  const { responseData: planTypeResponseData, fetchData: planTypeFetchData } =
    useApi<any>({
      service: getAllPlansService(),
      method: "get",
    });

  const [userRolesData, setUserRolesData] = useState<IdValueMap>({});
  const { responseData: userRolesResponseData, fetchData: userRolesFetchData } =
    useApi<any>({
      service: userRolesService(),
      method: "get",
    });

  useEffect(() => {
    countryFetchData();
    tldsFetchData();
    categoryFetchData();
    currencyFetchData();
    paymentMethodFetchData();
    deliveryTimeFetchData();
    whoCanOfferFetchData();
    planTypeFetchData();
    userRolesFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (countryResponseData) {
      const countryData: CountryCities = {};
      const countryList: IdValueObj[] = [];
      countryResponseData.forEach((item: any) => {
        countryData[item.id] = {
          value: item.value,
          cities: item.cities,
        };
        countryList.push({ id: item.id, value: item.value });
      });
      setCountryData(countryData);
      setCountryList(countryList);
    }
  }, [countryResponseData]);

  useEffect(() => {
    if (tldsResponseData) {
      setTlds(tldsResponseData.split("\n").slice(1, -1));
    }
  }, [tldsResponseData]);

  useEffect(() => {
    if (categoryResponseData) {
      setCategoryList(
        categoryResponseData.reduce(
          (acc: IdValueMap, { id, value }: IdValueObj) => {
            acc[id] = { value };
            return acc;
          },
          {}
        )
      );
    }
  }, [categoryResponseData]);

  useEffect(() => {
    if (currencyResponseData) {
      if (currencyResponseData.currencies) {
        const temp: IdValueAliasObj[] = currencyResponseData.currencies.filter(
          (it: IdValueAliasObj) => {
            if (it.alias != "COP") return true; // Descartar COP temporalmente
          }
        );
        setCurrencyList(
          temp.reduce(
            (acc: IdValueAliasMap, { id, value, alias }: IdValueAliasObj) => {
              acc[id] = { value, alias };
              return acc;
            },
            {}
          )
        );
      }
    }
  }, [currencyResponseData]);

  useEffect(() => {
    if (paymentMethodResponseData) {
      if (paymentMethodResponseData.methods)
        setPaymentMethodList(
          paymentMethodResponseData.methods.reduce(
            (acc: IdValueMap, { id, value }: IdValueObj) => {
              if (id != 5) acc[id] = { value }; // Descartar intercambio temporalmente
              return acc;
            },
            {}
          )
        );
    }
  }, [paymentMethodResponseData]);

  useEffect(() => {
    if (deliveryTimeResponseData) {
      if (deliveryTimeResponseData.times)
        setDeliveryTimeList(
          deliveryTimeResponseData.times.reduce(
            (acc: IdValueMap, { id, value }: IdValueObj) => {
              acc[id] = { value };
              return acc;
            },
            {}
          )
        );
    }
  }, [deliveryTimeResponseData]);

  useEffect(() => {
    if (whoCanOfferResponseData) {
      if (whoCanOfferResponseData.bidders)
        setWhoCanOfferList(
          whoCanOfferResponseData.bidders.reduce(
            (acc: IdValueMap, { id, value }: IdValueObj) => {
              acc[id] = { value };
              return acc;
            },
            {}
          )
        );
    }
  }, [whoCanOfferResponseData]);

  useEffect(() => {
    if (planTypeResponseData) {
      try {
        const plans = ((planTypeResponseData.data as any[]) ?? []).map((plan) =>
          transformToPlanData(plan)
        );
        setPlanTypeList(plans);
        const defaultPlan = plans.find((plan) => plan.default == true);
        if (defaultPlan) setDefaultPlanId(defaultPlan.uid);
        else setDefaultPlanId("");
      } catch (e) {
        console.log(e);
        setPlanTypeList([]);
        setDefaultPlanId("");
      }
    }
  }, [planTypeResponseData]);

  useEffect(() => {
    if (userRolesResponseData) {
      setUserRolesData(
        userRolesResponseData
          .filter(({ id }: IdValueObj) => {
            return id != UserRoles.ADMIN && id != UserRoles.LEGAL; // Descartar Admin, legal
          })
          .reduce((acc: IdValueMap, { id, value }: IdValueObj) => {
            acc[id] = { value };
            return acc;
          }, {})
      );
    }
  }, [userRolesResponseData]);

  return (
    <ListsContext.Provider
      value={{
        countryList,
        countryData,
        tlds,
        categoryData,
        currencyData,
        paymentMethodData,
        deliveryTimeData,
        whoCanOfferData,
        planTypeData,
        userRolesData,
        defaultPlanId,
        censorText,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}
