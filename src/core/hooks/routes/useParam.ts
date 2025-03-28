import { useParams } from "react-router-dom";

export function useParam(key: string, defaultValue: any = undefined) {
  const params = useParams();
  return params?.[key] ?? defaultValue;
}
