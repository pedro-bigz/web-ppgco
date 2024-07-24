import { ListingBody, ListingHeader } from "components";
import { ListingProvider } from "core";
import { columns } from "./Users.mock";

export function UsersListingPage() {
  return (
    <ListingProvider>
      <ListingHeader title="Usuários" columns={columns} />
      <ListingBody endpoint="/users" columns={columns} />
    </ListingProvider>
  );
}
