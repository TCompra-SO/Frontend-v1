import { createContext, ReactNode, useEffect, useState } from "react";
import { CountryCities, IdValueObj } from "../models/Interfaces";
import useApi from "../hooks/useApi";
import {
  categoriesService,
  countriesService,
  TLDsService,
} from "../services/utilService";

interface ListsContextType {
  tlds: string[];
  countryList: IdValueObj[];
  countryData: CountryCities;
  categoryList: IdValueObj[];
  // tenureList: IdValueObj[];
}

export const ListsContext = createContext<ListsContextType>({
  countryList: [],
  countryData: {},
  tlds: [],
  categoryList: [],
  // tenureList: [],
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

  // const [tenureList, setTenureList] = useState<IdValueObj[]>([]);
  // const { responseData: tenureResponseData, fetchData: tenureFetchData } =
  //   useApi<any>({
  //     service: tenureService(),
  //     method: "get",
  //   });

  useEffect(() => {
    countryFetchData();
    tldsFetchData();
    categoryFetchData();
    // tenureFetchData();
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

  // useEffect(() => {
  //   setTenureList([
  //     { id: 1, value: "tenure1" },
  //     { id: 2, value: "tenure2" },
  //   ]);
  // }, []);

  return (
    <ListsContext.Provider
      value={{ countryList, countryData, tlds, categoryList }}
    >
      {children}
    </ListsContext.Provider>
  );
}
