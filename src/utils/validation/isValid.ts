import {
  isValidCnpj,
  isValidPastDate,
  isValidCpf,
  isValidDate,
  isValidTime,
  isValidNumber,
} from "..";

export const isValid = {
  date: isValidDate,
  pastDate: isValidPastDate,
  time: isValidTime,
  cpf: isValidCpf,
  cnpj: isValidCnpj,
  number: isValidNumber,
};
