import { createContext, ReactNode, useEffect, useState } from "react";
import { CountriesRequest, CountryObj } from "../models/Interfaces";
import useApi from "../hooks/useApi";
import {
  countriesService,
  dummyService,
  TLDsService,
} from "../services/utilService";
import { CountriesRequestType } from "../utilities/types";

interface ListsContextType {
  countryList: CountryObj[];
  setCountryList: React.Dispatch<React.SetStateAction<CountryObj[]>>;
  tlds: string[];
}

export const ListsContext = createContext<ListsContextType>({
  countryList: [],
  setCountryList: () => {},
  tlds: [],
});

interface ListsProviderProps {
  children: ReactNode;
}

export function ListsProvider({ children }: ListsProviderProps) {
  const [countryList, setCountryList] = useState<CountryObj[]>([]);
  const {
    responseData: countryResponseData,
    error: countryError,
    fetchData: countryFetchData,
  } =
    // useApi<CountriesRequest>({
    //   service: countriesService,
    //   method: "post",
    //   dataToSend: { verify: CountriesRequestType.COUNTRY_CITY },
    // });
    useApi<any>({
      service: dummyService,
      method: "post",
      dataToSend: { name: "morpheus", job: "leader" },
    });

  const [tlds, setTlds] = useState<string[]>([]);
  const { responseData: tldsResponseData, fetchData: tldsFetchData } =
    useApi<any>({
      service: TLDsService,
      method: "get",
    });

  useEffect(() => {
    countryFetchData();
    tldsFetchData();
  }, []);

  useEffect(() => {
    if (countryResponseData) {
      console.log(countryResponseData);
      setCountryList(countryResponseData);
    }
  }, [countryResponseData, countryError]);

  useEffect(() => {
    if (tldsResponseData) {
      setTlds(tldsResponseData.split("\n").slice(1, -1));
    }
  }, [tldsResponseData]);

  return (
    <ListsContext.Provider value={{ countryList, setCountryList, tlds }}>
      {children}
    </ListsContext.Provider>
  );
}
