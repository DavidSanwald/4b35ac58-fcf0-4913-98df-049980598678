import { MinusIcon } from "@heroicons/react/24/outline";
import { removeEventId } from "@/state";

type Props = { id: string };

function RemoveButton({ id }: Props) {
  return (
    <button
      type="button"
      className="group rounded-full border border-transparent bg-slate-700 p-2 text-slate-50 shadow-sm hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      onClick={() => removeEventId(id)}
    >
      <span className="sr-only">Remove from ShoppingCart</span>
      <MinusIcon
        className="h-6 w-6 cursor-pointer"
        aria-hidden="true"
        focusable="false"
      />
    </button>
  );
}

export { RemoveButton };
