import { createContext, ReactNode, useEffect, useState } from "react";
import { CountriesRequest, CountryObj } from "../models/Interfaces";
import useApi from "../hooks/useApi";
import { countriesService, dummyService } from "../services/utilService";
import { CountriesRequestType } from "../utilities/types";

interface ListsContextType {
  countryList: CountryObj[];
  setCountryList: React.Dispatch<React.SetStateAction<CountryObj[]>>;
}

export const ListsContext = createContext<ListsContextType>({
  countryList: [],
  setCountryList: () => {},
});

interface ListsProviderProps {
  children: ReactNode;
}

export function ListsProvider({ children }: ListsProviderProps) {
  const [countryList, setCountryList] = useState<CountryObj[]>([]);
  const { responseData, error, fetchData } =
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (responseData) {
      console.log(responseData);
      setCountryList(responseData);
      console.log(countryList);
    }
  }, [responseData, error]);

  return (
    <ListsContext.Provider value={{ countryList, setCountryList }}>
      {children}
    </ListsContext.Provider>
  );
}
