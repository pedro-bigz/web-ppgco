import { ListingHeader, ListingBody } from "components";
import { ListingProvider } from "core";
import { columns } from "./Professors.mock";

export function ProfessorsListingPage() {
  return (
    <ListingProvider>
      <ListingHeader title="Professores" />
      <ListingBody endpoint="/advisors" columns={columns} />
    </ListingProvider>
  );
}
