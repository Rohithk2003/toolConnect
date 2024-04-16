import NavBar from "@/components/navBar";
import Link from "next/link";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";

const LoginPage = ({ data }) => {
	const [csrfToken, setToken] = useState(null);
	const [errorMessage, setError] = useState({
		uerror: "",
		perror: "",
	});
	const router = useRouter();
	const [displaygif, changeDisplayGif] = useState("hidden");

	function HandleSubmit(e) {
		if (inputs.username !== "") {
			if (inputs.password !== "") {
				changeDisplayGif("block");
				setTimeout(() => {
					changeDisplayGif("hidden");
					fetch("https://toolconnect.onrender.com/api/login", {
						method: "POST",
						headers: {
							"X-CSRFToken": csrfToken,
							"Content-Type": "application/json",
						},
						credentials: "include",
						body: JSON.stringify({
							username: inputs.username,
							password: inputs.password,
						}),
					})
						.then((response) => response.json())
						.then((r) => {
							if (r["Status"] === "1") {
								localStorage.setItem("status", "true");
								localStorage.setItem("username", inputs.username);
								localStorage.setItem("usertype", r["usertype"]);

								router.push("/");
							} else {
								setError({
									uerror: "Invalid username or password",
									perror: "Invalid username or password",
								});
							}
						});
				}, 3000);
			} else {
				setError((prev) => {
					return { ...prev, perror: "Password cannot be empty" };
				});
			}
		} else {
			setError({ uerror: "Username cannot be empty" });
		}
	}

	useEffect(() => {
		fetch("https://toolconnect.onrender.com/api/get_csrf", {
			credentials: "include",
		}).then((response) => {
			let token = response.headers.get("X-CSRFToken");
			setToken(token);
		});
	}, []);
	const updateInputs = (input) => {
		if (input.target.name === "username") {
			setInputs((previousValues) => {
				return { ...previousValues, username: input.target.value };
			});
		} else {
			setInputs((previousValues) => {
				return { ...previousValues, password: input.target.value };
			});
		}
	};
	//checking if the user is logged in
	useEffect(() => {
		if (
			localStorage.getItem("status") === null &&
			localStorage.getItem("status") === undefined
		)
			fetch("https://toolconnect.onrender.com/api/loggedin", {
				credentials: "include",
			})
				.then((response) => response.json())
				.then((data) => {
					localStorage.setItem("status", data["status"]);
					if (data["status"]) {
						Router.reload();
						router.push("/");
					}
				});
	}, []);
	const [inputs, setInputs] = useState({ username: "", password: "" });
	return (
		<section className="bg-gray-50 dark:bg-black">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black text-white dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						<div className="space-y-4 md:space-y-6">
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium dark:text-white"
								>
									Username
								</label>
								<input
									type="text"
									name="username"
									id="username"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#191919] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="username"
									required=""
									onChange={(e) => {
										updateInputs(e);
									}}
									value={inputs.username}
								/>
								<label
									htmlFor="username"
									className="block mb-2 italic text-sm font-medium dark:text-red-900"
								>
									{errorMessage.uerror}
								</label>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#191919] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required=""
									onChange={(e) => {
										updateInputs(e);
									}}
									value={inputs.password}
								/>
								<label
									htmlFor="password"
									className="block mb-2 italic text-sm font-medium dark:text-red-900"
								>
									{errorMessage.perror}
								</label>
							</div>

							<div className={`relative `}>
								<div className={`absolute right-36 top-2 ${displaygif}`}>
									<img
										src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
										width={24}
										height={24}
										className="ml-5 text-white"
										alt={"loading"}
									/>
								</div>
								<button
									type="submit"
									onClick={HandleSubmit}
									className="w-full  hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-50 dark:text-black dark:hover:bg-red-200 dark:focus:ring-primary-800"
								>
									Sign in
								</button>
							</div>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?
								<Link
									href="/register"
									className="font-medium  ml-2 text-primary-600 hover:underline dark:text-primary-500"
								>
									Sign up
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LoginPage;
