import { useApiQuery } from "core";
import {
  ValidateTokenFormDto,
  ValidateTokenFormResponseDto,
} from "./getValidateToken.dto";

export function useGetValidateToken({ token }: ValidateTokenFormDto) {
  const { data, ...response } = useApiQuery<ValidateTokenFormResponseDto>({
    endpoint: `/reset-password/validate-token/${token}`,
    message: {
      error: "Não encontrado",
    },
  });

  return { data: !!data?.success, ...response } 
}
