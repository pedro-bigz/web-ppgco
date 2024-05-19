import { useParams } from "react-router-dom";

export function useID(defaultValue = undefined) {
  const params = useParams();
  return params.id ?? defaultValue;
}
