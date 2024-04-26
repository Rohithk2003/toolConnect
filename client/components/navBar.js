import NavItem from "@/components/navitem";
import Link from "next/link";
import Image from "next/image";
import LoadPre from "@/components/loadPreFiles";
import { useEffect, useState } from "react";
import { Dropdown } from "flowbite";
import Router, { useRouter } from "next/router";

const Menu_list = [
	{ text: "Home", href: "/" },
	{ text: "All", href: "/all" },
];
const Profile_options = [
	{ text: "Add item", href: "/seller/addItem" },
	{
		text: "Remove on sale item",
		href: "/seller/deleteitem",
	},
	{ text: "Sold Items", href: "/solditems" },
	{ text: "Wishlist", href: "/user/wishlist" },
	{ text: "Sign out", href: "/signout" },
];

export function BtnDisplayComponent({ onclickhandler }) {
	return (
		<div className="w-44 h-0 flex-grow flex text-Inter flex-row-reverse ">
			<UserButton
				text="Login"
				href="/login"
				onclickhandler={onclickhandler}
			/>
			<UserButton
				onclickhandler={onclickhandler}
				text="Register"
				href="/register"
				extraStylingProps="mr-5 mb-3"
			/>
		</div>
	);
}

export function ProfileSettingsComponent({ text, href, id }) {
	return (
		<li key={id}>
			<Link
				href={href}
				className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-black"
			>
				{text}
			</Link>
		</li>
	);
}

