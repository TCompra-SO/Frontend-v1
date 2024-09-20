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
  planTypeService,
  TLDsService,
  whoCanOfferService,
} from "../services/utilService";

interface ListsContextType {
  tlds: string[];
  countryList: IdValueObj[];
  countryData: CountryCities;
  categoryList: IdValueMap;
  currencyList: IdValueAliasMap;
  paymentMethodList: IdValueMap;
  deliveryTimeList: IdValueMap;
  whoCanOfferList: IdValueMap;
  planTypeList: IdValueMap;
}

export const ListsContext = createContext<ListsContextType>({
  countryList: [],
  countryData: {},
  tlds: [],
  categoryList: {},
  currencyList: {},
  paymentMethodList: {},
  deliveryTimeList: {},
  whoCanOfferList: {},
  planTypeList: {},
});

interface ListsProviderProps {
  children: ReactNode;
}

export function ListsProvider({ children }: ListsProviderProps) {
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

  const [categoryList, setCategoryList] = useState<IdValueMap>({});
  const { responseData: categoryResponseData, fetchData: categoryFetchData } =
    useApi<any>({
      service: categoriesService(),
      method: "get",
    });

  const [currencyList, setCurrencyList] = useState<IdValueAliasMap>({});
  const { responseData: currencyResponseData, fetchData: currencyFetchData } =
    useApi<any>({
      service: currencyService(),
      method: "get",
    });

  const [paymentMethodList, setPaymentMethodList] = useState<IdValueMap>({});
  const {
    responseData: paymentMethodResponseData,
    fetchData: paymentMethodFetchData,
  } = useApi<any>({
    service: paymentMethodService(),
    method: "get",
  });

  const [deliveryTimeList, setDeliveryTimeList] = useState<IdValueMap>({});
  const {
    responseData: deliveryTimeResponseData,
    fetchData: deliveryTimeFetchData,
  } = useApi<any>({
    service: deliveryTimeService(),
    method: "get",
  });

  const [whoCanOfferList, setWhoCanOfferList] = useState<IdValueMap>({});
  const {
    responseData: whoCanOfferResponseData,
    fetchData: whoCanOfferFetchData,
  } = useApi<any>({
    service: whoCanOfferService(),
    method: "get",
  });

  const [planTypeList, setPlanTypeList] = useState<IdValueMap>({});
  const { responseData: planTypeResponseData, fetchData: planTypeFetchData } =
    useApi<any>({
      service: planTypeService(),
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
            if (it.alias != "COP") return true;
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
              acc[id] = { value };
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
      if (planTypeResponseData.plans)
        setPlanTypeList(
          planTypeResponseData.plans.reduce(
            (acc: IdValueMap, { id, value }: IdValueObj) => {
              acc[id] = { value };
              return acc;
            },
            {}
          )
        );
    }
  }, [planTypeResponseData]);

  return (
    <ListsContext.Provider
      value={{
        countryList,
        countryData,
        tlds,
        categoryList,
        currencyList,
        paymentMethodList,
        deliveryTimeList,
        whoCanOfferList,
        planTypeList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}
