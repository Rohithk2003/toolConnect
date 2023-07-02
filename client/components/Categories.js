import { useRouter } from "next/router";
import { useState } from "react";

export default function Categories({ categories }) {
  const router = useRouter();
  const [categorybar, setcategory] = useState(false);
  function handleClick(event) {
    router.push(
      {
        pathname: "/search",
        query: { ...router.query, category: event.target.dataset["category"] },
      },
      undefined,
      {}
    );
  }

  return (
    <div className="order-first flex-none md:w-1/6">
      <nav className="col-span-2 w-full flex-none px-6 py-2 md:py-4 md:pl-10">
        <h3 className="hidden font-semibold text-black dark:text-white md:block">
          Categories
        </h3>
        <ul className="hidden md:block">
          <div className="hidden md:block">
            {categories.map((cats, id) => (
              <li key={id} className="mt-2 flex text-sm text-gray-400">
                <button
                  className={`${
                    router.asPath.indexOf(cats) > -1 ? "dark:text-white" : ""
                  }  w-full hover:text-gray-800  text-start dark:hover:text-gray-100 text-gray-600 dark:text-gray-400`}
                  onClick={handleClick}
                  data-category={cats}
                >
                  {cats}
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
                  setcategory(!categorybar);
                }}
              >
                Categories
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
                categorybar
                  ? "translate-y-0"
                  : "translate-y-full absolute opacity-0"
              }  border-black/30 dark:border-white/30 w-full h-1/3  mt-1 px-4 py-2  font-light  ease-in-out duration-300`}
            >
              <ul>
                {categories.map((cats, id) => (
                  <li key={id} className="mt-2 flex text-sm text-gray-400">
                    <button
                      className={`${
                        router.asPath.indexOf(cats) > -1
                          ? "dark:text-white"
                          : ""
                      }  w-full hover:text-gray-800  text-start dark:hover:text-gray-100 text-gray-600 dark:text-gray-400`}
                      onClick={handleClick}
                      data-category={cats}
                    >
                      {cats}
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
