import { ListingBody, ListingHeader } from "components";
import { ListingProvider } from "core";
import { columns } from "./subjects.mock";

export function SubjectsListingPage() {
  return (
    <ListingProvider>
      <ListingHeader title="Disciplinas" />

      <ListingBody
        endpoint="/subjects"
        columns={columns}
        actions={[
          {
            label: "teste",
            onClick: (...args: any[]) => console.log("action teste", ...args),
          },
        ]}
      />
    </ListingProvider>
  );
}
