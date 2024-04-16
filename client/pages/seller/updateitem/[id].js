import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import ModalComponent from "@/components/modal";
import {Imbue} from "next/dist/compiled/@next/font/dist/google";
import Image from "next/image";


export default function Product({data, relatedItems}) {
    const [csrf_token, setCsrf] = useState("");
    useEffect(() => {
        fetch("https://toolconnect.onrender.com/api/get_csrf", {
            credentials: "include",
        }).then((response) => {
            setCsrf(response.headers.get("X-CSRFToken"));
        });
    });


    const [categories, setCategories] = useState([]);
    const Router = useRouter();
    useEffect(() => {
        if (localStorage.getItem("status") === "true") {
            if (
                localStorage.getItem("categories") !== null &&
                localStorage.getItem("categories") !== undefined &&
                localStorage.getItem("categories") !== ""
            ) {
                const cats = localStorage.getItem("categories").split(",");
                setCategories(cats);
            } else {
                fetch("https://toolconnect.onrender.com/api/pre_data")
                    .then((response) => response.json())
                    .then((result) => {
                        setCategories(result["categories"]);
                        localStorage.setItem("categories", categories);
                        localStorage.setItem("maxdaysfilter", result["maxnoofdays"]);
                    });
            }
        } else Router.push("/login");
    }, []);
    const [itemDetails, setDetails] = useState({
        item_id:data["items"][0].id,
        item_name: data["items"][0].item_name,
        item_description: data["items"][0].description,
        category: data["items"][0].category,
        noofdays: data["items"][0].max_no_of_days,
    });
    const [image, setImage] = useState(JSON.parse(data["images"])[0].fields.img);
    const handleChange = (event) => {
        if (event.target.name === "name") {
            setDetails((previousvalues) => {
                return {
                    ...previousvalues,
                    item_name: event.target.value,
                };
            });
        } else if (event.target.name === "category") {
            console.log(event.target.value);
            setDetails((previousvalues) => {
                return {
                    ...previousvalues,
                    category: event.target.value,
                };
            });
        } else if (event.target.name === "noofdays") {
            setDetails((previousvalues) => {
                return {
                    ...previousvalues,
                    noofdays: event.target.value,
                };
            });
        } else if (event.target.name === "Description") {
            setDetails((previousvalues) => {
                return {
                    ...previousvalues,
                    item_description: event.target.value,
                };
            });
        } else if (event.target.name === "img") {
            setImage(event.target.files[0])

        }
    };
    const handleSubmit = () => {
        console.log(image)
        const formdata = new FormData();
        formdata.append("item_name", itemDetails.item_name);
        formdata.append("item_description", itemDetails.item_description);
        formdata.append("item_category", itemDetails.category);
        formdata.append("item_noofdays", itemDetails.noofdays)
        formdata.append("image", image);
        formdata.append("item_id",itemDetails.item_id);
        fetch("https://toolconnect.onrender.com/api/updateitem/" + itemDetails.item_id, {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': "application/json",
            },
            body: formdata,
        })
            .then((response) => response.json())
            .then((result) => {
                if (result["message"]) {
                    Router.push("/all");
                }
            });
    };
    return (
        <>
            <section className="bg-white dark:bg-black text-white">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                        Modify details of {data["items"][0].item_name}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={itemDetails.item_name}
                                onChange={(event) => {
                                    handleChange(event);
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Category
                            </label>
                            <select
                                id="category"
                                value={itemDetails.category}
                                name="category"
                                onChange={(event) => {
                                    handleChange(event);
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                {categories.map((item, id) => {
                                    return (
                                        <option key={id} value={item}>
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="w-full">
                            <label
                                htmlFor="price"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                No of days
                            </label>
                            <input
                                type="number"
                                name="noofdays"
                                id="noofdays"
                                value={itemDetails.noofdays}
                                onChange={(event) => {
                                    handleChange(event);
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="0"
                                required=""
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows="8"
                                name={"Description"}
                                onChange={(event) => {
                                    handleChange(event);
                                }}
                                value={itemDetails.item_description}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Your description here"
                            ></textarea>
                        </div>
                        <div>
                            <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Current Image
                            </label>
                            <Image loader={() => `http://localhost:8000/media/${JSON.parse(data["images"])[0].fields.img}`}
                                   src={`http://localhost:8000/media/${JSON.parse(data["images"])[0].fields.img}`} alt={"Image"} width={512} height={512}/>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="file_input"
                            >
                                Upload file
                            </label>
                            <input
                                value={itemDetails.img}
                                onChange={(event) => {
                                    handleChange(event);
                                }}
                                name="img"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                id="file_input"
                                type="file"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                        Update details
                    </button>
                </div>
            </section>
        </>
    );
}

export async function getStaticProps({params}) {
    const itemdata = await fetch(
        `https://toolconnect.onrender.com/api/items/itemid=${params.id}`
    );
    const data = await itemdata.json();
    const relatedItemsResponse = await fetch(
        `https://toolconnect.onrender.com/api/items/category=${params.category}`
    );
    const relatedItems = await relatedItemsResponse.json();
    return {
        props: {data, relatedItems},
    };
}

export async function getStaticPaths() {
    const ids = await fetch("https://toolconnect.onrender.com/api/getallids");
    const data = await ids.json();
    const d = () => {
        return data.map((id) => {
            return {
                params: {
                    id: id,
                },
            };
        });
    };
    const d1 = d();
    return {
        paths: d1,
        fallback: false,
    };
}
