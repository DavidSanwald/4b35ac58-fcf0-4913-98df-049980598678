import { PlannedEventsList, eventsListSchema, PlannedEvent, url } from "@/data";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Fuse from "fuse.js";

const dateComparator = (
  [dateA, _]: [dateA: string, _: PlannedEventsList],
  [dateB, __]: [dateB: string, __: PlannedEventsList]
) => (dayjs(dateA).isAfter(dateB) ? 1 : -1);

const groupBy = (list: PlannedEventsList) => {
  const getKey = ({ date }: PlannedEvent) => date;
  return list.reduce((previous, currentItem) => {
    const dateGroup = getKey(currentItem);
    if (!(dateGroup in previous)) {
      previous[dateGroup] = [];
    }
    previous[dateGroup]!.push(currentItem);
    return previous;
  }, {} as { [key: string]: PlannedEventsList });
};

async function fetchEvents(): Promise<PlannedEventsList> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const json = await response.json();
  return eventsListSchema.parse(json);
}
function useEvents() {
  return useQuery(["events"], fetchEvents);
}

const useSearchFuseQuery = () => {
  return useQuery(["events"], fetchEvents, {
    select: (data: PlannedEventsList) =>
      new Fuse(data, { includeScore: true, keys: ["title"] }),
  });
};
export { dateComparator, useEvents, groupBy, useSearchFuseQuery };
