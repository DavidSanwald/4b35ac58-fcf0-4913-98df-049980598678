import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
type Props = { to: string; numItems: number };

function ShoppingCartLink({ to, numItems }: Props) {
  return (
    <NavLink to={to} className="group flex">
      {({ isActive }) => {
        return (
          <>
            <ShoppingCartIcon
              className={`h-6 w-6 self-baseline flex-shrink-0 text-slate-400 ${
                isActive && "stroke-2 text-slate-900"
              } group-hover:text-slate-900 stroke-3 mr-2`}
              aria-hidden="true"
            />
            <span
              className={`text-slate-800 font-normal${
                isActive && "text-slate-900 font-bold"
              } group-hover: text-slate-900`}
            >
              {numItems}
            </span>
            <span className="sr-only">Link to Shopping Cart</span>
          </>
        );
      }}
    </NavLink>
  );
}

export { ShoppingCartLink };
