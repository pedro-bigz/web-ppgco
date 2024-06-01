import { ListingHeader, ListingBody } from "components";
import { columns } from "./Students.mock";
import { ListingProvider } from "core";

export function StudentsListingPage() {
  return (
    <ListingProvider>
      <ListingHeader title="Estudantes" />
      <ListingBody endpoint="/students" columns={columns} />
    </ListingProvider>
  );
}
