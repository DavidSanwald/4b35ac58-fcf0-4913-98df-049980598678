import { groupBy, useEvents, useSearchFuseQuery } from "@/api";
import { dateComparator } from "@/api/useEvents";
import { DateHeader, EventCard, EventsList } from "@/components/EventsList";
import { TopBar } from "@/components/TopBar";
import { state } from "@/state";
import dayjs from "dayjs";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { useDeferredValue, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import { PlannedEventsList } from "@/api/schema";

function App() {
  const { status, data } = useEvents();
  const { status: fuseStatus, data: Fuse } = useSearchFuseQuery();
  const [searchParams, _] = useSearchParams("search");
  const defferedSearchParams = useDeferredValue(searchParams.get("search"));
  const cart = useSnapshot(state.cart);
  const groupedEvents = useMemo(() => {
    return (
      (status === "success" &&
        Object.entries(groupBy(data)).reduce((prev, current) => {
          const [date, events] = current;
          const filteredEvents = events.filter((event) => !cart.has(event.id));
          if (filteredEvents.length > 0) {
            prev.push([date, filteredEvents]);
          }
          return prev;
        }, [] as [string, PlannedEventsList][])) ||
      []
    ).sort(dateComparator);
  }, [data, status, cart]);

  const searchedResults = useMemo(
    () =>
      Fuse &&
      defferedSearchParams &&
      defferedSearchParams.length > 3 &&
      Fuse?.search(defferedSearchParams).filter(
        ({ item }) => !cart.has(item.id)
      ),
    [defferedSearchParams, Fuse, fuseStatus, cart.size]
  );
  const isSearchUsed = defferedSearchParams && defferedSearchParams.length > 3;
  const hasSearchResults = searchedResults && searchedResults.length > 0;
  const hasGroupedEvents = groupedEvents.length > 0;

  if (status === "loading")
    return (
      <div className="flex h-full bg-slate-50 flex-col justify-center align-middle">
        <div className="text-center text-slate-800 text-2xl">Loading...</div>
      </div>
    );
  if (status === "error")
    return (
      <div className="flex h-full bg-slate-50 flex-col justify-center align-middle">
        <div className="text-center text-slate-800 text-2xl">Error...</div>
      </div>
    );
  return (
    <div className="mx-auto h-full max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
      <TopBar />
      <div className="relative bg-slate-50 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mb-4 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            <h1 className="mt-12 mb-8">Upcoming Events</h1>
            {!isSearchUsed &&
              hasGroupedEvents &&
              groupedEvents.map(([date, events]) => (
                <LayoutGroup key={date}>
                  <DateHeader dateTitle={date} />
                  <EventsList>
                    {events.map(({ id, ...plannedEvent }) => (
                      <EventCard key={id} {...{ id, ...plannedEvent }} />
                    ))}
                  </EventsList>
                </LayoutGroup>
              ))}
            {isSearchUsed && hasSearchResults && (
              <LayoutGroup>
                <EventsList>
                  {searchedResults.map(({ item }) => (
                    <AnimatePresence key={item.id}>
                      <EventCard key={item.id} {...item} id={item.id} />
                    </AnimatePresence>
                  ))}
                </EventsList>
              </LayoutGroup>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
