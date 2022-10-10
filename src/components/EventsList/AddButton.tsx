import { PlusIcon } from "@heroicons/react/24/outline";
import { addEventId } from "@/state";

type Props = { id: string };

function AddButton({ id }: Props) {
  return (
    <button
      type="button"
      className="group rounded-full border border-transparent bg-slate-700 p-2 text-white shadow-sm hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      onClick={() => addEventId(id)}
    >
      <span className="sr-only">Add to ShoppingCart</span>
      <PlusIcon
        className="h-6 w-6 cursor-pointer"
        aria-hidden="true"
        focusable="false"
      />
    </button>
  );
}

export { AddButton };
