import { ItemContext } from "../Context/ItemContext";
import { useContext } from "react";

export const useItemContext = () => {
  const context = useContext(ItemContext);

  if (!context) {
    throw Error("useItemContext must be used inside a ItemContextProvider");
  }

  return context;
};
