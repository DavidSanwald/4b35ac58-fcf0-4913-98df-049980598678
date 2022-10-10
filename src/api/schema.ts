import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat"; // import plugin
import "dayjs/locale/de"; // import locale
import { z } from "zod";
dayjs.extend(LocalizedFormat);

const dateSchema = z.preprocess((arg) => {
  if ((typeof arg === "string" && dayjs(arg).isValid()) || arg instanceof Date)
    return new Date(arg);
}, z.date());

const defaultImage =
  "https://static.ra.co/images/events/flyer/2021/10/uk-1016-1464848-1796100-front.jpg?dateUpdated=1632041110350";

const venue = z.object({
  id: z.string(),
  name: z.string(),
  direction: z.string().url(),
});
const localizedTime = "LT";

const plannedEventSchema = z
  .object({
    _id: z.string(),
    title: z.string(),
    flyerFront: z.string().url().nullable().default(defaultImage),
    endTime: dateSchema
      .optional()
      .transform((date) => dayjs(date).format(localizedTime)),
    startTime: dateSchema
      .optional()
      .transform((date) => dayjs(date).format(localizedTime)),
    date: dateSchema.transform((date) => dayjs(date).format("MMMM D, YYYY	")),
    venue: venue.optional(),
  })
  .transform(({ startTime, endTime, _id: id, ...plannedEvent }) => {
    return {
      ...plannedEvent,
      id,
      ...(startTime && endTime ? { startEnd: { startTime, endTime } } : {}),
    };
  });
const eventsListSchema = z.array(plannedEventSchema);
export type PlannedEvent = z.infer<typeof plannedEventSchema>;
export type EventDate = string;
export type PlannedEventsList = z.infer<typeof eventsListSchema>;
export type Id = string;

export { eventsListSchema };
