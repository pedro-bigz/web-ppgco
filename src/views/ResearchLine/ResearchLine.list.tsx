import { ListingHeader, ListingBody } from "components";
import { ListingProvider } from "core";
import { columns } from "./ResearchLine.mock";

export const ResearchLineListingPage = () => {
  return (
    <ListingProvider>
      <ListingHeader title="Linhas de Pesquisa" />
      <ListingBody endpoint="/research-lines" columns={columns} />
    </ListingProvider>
  );
};
