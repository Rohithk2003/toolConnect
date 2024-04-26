import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import ModalComponent from "@/components/modal";
import { Modal } from "flowbite";
import { useRouter } from "next/router";
import { data } from "autoprefixer";

export default function AddItem() {
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
		item_name: "",
		item_description: "",
		category: "Agricultural",
		noofdays: "",
	});
	const [image, setImage] = useState(null);
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
			setImage(event.target.value);
		}
	};
	const handleSubmit = () => {
		const formdata = new FormData();
		formdata.append("item_name", itemDetails.item_name);
		formdata.append("item_description", itemDetails.item_description);
		formdata.append("item_category", itemDetails.category);
		formdata.append("item_noofdays", itemDetails.noofdays);
		formdata.append("image_url", image);
		fetch("https://toolconnect.onrender.com/api/add_item", {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
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
						Add a new product
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
										<option
											key={id}
											value={item}
										>
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
						<div className="sm:col-span-2">
							<label
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								htmlFor="file_input"
							>
								Upload file Url
							</label>
							<input
								value={itemDetails.img}
								onChange={(event) => {
									handleChange(event);
								}}
								name="img"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								id="text"
								type="text"
							/>
						</div>
					</div>
					<button
						onClick={handleSubmit}
						type="submit"
						className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
					>
						Add product
					</button>
				</div>
			</section>
		</>
	);
}
