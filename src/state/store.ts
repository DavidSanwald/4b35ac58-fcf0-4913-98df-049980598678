import { proxy } from "valtio";
import { proxySet } from "valtio/utils";
import { Id } from "@/api/schema";

const state = proxy({ cart: proxySet<Id>() });

const addEventId = (id: Id) => {
  state.cart.add(id);
};
const removeEventId = (id: Id) => {
  state.cart.delete(id);
};

export { addEventId, removeEventId, state };
