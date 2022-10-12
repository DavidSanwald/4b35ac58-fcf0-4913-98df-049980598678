import { PlannedEvent } from "@/api";
import { CustomImage } from "@/components/CustomImage";
import { AddButton } from "@/components/EventsList/AddButton";
import { state } from "@/state";
import { motion } from "framer-motion";
import { memo } from "react";
import { useSnapshot } from "valtio";
import { RemoveButton } from "./RemoveButton";
import { Venue } from "./Venue";

const fallbackSrc =
  "https://static.ra.co/images/events/flyer/2021/10/uk-1016-1464848-1796100-front.jpg?dateUpdated=1632041110350";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type Props = PartialBy<PlannedEvent, "venue" | "flyerFront">;
function UnmemoizedEventCard({
  flyerFront,
  startEnd,
  date,
  title,
  venue,
  id,
}: Props) {
  const cart = useSnapshot(state.cart);
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-full flex-col overflow-hidden rounded-lg shadow-lg"
      layout
    >
      <div className="flex-shrink-0 group-hover:opacity-75">
        <CustomImage
          className="h-40 w-full object-cover"
          src={flyerFront || fallbackSrc}
          alt={`Flyer for ${title}`}
          fallbackSrc={fallbackSrc}
        />
      </div>
      <div className="flex flex-1 justify-start flex-col p-7">
        {venue && <Venue {...venue} />}
        <h3 className="text-left mb-2 text-xl mt-3 fond-semibold text-slate-800">
          {title}
        </h3>
        <p className="mt-0.5 text-sm text-left text-slate-800">
          <time dateTime={date}>{date}</time>{" "}
        </p>

        {startEnd && (
          <p className="mt-0.5 text-sm  text-left text-slate-400">
            <time dateTime={startEnd.startTime}>{startEnd.startTime}</time> -{" "}
            <time dateTime={startEnd.endTime}>{startEnd.endTime}</time>
          </p>
        )}
        <div className="self-end mt-auto justify-self-end">
          {cart.has(id) ? <RemoveButton id={id} /> : <AddButton id={id} />}
        </div>
      </div>
    </motion.li>
  );
}

const EventCard = memo(UnmemoizedEventCard);
export { EventCard };
