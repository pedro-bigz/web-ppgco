import { ListingHeader, ListingBody } from "components";
import { ListingProvider } from "core";
import { columns } from "./ResearchLine.mock";

export function ResearchLineListingPage() {
  return (
    <ListingProvider>
      <ListingHeader title="Linhas de Pesquisa" columns={columns} />
      <ListingBody endpoint="/research-lines" columns={columns} />
    </ListingProvider>
  );
}
