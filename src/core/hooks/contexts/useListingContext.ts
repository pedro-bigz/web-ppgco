import { useContext } from "react";
import { ListingContext } from "core";

export function useListingContext() {
  return useContext(ListingContext);
}
