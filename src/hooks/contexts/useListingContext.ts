import { useContext } from "react";
import { ListingContext } from "core";

export const useListingContext = () => {
  return useContext(ListingContext);
};
