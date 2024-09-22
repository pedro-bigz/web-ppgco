import { ListingHeader, ListingBody } from "components";
import { ListingProvider } from "core";
import { columns } from "./Notifications.mock";

export function NotificationsListingPage() {
  return (
    <ListingProvider>
      <ListingHeader title="Notificações" columns={columns} />
      <ListingBody endpoint="/notifications" columns={columns} />
    </ListingProvider>
  );
}
