import {
  groupBy,
  PlannedEventsList,
  useEvents,
  useSearchFuseQuery,
} from "@/api";
import { DateHeader, EventCard, EventsList } from "@/components/EventsList";
import { TopBar } from "@/components/TopBar";
import { state } from "@/state";
import dayjs from "dayjs";
import { LayoutGroup } from "framer-motion";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSnapshot } from "valtio";

const dateComparator = (
  [dateA, _]: [dateA: string, _: PlannedEventsList],
  [dateB, __]: [dateB: string, __: PlannedEventsList]
) => (dayjs(dateA).isAfter(dateB) ? 1 : -1);

function App() {
  const { status, data } = useEvents();
  let [searchParams] = useSearchParams();
  const { data: Fuse } = useSearchFuseQuery();
  const cart = useSnapshot(state.cart);
  const userSearchParams = searchParams.get("search");
  const groupedEvents = useMemo(() => {
    return data && Object.entries(groupBy(data)).sort(dateComparator);
  }, [data]);
  const searchedResults = useMemo(
    () => userSearchParams && Fuse?.search(userSearchParams),
    [userSearchParams]
  );
  const showSearch = useMemo(
    () => userSearchParams && Array.isArray(searchedResults),
    [useSearchFuseQuery, searchedResults]
  );
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
            {!showSearch &&
              Array.isArray(groupedEvents) &&
              groupedEvents.map(([date, events]) => {
                const filteredEvents = events.filter(({ id }) => !cart.has(id));
                return (
                  filteredEvents.length > 0 && (
                    <LayoutGroup key={date}>
                      <DateHeader dateTitle={date} />
                      <EventsList>
                        {filteredEvents.map((plannedEvent) => (
                          <EventCard
                            isSearch={false}
                            key={plannedEvent.id}
                            {...plannedEvent}
                          />
                        ))}
                      </EventsList>
                    </LayoutGroup>
                  )
                );
              })}
            {showSearch && (
              <LayoutGroup>
                <EventsList>
                  {searchedResults &&
                    searchedResults.map(({ item }) => {
                      return <EventCard isSearch key={item.id} {...item} />;
                    })}
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