export function ProfileComponent({ username, usertype }) {
	return (
		<div className="flex justify-end  w-1/4 ml-28 ">
			<div className="relative mt-2 mr-5 ">
				<Link href="/orderhistory">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 22"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						shapeRendering="geometricPrecision"
						className="h-6 transition-all ease-in-out hover:scale-110 hover:text-gray-500 dark:hover:text-gray-300"
					>
						<path d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z"></path>
						<path d="M1 5H19"></path>
						<path d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9"></path>
					</svg>
				</Link>
			</div>
			<div className="dropdown flex align-bottom float-right overflow-hidden">
				<button className="flex text-center transition items-center duration-300 dropbtn hover:text-gray-500 dark:bg-black">
					{username}
					<svg
						className="w-4 h-4 "
						aria-hidden="true"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>
				<div className="rounded dropdown-content hidden h-auto absolute dark:bg-gray-700 w-44 shadow-amber-950  mr-4 mt-10 right-1 dark:text-white min-w-fit z-40">
					<ul
						className="py-2 text-sm text-gray-700 dark:text-gray-200"
						aria-labelledby="dropdownHoverButton"
					>
						{Profile_options.map((option, index) => {
							{
								return (usertype !== "seller" && option.text === "Add item") ||
									(usertype !== "seller" &&
										option.text === "Remove on sale item") ||
									(usertype !== "seller" &&
										option.text === "Sold Items") ? null : (
									<ProfileSettingsComponent
										key={index}
										text={option.text}
										href={option.href}
									/>
								);
							}
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}

function UserButton({ text, href, extraStylingProps, onclickhandler }) {
	return (
		<Link href={href}>
			<button
				onClick={onclickhandler}
				className={`bg-red-50 text-black hover:bg-red-300 transition duration-300 w-20 h-9 mr-5  ${extraStylingProps}`}
			>
				{text}
			</button>
		</Link>
	);
}

export default function NavBar() {
	const [check, setcheck] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [username, setUsername] = useState("");
	const [typeofuser, setType] = useState("");
	const router = useRouter();
	const [sidebarvisible, setvisibilty] = useState(false);
	useEffect(() => {
		if (localStorage.getItem("status") === "true") {
			setcheck(true);
		} else {
			setcheck(false);
		}
	});
	const inputHandler = (event) => {
		setSearchValue(event.target.value);
	};
	const submitSearch = (e) => {
		e.preventDefault();
		router.push(
			{
				pathname: "/search",
				query: { ...router.query, q: searchValue },
			},
			undefined,
			{}
		);
	};
	useEffect(() => {
		const handleResize = () => {
			if (sidebarvisible && window.innerWidth > 768) {
				setvisibilty(false);
			}
		};
		window.addEventListener("resize", handleResize);
	}, [sidebarvisible]);

	function checkUserLoggedIn() {
		fetch("https://toolconnect.onrender.com/api/loggedin", {
			credentials: "include",
		})
			.then((response) => response.json())
			.then((r) => {
				setcheck(r["status"]);
				if (r["status"]) {
					setUsername(r["username"]);
					setType(r["usertype"]);
				}
			});
	}

	useEffect(checkUserLoggedIn, [username, check]);
	return (
		<>
			<LoadPre />
			<nav className="relative   p-4 w-screen md:flex hidden bg-black h-1/5 text-white">
				<div className="w-1/3 flex items-center">
					<Link href="/">
						<span className="material-symbols-outlined  pl-0 ml-0 h-auto hover:opacity-50 ease-in-out transition-opacity align-baseline pt-1 pr-8">
							handyman
						</span>
					</Link>
					<ul className="grid grid-rows-1 grid-cols-4 w-72">
						{Menu_list.map((menu, index) => {
							return (
								<div
									key={menu.text}
									className="text-white align-baseline text-center"
								>
									<NavItem {...menu} />
								</div>
							);
						})}
					</ul>
				</div>
				<div className="w-1/3  ">
					<div className="relative">
						<div className="absolute top-3 left-3 ">
							<svg
								className="w-5 h-5 text-white mb-2"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>
						<form onSubmit={submitSearch}>
							<input
								type="text"
								className="block p-2 pl-10   bg-black caret-white focus:caret-white text-white focus:w-full ease-in-out duration-300 w-5/6  focus:rounded-s border border-gray-300"
								placeholder="Search for products.."
								value={searchValue}
								onChange={inputHandler}
								name="search"
							/>
						</form>
					</div>
				</div>
				{check ? (
					<ProfileComponent
						username={username}
						usertype={typeofuser}
					/>
				) : (
					<BtnDisplayComponent />
				)}
			</nav>
			<div
				className={`w-full h-max bg-black text-white flex justify-between p-3 md:hidden`}
			>
				<div className="flex w-full justify-between">
					<button
						onClick={() => {
							console.log(sidebarvisible);
							setvisibilty(!sidebarvisible);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
							shapeRendering="geometricPrecision"
							className="h-6"
						>
							<path d="M4 6h16M4 12h16m-7 6h7"></path>
						</svg>
					</button>
					<Link href="/">
						<span className="material-symbols-outlined   pl-0 ml-0 h-auto align-baseline pt-1 pr-8">
							handyman
						</span>
					</Link>
					<Link href="/orderhistory">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 22"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
							shapeRendering="geometricPrecision"
							className="h-6 transition-all ease-in-out hover:scale-110 hover:text-gray-500 dark:hover:text-gray-300"
						>
							<path d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z"></path>
							<path d="M1 5H19"></path>
							<path d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9"></path>
						</svg>
					</Link>
				</div>
				<div
					className={`bg-black text-white h-screen absolute ${
						sidebarvisible ? "translate-x-0" : "translate-x-100 !w-0"
					} w-2/3 top-0 block left-0 rounded overflow-hidden z-40 ease-in-out md:hidden duration-300 `}
				>
					<div className="p-3 w-full flex m-0 justify-end">
						<button
							onClick={() => {
								setvisibilty(!sidebarvisible);
							}}
						>
							<svg
								viewPort="0 0 12 12"
								version="1.1"
								className="h-4 w-4 text-center text-white items-end justify-end flex"
								xmlns="http://www.w3.org/2000/svg"
							>
								<line
									x1="1"
									y1="11"
									textAnchor="middle"
									x2="11"
									dominantBaseline="middle"
									y2="1"
									stroke="white"
									strokeWidth="2"
								/>
								<line
									x1="1"
									y1="1"
									x2="11"
									dominantBaseline="middle"
									textAnchor="middle"
									y2="11"
									stroke="white"
									strokeWidth="2"
								/>
							</svg>
						</button>
					</div>
					<div className={`w-full flex p-4 ease-in-out  duration-300 `}>
						<Link href="/">
							<span className="material-symbols-outlined hover:opacity-50 ease-in-out transition-opacity pl-0 ml-0 h-auto align-baseline pr-3">
								handyman
							</span>
						</Link>
						<p className="text-xl pb-1">Tool Connect</p>
					</div>
					<div className="w-full p-3">
						<ul>
							<li>
								<button
									onClick={() => {
										setvisibilty(false);
										router.push("/");
									}}
									className="font-[200] pl-1 hover:text-gray-500 overflow-hidden transition duration-300  text-ellipsis whitespace-nowrap"
								>
									Home
								</button>
							</li>
							<li>
								<button
									onClick={() => {
										setvisibilty(false);
										router.push("/all").then((r) => {});
									}}
									className="font-[200] pl-1 hover:text-gray-500 overflow-hidden transition duration-300  text-ellipsis whitespace-nowrap"
								>
									All
								</button>
							</li>
							{check ? (
								Profile_options.map((option, index) => {
									{
										return (
											<div
												key={option.text}
												className=" pl-1"
											>
												<NavItem {...option} />
											</div>
										);
									}
								})
							) : (
								<div className="mt-5 pl-2">
									<BtnDisplayComponent
										onclickhandler={() => {
											setvisibilty(false);
										}}
									/>
								</div>
							)}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
