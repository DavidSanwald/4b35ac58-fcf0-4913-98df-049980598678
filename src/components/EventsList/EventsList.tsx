import { motion } from "framer-motion";

type Props = { children: React.ReactNode };

function EventsList({ children }: Props) {
  return (
    <motion.ul
      role="list"
      className="mt-4 grid grid-items-stretch grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {children}
    </motion.ul>
  );
}
export { EventsList };
