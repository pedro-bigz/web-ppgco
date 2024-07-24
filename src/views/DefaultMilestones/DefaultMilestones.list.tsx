import { ListingBody, ListingHeader } from "components";
import { ListingProvider } from "core";
import { columns } from "./DefaultMilestones.mock";

export function DefaultMilestoneListingPage() {
  return (
    <ListingProvider>
      <ListingHeader title="Marcos Temporais" hideFilters hideCreateButton />
      <ListingBody
        endpoint="/default-milestones"
        columns={columns}
        track={{
          key: "courseId",
          label: "courseName",
        }}
        showFooter={false}
      />
    </ListingProvider>
  );
}
