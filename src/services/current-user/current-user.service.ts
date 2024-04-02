import jwtDecode from "jwt-decode";
import _pick from "lodash/pick";
import { tokenStorage } from "../token-storage/token-storage";

interface UserInterface {
  _id: number;
  name: string;
  email: string;
}

export function currentUser(): UserInterface | null {
  const jwtToken = tokenStorage.getToken();

  if (!jwtToken) return null;

  const user = jwtDecode(jwtToken);

  return _pick(user, ["_id", "nome", "email"]) as UserInterface;
}
