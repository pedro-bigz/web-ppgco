import { ListingBody, ListingHeader } from "components";
import { ListingProvider } from "core";
import { columns, filterColumns } from "./Milestones.mock";

export function MilestoneListingPage() {
  return (
    <ListingProvider>
      <ListingHeader title="Marcos Temporais" columns={filterColumns} />
      <ListingBody
        endpoint="/milestones"
        columns={columns}
        track={{
          key: "id",
          label: "description",
        }}
      />
    </ListingProvider>
  );
}
