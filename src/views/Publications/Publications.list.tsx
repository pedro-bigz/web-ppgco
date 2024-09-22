import { ListingHeader, ListingBody } from "components";
import { ListingProvider } from "core";
import { columns } from "./Publications.mock";

export function PublicationsListingPage() {
  return (
    <ListingProvider>
      <ListingHeader title="Publicações" columns={columns} />
      <ListingBody endpoint="/publications" columns={columns} />
    </ListingProvider>
  );
}
