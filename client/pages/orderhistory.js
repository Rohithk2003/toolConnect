import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function OrderPage() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [orderSubstring, setOrderSubstring] = useState("");
  const [resultsState, setResult] = useState("hidden");
  function loadOrderHistory() {
    console.log(localStorage.getItem("status") === "true");
    if (localStorage.getItem("status") === "true")
      fetch("http://127.0.0.1:8000/api/viewPastOrders", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        });
    else {
      router.push("/login");
    }
  }
  useEffect(loadOrderHistory, []);
  function search(e) {
    e.preventDefault();
    const result = data.map((order) => {
      if (order)
        if (order.item.startsWith(orderSubstring)) return order;
        else return null;
    });
    setData(result);
    setResult("block");
  }
  return (
    <section className="bg-gray-50 dark:bg-black sm:p-5 z-40 h-screen">
      <div className="max-w-screen max-h-96 ">
        <div className="bg-white dark:bg-black relative dark:border shadow-md dark:border-gray-700 sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <div className="flex items-center w-full justify-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <form onSubmit={search}>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-black  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search for an order.."
                      value={orderSubstring}
                      onChange={(e) => setOrderSubstring(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className={`float-left md:w-1/2 text-white ${resultsState}`}>
              Showing results for "{orderSubstring}"{" "}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Order Id
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Item
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Seller
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Order Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    No of days
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data !== [] &&
                  data.map((order) => {
                    if (order !== null && order !== undefined)
                      return (
                        <tr className="border-b dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            #{order.order_id}
                          </th>
                          <td className="px-4 py-3">{order.item}</td>
                          <td className="px-4 py-3">{order.seller_name}</td>
                          <td className="px-4 py-3">{order.date}</td>
                          <td className="px-4 py-3">{order.no_of_days}</td>
                        </tr>
                      );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
