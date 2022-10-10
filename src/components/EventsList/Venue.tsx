import { MapPinIcon } from "@heroicons/react/24/outline";

type Props = { direction: string; name: string };
function Venue({ direction, name }: Props) {
  return (
    <a
      className="group flex items-center text-sm text-slate-800"
      href={direction}
      target="_blank"
      rel="noopener"
    >
      <MapPinIcon
        className="cursor-pointer h-6 w-6 group-hover:stroke-2"
        aria-hidden="true"
      />
      <span className="mt-0.5 text-slate-800 group-hover:underline">
        {name}
      </span>
    </a>
  );
}
export { Venue };
