import { motion } from "framer-motion";
import { memo } from "react";

type Props = { children: React.ReactNode };

function UnmemoizedEventsList({ children }: Props) {
  return (
    <motion.ul
      role="list"
      className="mt-4 grid grid-items-stretch grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {children}
    </motion.ul>
  );
}
const EventsList = memo(UnmemoizedEventsList);
export { EventsList };
