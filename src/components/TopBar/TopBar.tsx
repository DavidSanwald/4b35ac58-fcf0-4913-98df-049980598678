import { state } from "@/state/store";
import { NavLink, useMatch } from "react-router-dom";
import { useSnapshot } from "valtio";
import { SearchInput } from "./SearchInput";
import { ShoppingCartLink } from "./ShoppingCartLink";

function TopBar() {
  const cart = useSnapshot(state.cart);
  const path = useMatch("/");
  return (
    <header className="relative bg-slate-100">
      <nav aria-label="Top" className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative border-b border-slate-200 px-4 pb-14 sm:static sm:px-0 sm:pb-0">
          <div className="flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <NavLink
                className={({ isActive }) =>
                  `mr-auto text-slate-800 py-5 hover:border-b-4 border-slate-600" ${
                    isActive && "font-semibold border-b-4 border-slate-600"
                  }`
                }
                to={"/"}
                end
              >
                Shop
              </NavLink>
              {path && <SearchInput />}
              <ShoppingCartLink to="/cart" numItems={cart.size} />
              <span className="sr-only">items in cart</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export { TopBar };
