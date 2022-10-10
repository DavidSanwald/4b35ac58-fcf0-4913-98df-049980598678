import { useEffect, useState } from "react";
function DateHeader({ dateTitle }: { dateTitle: string }) {
  const [animateHeader, setAnimateHeader] = useState(false);
  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 140) {
        setAnimateHeader(true);
        return;
      }
      setAnimateHeader(false);
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <h2
      className={`w-full mt-12 backdrop-filter backdrop-blur-lg sticky  trasition ease-in-out duration-500  top-0 z-{
        animateHeader && "backdrop-blur-xl bg-slate-50"
      }`}
    >
      <div className="max-w-7xl mx-auto ">
        <div
          className={`flex max-w-screen-xl text-slate-800 text-4xl font-bold py-10 ${
            animateHeader && "py-5"
          } mx-auto items-center justify-between  trasition ease-in-out duration-500`}
        >
          {dateTitle}
        </div>
      </div>
    </h2>
  );
}
export { DateHeader };
