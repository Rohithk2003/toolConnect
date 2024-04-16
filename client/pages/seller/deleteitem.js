import {useEffect, useState} from "react";
import Categories from "@/components/Categories";
import Filter from "@/components/filters";
import Items from "@/components/Items";
import {create, get} from "axios";
import ItemPageLayout from "@/components/ItemPageLayout";
import Router, {useRouter} from "next/router";
import ModalComponent from "@/components/modal";

export default function DeleteItemPage() {
    const [data, setData] = useState(null);
    const router = useRouter();
    const [updated, setUpdated] = useState("")

    function getData() {
        if (localStorage.getItem("status") === "true") {
            fetch("https://toolconnect.onrender.com/api/onsaleitems", {
                credentials: "include",
            })
                .then((response) => response.json())
                .then((result) => {
                    setData(result);
                });
        } else {
            router.push("/login");
        }
    }

    useEffect(getData, [updated]);
    return (
        <section className="bg-gray-50 dark:bg-black sm:p-5 z-40 clear-both overflow-auto min-h-full h-screen">
            <div className="max-w-screen max-h-96 ">
                <div
                    className="bg-white dark:bg-black relative dark:border shadow-md dark:border-gray-700 sm:rounded-lg overflow-hidden">
                    <div
                        className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <div className="text-white dark:text-white w-full justify-center">
                                Your products..
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
                            <tr>
                                <th className="px-4 py-3 w-1/4">Item Name</th>
                                <th className="px-4 py-3 w-1/4">Max no of days</th>
                                <th className="px-4 py-3 w-1/4">Category</th>
                                <th className="px-4 py-3 w-1/4">Date</th>
                                {" "}
                                <th className="px-4 py-3 w-1/4"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {data &&
                                data.map((item) => {
                                    if (item !== null && item !== undefined)
                                        return (
                                            <tr className="bitem-b dark:bitem-gray-700">
                                                <td
                                                    scope="row"
                                                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {item.item_name}
                                                </td>
                                                <td className="px-4 py-3">{item.max_no_of_days}</td>
                                                <td className="px-4 py-3">{item.category}</td>
                                                <td className="px-4 py-3">{item.date}</td>
                                                <td className="px-4 py-3 flex flex-wrap justify-center items-center w-72 ">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            fetch(
                                                                "https://toolconnect.onrender.com/api/delete_item/" +
                                                                item.id
                                                            )
                                                                .then((r) => {
                                                                    setUpdated(true)
                                                                })
                                                                .then();
                                                            Router.push("/seller/deleteitem")
                                                        }}
                                                        className="focus:outline-none w-20 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            Router.push(`updateitem/${item.id}`)
                                                        }}
                                                        className="focus:outline-none w-32 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                    >
                                                        Update Item
                                                    </button>
                                                </td>
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
