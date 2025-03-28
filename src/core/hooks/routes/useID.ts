import { useParams } from "react-router-dom";

export function useID(defaultValue: any = undefined) {
  const params = useParams();
  return params?.id ?? defaultValue;
}
