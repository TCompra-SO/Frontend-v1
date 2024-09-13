import { createContext, ReactNode, useEffect, useState } from "react";
import {
  CountryCities,
  IdValueAliasObj,
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
  categoryList: IdValueObj[];
  currencyList: IdValueAliasObj[];
  paymentMethodList: IdValueObj[];
  deliveryTimeList: IdValueObj[];
  whoCanOfferList: IdValueObj[];
  planTypeList: IdValueObj[];
}

export const ListsContext = createContext<ListsContextType>({
  countryList: [],
  countryData: {},
  tlds: [],
  categoryList: [],
  currencyList: [],
  paymentMethodList: [],
  deliveryTimeList: [],
  whoCanOfferList: [],
  planTypeList: [],
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

  const [categoryList, setCategoryList] = useState<IdValueObj[]>([]);
  const { responseData: categoryResponseData, fetchData: categoryFetchData } =
    useApi<any>({
      service: categoriesService(),
      method: "get",
    });

  const [currencyList, setCurrencyList] = useState<IdValueAliasObj[]>([]);
  const { responseData: currencyResponseData, fetchData: currencyFetchData } =
    useApi<any>({
      service: currencyService(),
      method: "get",
    });

  const [paymentMethodList, setPaymentMethodList] = useState<IdValueObj[]>([]);
  const {
    responseData: paymentMethodResponseData,
    fetchData: paymentMethodFetchData,
  } = useApi<any>({
    service: paymentMethodService(),
    method: "get",
  });

  const [deliveryTimeList, setDeliveryTimeList] = useState<IdValueObj[]>([]);
  const {
    responseData: deliveryTimeResponseData,
    fetchData: deliveryTimeFetchData,
  } = useApi<any>({
    service: deliveryTimeService(),
    method: "get",
  });

  const [whoCanOfferList, setWhoCanOfferList] = useState<IdValueObj[]>([]);
  const {
    responseData: whoCanOfferResponseData,
    fetchData: whoCanOfferFetchData,
  } = useApi<any>({
    service: whoCanOfferService(),
    method: "get",
  });

  const [planTypeList, setPlanTypeList] = useState<IdValueObj[]>([]);
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
      setCategoryList(categoryResponseData);
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
        setCurrencyList(temp);
      }
    }
  }, [currencyResponseData]);

  useEffect(() => {
    if (paymentMethodResponseData) {
      if (paymentMethodResponseData.methods)
        setPaymentMethodList(paymentMethodResponseData.methods);
    }
  }, [paymentMethodResponseData]);

  useEffect(() => {
    if (deliveryTimeResponseData) {
      if (deliveryTimeResponseData.times)
        setDeliveryTimeList(deliveryTimeResponseData.times);
    }
  }, [deliveryTimeResponseData]);

  useEffect(() => {
    if (whoCanOfferResponseData) {
      if (whoCanOfferResponseData.bidders)
        setWhoCanOfferList(whoCanOfferResponseData.bidders);
    }
  }, [whoCanOfferResponseData]);

  useEffect(() => {
    if (planTypeResponseData) {
      if (planTypeResponseData.plans)
        setPlanTypeList(planTypeResponseData.plans);
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
