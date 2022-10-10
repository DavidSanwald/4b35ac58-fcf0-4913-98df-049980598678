import { PlannedEventsList, eventsListSchema, PlannedEvent, url } from "@/data";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";

const groupBy = (list: PlannedEventsList) => {
  const getKey = (event: PlannedEvent) => event.date;
  return list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!(group in previous)) {
      previous[group] = [];
    }
    (previous[group] as unknown[]).push(currentItem);
    return previous;
  }, {} as Record<string, PlannedEventsList>);
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
export { useEvents, groupBy, useSearchFuseQuery };
