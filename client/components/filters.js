import { useState, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Filter({ filters }) {
  const router = useRouter();
  const [filterbar, setfilter] = useState(false);

  function handleFilter(event) {
    router.push(
      {
        pathname: "/search",
        query: { ...router.query, sort: event.target.dataset["filterValue"] },
      },
      undefined,
      {}
    );
  }

  let [styles, setStyles] = useState();
  return (
    <div className="order-none md:order-last md:w-1/6 md:flex-none">
      <nav className="col-span-2 w-full flex-none px-6 py-2 md:py-4 md:pl-10">
        <h3 className="hidden font-semibold text-black dark:text-white md:block">
          Sort by
        </h3>
        <ul className="hidden md:block">
          <div className="hidden md:block">
            <div className="text-white mt-2 text-sm">No of days</div>
            {filters.map((filter, index) => (
              <li className="mt-2 flex text-sm text-gray-400" key={index}>
                <button
                  className={`${
                    router.asPath.indexOf(filter) > -1 ? "dark:text-white" : ""
                  } w-full text-start dark:active:text-white dark:checked:text-white checked:text-white hover:text-gray-800 dark:hover:text-gray-100 font-semibold text-black dark:text-gray-400`}
                  onClick={handleFilter}
                  data-filter-value={filter}
                >
                  {filter}
                </button>
              </li>
            ))}
          </div>
        </ul>
        <ul className="md:hidden">
          <div className="relative">
            <div className="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm dark:border-white/30">
              <button
                className="w-full text-start"
                onClick={() => {
                  setfilter(!filterbar);
                }}
              >
                Max days
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                shapeRendering="geometricPrecision"
                className="h-4 rotate-90"
              >
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </div>
            <div
              className={`rounded  border ${
                filterbar
                  ? "translate-y-0"
                  : "translate-y-full absolute opacity-0"
              }  border-black/30 dark:border-white/30 w-full h-1/3  mt-1 px-4 py-2  font-light  ease-in-out duration-300`}
            >
              <ul>
                {filters.map((filter, index) => (
                  <li className="mt-2 flex text-sm text-gray-400" key={index}>
                    <button
                      className={`${
                        router.asPath.indexOf(filter) > -1
                          ? "dark:text-white"
                          : ""
                      } w-full text-start dark:active:text-white dark:checked:text-white checked:text-white hover:text-gray-800 dark:hover:text-gray-100 font-semibold text-black dark:text-gray-400`}
                      onClick={handleFilter}
                      data-filter-value={filter}
                    >
                      {filter}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default memo(Filter);
