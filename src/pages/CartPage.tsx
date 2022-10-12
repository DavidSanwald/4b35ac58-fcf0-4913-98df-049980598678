import { useEvents } from "@/api/useEvents";
import { EventsList } from "@/components/EventsList";
import { EventCard } from "@/components/EventsList/EventCard";
import { TopBar } from "@/components/TopBar";
import { state } from "@/state/store";
import { LayoutGroup } from "framer-motion";
import { useMemo } from "react";
import { useSnapshot } from "valtio";

function CartPage() {
  const cart = useSnapshot(state.cart);
  const { status, data } = useEvents();
  const cartEvents = useMemo(
    () => data && data.filter(({ id }) => cart.has(id)),
    [data, cart.size]
  );
  if (status === "loading")
    return <div className="text-xl text-center">Loading...</div>;
  if (status === "error")
    return <div className="text-xl text-center">Error...</div>;

  return (
    <div className="mx-auto h-full max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
      <TopBar />
      <div className="relative h-full bg-slate-50 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mb-4 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            <h1 className="mt-12 mb-12">Shopping Cart</h1>
            <EventsList>
              <LayoutGroup>
                {cartEvents &&
                  cartEvents.map(({ id, ...event }) => (
                    <EventCard key={id} {...{ id, ...event }} />
                  ))}
              </LayoutGroup>
            </EventsList>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CartPage };
