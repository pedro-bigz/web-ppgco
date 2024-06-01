import { ListingBody, ListingHeader } from "components";
import { ListingProvider } from "core";
import { columns } from "./subjects.mock";

export function SubjectsListingPage() {
  return (
    <ListingProvider>
      <ListingHeader title="Disciplinas" />
      <ListingBody endpoint="/subjects" columns={columns} />
    </ListingProvider>
  );
}
