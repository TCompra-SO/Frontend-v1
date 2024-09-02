import { createContext, ReactNode, useEffect, useState } from "react";
import {
  CountriesRequest,
  CountryCities,
  CountryObj,
  IdValueObj,
} from "../models/Interfaces";
import useApi from "../hooks/useApi";
import {
  countriesService,
  dummyService,
  TLDsService,
} from "../services/utilService";
import { CountriesRequestType } from "../utilities/types";

const cities = [
  {
    country: {
      id: "PER",
      value: "Perú",
    },
    cities: [
      { id: "Lima", value: "Lima" },
      { id: "Cusco", value: "Cusco" },
      { id: "Arequipa", value: "Arequipa" },
      { id: "Trujillo", value: "Trujillo" },
      { id: "Iquitos", value: "Iquitos" },
      { id: "Chiclayo", value: "Chiclayo" },
      { id: "Piura", value: "Piura" },
      { id: "Tacna", value: "Tacna" },
      { id: "Puno", value: "Puno" },
      { id: "Huancayo", value: "Huancayo" },
      { id: "Ayacucho", value: "Ayacucho" },
      { id: "Huaraz", value: "Huaraz" },
      { id: "Juliaca", value: "Juliaca" },
      { id: "Moquegua", value: "Moquegua" },
      { id: "Tumbes", value: "Tumbes" },
      { id: "Tarapoto", value: "Tarapoto" },
      { id: "Ica", value: "Ica" },
      { id: "Chimbote", value: "Chimbote" },
      { id: "Cajamarca", value: "Cajamarca" },
      { id: "Huánuco", value: "Huánuco" },
    ],
  },
  {
    country: {
      id: "Chile",
      value: "Chile",
    },
    cities: [
      { id: "Santiago", value: "Santiago" },
      { id: "Valparaíso", value: "Valparaíso" },
      { id: "Concepción", value: "Concepción" },
      { id: "La Serena", value: "La Serena" },
      { id: "Antofagasta", value: "Antofagasta" },
      { id: "Temuco", value: "Temuco" },
      { id: "Rancagua", value: "Rancagua" },
      { id: "Iquique", value: "Iquique" },
      { id: "Puerto Montt", value: "Puerto Montt" },
      { id: "Talca", value: "Talca" },
      { id: "Arica", value: "Arica" },
      { id: "Chillán", value: "Chillán" },
      { id: "Osorno", value: "Osorno" },
      { id: "Punta Arenas", value: "Punta Arenas" },
      { id: "Copiapó", value: "Copiapó" },
      { id: "Curicó", value: "Curicó" },
      { id: "Quilpué", value: "Quilpué" },
      { id: "San Antonio", value: "San Antonio" },
      { id: "Calama", value: "Calama" },
      { id: "Ovalle", value: "Ovalle" },
    ],
  },
  {
    country: {
      id: "Colombia",
      value: "Colombia",
    },
    cities: [
      { id: "Bogotá", value: "Bogotá" },
      { id: "Medellín", value: "Medellín" },
      { id: "Cali", value: "Cali" },
      { id: "Cartagena", value: "Cartagena" },
      { id: "Barranquilla", value: "Barranquilla" },
      { id: "Bucaramanga", value: "Bucaramanga" },
      { id: "Pereira", value: "Pereira" },
      { id: "Santa Marta", value: "Santa Marta" },
      { id: "Cúcuta", value: "Cúcuta" },
      { id: "Ibagué", value: "Ibagué" },
      { id: "Manizales", value: "Manizales" },
      { id: "Pasto", value: "Pasto" },
      { id: "Neiva", value: "Neiva" },
      { id: "Montería", value: "Montería" },
      { id: "Villavicencio", value: "Villavicencio" },
      { id: "Armenia", value: "Armenia" },
      { id: "Sincelejo", value: "Sincelejo" },
      { id: "Tunja", value: "Tunja" },
      { id: "Riohacha", value: "Riohacha" },
      { id: "Florencia", value: "Florencia" },
    ],
  },
];

interface ListsContextType {
  countryList: IdValueObj[];
  countryData: CountryCities;
  tlds: string[];
}

export const ListsContext = createContext<ListsContextType>({
  countryList: [],
  countryData: {},
  tlds: [],
});

interface ListsProviderProps {
  children: ReactNode;
}

export function ListsProvider({ children }: ListsProviderProps) {
  const [countryList, setCountryList] = useState<IdValueObj[]>([]);
  const [countryData, setCountryData] = useState<CountryCities>({});
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
      // console.log(countryResponseData);
      const countryData: CountryCities = {};
      const countryList: IdValueObj[] = [];
      cities.forEach((item) => {
        countryData[item.country.id] = {
          value: item.country.value,
          cities: item.cities,
        };
        countryList.push({ id: item.country.id, value: item.country.value });
      });
      setCountryData(countryData);
      setCountryList(countryList);
    }
  }, [countryResponseData, countryError]);

  useEffect(() => {
    if (tldsResponseData) {
      setTlds(tldsResponseData.split("\n").slice(1, -1));
    }
  }, [tldsResponseData]);

  return (
    <ListsContext.Provider value={{ countryList, countryData, tlds }}>
      {children}
    </ListsContext.Provider>
  );
}
