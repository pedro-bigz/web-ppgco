import { useApiQuery } from "core";

export function useGetNotification(notificationId?: string) {
  return useApiQuery({
    endpoint: "/notifications/" + notificationId,
    options: { enabled: Boolean(notificationId) },
    queryKey: ["notifications", String(notificationId)],
  });
}
