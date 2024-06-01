import { ListingBody, ListingHeader } from "components";
import { ListingProvider } from "core";
import { columns } from "./Milestones.mock";

export function MilestoneListingPage() {
  return (
    <ListingProvider>
      <ListingHeader title="Marcos Temporais" />
      <ListingBody endpoint="/milestone" columns={columns} />
    </ListingProvider>
  );
}
