import { API_IBGE } from "core/env";

export interface RegionInterface {
  id: number;
  nome: string;
  sigla: string;
}

export interface FederativeUnityInterface {
  id: number;
  nome: string;
  regiao: RegionInterface;
  sigla: string;
}

export interface MesoRegionInterface {
  id: number;
  nome: string;
  UF: FederativeUnityInterface;
}

export interface MicroRegionInterface {
  id: number;
  nome: string;
  mesoregiao: MesoRegionInterface;
}

export interface IntermediateRegionInterface {
  id: number;
  nome: string;
  UF: FederativeUnityInterface;
}

export interface ImmediateRegionInterface {
  id: number;
  nome: string;
  "regiao-intermediaria": IntermediateRegionInterface;
}

export interface CityInterface {
  id: number;
  nome: string;
  microrregiao: RegionInterface;
  "regiao-imediata": ImmediateRegionInterface;
}

export interface CountryIdInterface {
  M49: number;
  "ISO-ALPHA-2": string;
  "ISO-ALPHA-3": string;
}

export interface CountryRegionInterface {
  id: { M49: string };
  nome: string;
}

export interface CountryRegionIntermediariaInterface {
  id: { M49: string };
  nome: string;
}

export interface CountrySubRegionInterface {
  id: { M49: string };
  nome: string;
  regiao: CountryRegionIntermediariaInterface;
}

export interface CountryInterface {
  id: CountryIdInterface;
  nome: string;
  "regiao-intermediaria"?: RegionInterface;
  "sub-regiao": ImmediateRegionInterface;
}

export function ibgeApi<T>(url: string) {
  return new Promise<T>((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(resolve)
      .catch(reject);
  });
}

export const localidadesIbgeApiUrl = `${API_IBGE}/v1/localidades`;

export function listUfs() {
  return ibgeApi<FederativeUnityInterface[]>(
    `${localidadesIbgeApiUrl}/estados`
  );
}

export function listCities(uf: string | number) {
  return ibgeApi<CityInterface[]>(
    `${localidadesIbgeApiUrl}/estados/${uf}/municipios`
  );
}

export function listCountries(orderBy = "nome") {
  return ibgeApi<CountryInterface[]>(
    `${localidadesIbgeApiUrl}/paises?orderBy=${orderBy}`
  );
}
