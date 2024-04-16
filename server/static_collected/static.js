document.addEventListener("DOMContentLoaded", () => {
	if (document.querySelector("#loginBtn")) {
		document.querySelector("#loginBtn").addEventListener("click", () => {
			login();
		});
		document.querySelector("#registerBtn").addEventListener("click", () => {
			register();
		});
	}
	let sell = document.querySelector(".sellItem");
	if (sell) {
		sell.onclick = hellO();
	}
	document.querySelector("#filterButton").onclick = ApplyFilter;
	document.querySelector(".listingDiv").style.display = "none";
	document.querySelector(".ordersList").style.display = "none";
	document.querySelector(".viewListing").style.display = "none";
	mainPageItems();
});
function mainPageItems() {
	fetch(
		"items/type=none/category=none&min_price=none&max_price=none&min_no_days=none&max_no_days=none"
	)
		.then((response) => response.json())
		.then((items) => {
			loadItems(items, "none", "Listed Items");
		});
}
function wishlistPageItems() {
	document.querySelector("#mainlink").classList.remove("active");
	try {
		document.querySelector(".dropdown-toggle").classList.remove("active");
	} catch (e) {}
	document.querySelector("#wishlistlink").classList.add("active");
	fetch(
		"items/type=wishlist/category=none&min_price=none&max_price=none&min_no_days=none&max_no_days=none"
	)
		.then((response) => response.json())
		.then((items) => {
			loadItems(items, "wishlist", "Wishlist Items");
		});
}
function deleteItemsPage() {
	document.querySelector("#mainlink").classList.remove("active");
	document.querySelector(".dropdown-toggle").classList.add("active");
	document.querySelector("#wishlistlink").classList.remove("active");
	document.querySelector(".listingDiv").style.display = "flex";
	document.querySelector(".ordersList").style.display = "none";
	document.querySelector(".items-main-div").style.display = "none";
	document.querySelector(".viewListing").style.display = "none";
	fetch(
		"items/type=onsale/category=none&min_price=none&max_price=none&min_no_days=none&max_no_days=none"
	)
		.then((response) => response.json())
		.then((items) => {
			loadItems(items, "onsale", "Added Items");
		});
}
function displayItemAddingPage() {
	document.getElementById("item_name").value = "";
	document.getElementById("category").value = "";
	document.getElementById("max_no_of_days").value = "";
	document.getElementById("price_for_one_day").value = "";
	document.getElementById("description").value = "";
	document.getElementById("imageURL").value = "";
	document.getElementById("imageURL1").value = "";
	document.querySelector(".ordersList").style.display = "none";

	document.querySelector("#mainlink").classList.remove("active");
	document.querySelector(".dropdown-toggle").classList.add("active");
	document.querySelector("#wishlistlink").classList.remove("active");
	document.querySelector(".listingDiv").style.display = "flex";
	document.querySelector(".viewListing").style.display = "none";
	document.querySelector(".items-main-div").style.display = "none";
	return false;
}
function viewListing(item_id) {
	fetch("viewItem/" + item_id)
		.then((response) => response.json())
		.then((item) => {
			document.querySelector(".listingDiv").style.display = "none";
			document.querySelector(".viewListing").style.display = "inline-block";
			document.querySelector(".items-main-div").style.display = "none";
			document.querySelector(".ordersList").style.display = "none";

			document.getElementById("listing_name").innerHTML = item.item.item_name;
			document.getElementById("listing_img").src = item.item.img;
			document.getElementById("listing_main_name").innerHTML =
				item.item.item_name;
			document.getElementById("listing_max_days").innerHTML =
				item.item.max_no_of_days + " days";
			document.getElementById("listing_seller").innerHTML += item.item.seller;
			document.getElementById("listing_price").innerHTML +=
				item.item.price_for_one_day;
			document.getElementById("listing_category").innerHTML +=
				item.item.category;
			document.getElementById("listing_address").innerHTML += item.item.address;
			document.getElementById("listing_description").innerHTML =
				"Description: " + item.item.description;
			document.getElementById("max_days").value = 0;

			document.getElementById("rentItem").onclick = () => {
				rentIt(item.item.id);
			};
			fetch("itemAlreadyOrdered", {
				method: "GET",
			})
				.then((response) => response.json())
				.then((result) => {
					if (result.message === "present") {
						document.getElementById("rentItem").disabled = true;
						document.getElementById("rentItem").value = "Already Ordered";
					} else {
						document.getElementById("rentItem").disabled = false;
						document.getElementById("rentItem").value = "Rent It";
					}
					if (result.currentUser == item.item.seller_username)
						document.getElementById("rentItem").disabled = true;
				});
			document.getElementById("totalPrice").innerHTML =
				"TOTAL PRICE: $" +
				document.getElementById("max_days").value * item.item.price_for_one_day;
			document.getElementById("max_days").oninput = () => {
				var regExp = /[a-zA-Z]/g;
				if (
					document.getElementById("max_days").value > item.item.max_no_of_days
				) {
					displayModal("Maximum days exceeded", "Error");
					document.getElementById("max_days").value = document
						.getElementById("max_days")
						.value.slice(
							0,
							document.getElementById("max_days").value.length - 1
						);
				} else if (regExp.test(document.getElementById("max_days").value)) {
					displayModal("Only numbers are allowed", "Error");
					document.getElementById("max_days").value = document
						.getElementById("max_days")
						.value.slice(
							0,
							document.getElementById("max_days").value.length - 1
						);
				} else
					document.getElementById("totalPrice").innerHTML =
						"TOTAL PRICE: $" +
						document.getElementById("max_days").value *
							item.item.price_for_one_day;
			};
			if (document.getElementById("addtowishlist")) {
				let btn = document.getElementById("addtowishlist");
				fetch("presentinwishlist/" + item.item.id)
					.then((response) => response.json())
					.then((result) => {
						if (result.message === "present") {
							btn.value = "Remove from Wishlist";
							btn.dataset.current = "remove";
						} else {
							btn.value = "Add to Wishlist";
							btn.dataset.current = "wishlist";
						}
					});
				btn.onclick = () => {
					addToWishlist(item.item.id);
				};
			}
		});
}
function rentIt(item_id) {
	console.log(document.getElementById("max_days").value);
	if (document.getElementById("max_days").value > 0) {
		fetch("order", {
			method: "PUT",
			body: JSON.stringify({
				item_id: item_id,
				no_of_days: document.getElementById("max_days").value,
			}),
		})
			.then((response) => response.json())
			.then((result) => {
				if (result.error) {
					displayModal(result.error, "Error");
					document.getElementById("redirectBtn").style.display = "block";
					document.getElementById("redirectBtn").innerHTML = "login";
					document.getElementById("redirectBtn").onclick = () => {
						window.location.href = "login";
					};
				} else {
					displayModal(result.message, "Success");
					view_orders();
				}
			});
	} else {
		displayModal("Please enter a valid number of days", "Error");
	}
}
function addToWishlist(item_id) {
	let btn = document.getElementById("addtowishlist");
	if (btn.dataset.current === "wishlist") {
		btn.value = "Remove from Wishlist";
		btn.dataset.current = "remove";
		displayModal("Item added to wishlist", "Success");
	} else {
		btn.value = "Add to Wishlist";
		btn.dataset.current = "wishlist";
		displayModal("Item removed from wishlist", "Success");
	}
	fetch("addtowishlist/" + item_id, {
		method: "POST",
	})
		.then((response) => response.json())
		.then((result) => {
			if (result.message === "success") {
				displayModal("Item added to wishlist", "Success");
			} else {
				displayModal("Item removed from wishlist", "Success");
			}
		});
}
function ApplyFilter() {
	let d = document.getElementsByClassName("filterRadios");

	let category = "none",
		price = "none",
		max_no_of_days = "none",
		min_price = "none",
		max_price = "none";
	let currentBox = document.getElementById("heading").dataset.current;
	for (let i = 0; i < d.length; i++) {
		if (d[i].checked == true) {
			if (d[i].name == "group1") category = d[i].value;
			if (d[i].name == "group2") {
				price = d[i].value;
			}
			if (d[i].name == "group3") max_no_of_days = d[i].value;
		}
	}
	if (max_no_of_days != "none") {
		days_range_min = max_no_of_days.split("-")[0];
		days_range_max = max_no_of_days.split("-")[1];
	}
	if (price != "none") {
		min_price = price.split("-")[0].slice(0, price.split("-")[0].length - 1);
		max_price = price.split("-")[1].slice(0, price.split("-")[1].length - 1);
	}
	headings = {
		none: "Listed Items",
		onsale: "Added Items",
		wishlist: "Wishlist Items",
	};
	fetch(
		`items/type=${currentBox}/category=${category}&min_price=${min_price}&max_price=${max_price}&min_no_days=${days_range_min}&max_no_days=${days_range_max}`
	)
		.then((response) => response.json())
		.then((items) => {
			loadItems(
				items,
				currentBox,
				headings[currentBox] ? headings[currentBox] : "Results ..."
			);
		});
}
function removeChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}
function view_orders() {
	document.querySelector(".ordersList").style.display = "block";
	document.querySelector("#orders-view").style.display = "block";
	let parent = document.querySelector(".list-group");
	document.querySelector(".listingDiv").style.display = "none";
	document.querySelector(".viewListing").style.display = "none";
	document.querySelector(".items-main-div").style.display = "none";
	fetch("viewPastOrders")
		.then((response) => response.json())
		.then((result) => {
			for (let orders in result) {
				var aElement = document.createElement("a");
				aElement.setAttribute("href", "#");
				aElement.setAttribute(
					"class",
					"list-group-item list-group-item-action bg-dark text-white"
				);
				aElement.setAttribute("aria-current", "true");
				aElement.innerHTML =
					"Order ID: #" +
					result[orders].order_id +
					" <br>Ordered Date: " +
					result[orders].date +
					" <br>Seller: " +
					result[orders].seller_name +
					" <br>Item: " +
					result[orders].item +
					" <br>No of days left: " +
					result[orders].no_of_days +
					" <br>Price: $" +
					result[orders].total_price;

				parent.appendChild(aElement);
			}
		});
}
function loadItems(items, itemStorageType, headingText) {
	removeChildNodes(document.getElementById("itemRow"));
	if (document.getElementById("#profileView")) {
		document.getElementById("#profileView").style.display = "none";
	}
	document.querySelector(".filters").style.display = "block";
	document.getElementById("heading").innerHTML = "Listed Items";
	document.querySelector(".items-main-div").style.marginLeft = "0px";

	if (itemStorageType != "wishlist" && itemStorageType != "onsale") {
		document.querySelector("#mainlink").classList.add("active");
	}
	document.getElementById("heading").innerHTML = headingText;
	document
		.getElementById("heading")
		.setAttribute("data-current", itemStorageType);
	try {
		if (itemStorageType != "wishlist")
			document.querySelector("#wishlistlink").classList.remove("active");
		if (itemStorageType == "wishlist") {
			document.getElementById("heading").innerHTML = "Wishlist Items";
		}
		if (itemStorageType != "onsale") {
			document.querySelector(".dropdown-toggle").classList.remove("active");
		} else if (itemStorageType == "onsale") {
			document.getElementById("heading").innerHTML = "Added Items";
		}
	} catch (e) {}
	document.querySelector(".items-main-div").style.display = "block";
	document.querySelector(".ordersList").style.display = "none";
	document.querySelector(".listingDiv").style.display = "none";
	document.querySelector(".viewListing").style.display = "none";
	for (item in items) {
		let parent = document.querySelector("#itemRow");
		let clickableLink = document.createElement("a");
		clickableLink.id = "item" + items[item].id;
		clickableLink.setAttribute("data-value", items[item].id);
		clickableLink.className = "itemButton col-lg-3 mt-2 col-md-6 col-sm-12";
		clickableLink.onclick = function (item) {
			if (item.target.dataset.value != undefined) {
				viewListing(item.target.dataset.value);
			}
		};
		let itemDiv = document.createElement("div");
		itemDiv.className = "item_div";
		itemDiv.setAttribute("data-value", items[item].id);

		let urlTag = document.createElement("a");
		urlTag.setAttribute("data-value", items[item].id);

		let cardTag = document.createElement("div");
		cardTag.className = "card shadow-lg p-3 hover-zoom";
		cardTag.setAttribute("data-value", items[item].id);

		let imageDiv = document.createElement("div");
		imageDiv.className = "bg-image hover-overlay ripple h-50";
		imageDiv.setAttribute("data-value", items[item].id);

		let imgTag = document.createElement("img");
		imgTag.className = "w-100";
		imgTag.id = "itemImage";
		imgTag.style.height = "250px";
		imgTag.src = items[item].img;
		imgTag.setAttribute("data-value", items[item].id);
		imageDiv.appendChild(imgTag);
		cardTag.appendChild(imageDiv);

		let mainDiv = document.createElement("div");
		mainDiv.className = "card-body w-100";
		mainDiv.style.padding = "0";
		mainDiv.style.paddingTop = "10px";

		let h5 = document.createElement("h5");
		h5.className = "card-title";
		h5.innerHTML = items[item].item_name;
		h5.style.overflow = "hidden";
		h5.style.textOverflow = "ellipsis";
		h5.style.whiteSpace = "nowrap";

		mainDiv.appendChild(h5);
		let table = document.createElement("table");

		let tr = document.createElement("tr");
		let td = document.createElement("td");

		tr.className = "card-subtitle";
		td.innerHTML = "<b>Max Days</b>";
		let tdData = document.createElement("td");
		tdData.id = "tdData";
		tdData.innerHTML = ": " + items[item].max_no_of_days;

		let tr1 = document.createElement("tr");
		let td1 = document.createElement("td");
		tr1.className = "card-subtitle";
		td1.innerHTML = "<b>Price</b>";
		let tdData1 = document.createElement("td");
		tdData1.id = "tdData";
		tdData1.innerHTML = ": " + items[item].price_for_one_day + "$/day";

		let tr2 = document.createElement("tr");
		let td2 = document.createElement("td");
		tr2.className = "card-subtitle";
		td2.innerHTML = "<b>Address</b>";
		let tdData2 = document.createElement("td");
		tdData2.id = "tdData";
		tdData2.innerHTML = ": " + items[item].address;

		let tr3 = document.createElement("tr");
		let td3 = document.createElement("td");
		tr3.className = "card-subtitle";
		td3.innerHTML = "<b>Description</b>";
		let tdData3 = document.createElement("td");
		tdData3.id = "tdData";
		tdData3.innerHTML = ": " + items[item].description;

		let tr4 = document.createElement("tr");
		let td4 = document.createElement("td");
		tr4.className = "card-subtitle";
		td4.innerHTML = "<b>Created At</b>";
		let tdData4 = document.createElement("td");
		tdData4.id = "tdData";
		tdData4.innerHTML = ": <small>" + items[item].createdTime + "</small>";

		let createdTimeDiv = document.createElement("div");
		createdTimeDiv.className = "card-subtitle text-secondary mt-1";
		createdTimeDiv.innerHTML =
			"Created At:" + "<small>" + items[item].createdTime + "</small>";

		tr.appendChild(td);
		tr.appendChild(tdData);
		tr1.appendChild(td1);
		tr1.appendChild(tdData1);
		tr2.appendChild(td2);
		tr2.appendChild(tdData2);
		tr3.appendChild(td3);
		tr3.appendChild(tdData3);

		table.appendChild(tr1);
		table.appendChild(tr);
		table.appendChild(tr2);
		table.appendChild(tr3);
		mainDiv.appendChild(table);
		mainDiv.appendChild(createdTimeDiv);
		if (itemStorageType === "onsale") {
			let deleteBtn = document.createElement("button");
			deleteBtn.className = "btn btn-danger";
			deleteBtn.innerHTML = "Delete";
			deleteBtn.onclick = () => {
				deleteItem(items[item].id);
			};
			deleteBtn.style.marginTop = "10px";
			mainDiv.appendChild(deleteBtn);
		}

		cardTag.appendChild(mainDiv);
		urlTag.appendChild(cardTag);
		itemDiv.appendChild(urlTag);
		clickableLink.appendChild(itemDiv);
		parent.appendChild(clickableLink);
	}
}
function deleteItem(itemId) {
	fetch("delete_item/" + itemId)
		.then((res) => res.json())
		.then((data) => {
			displayModal("Item deleted successfully", "Success");
			mainPageItems();
		});
}
function displayModal(text, heading) {
	document.getElementById("errorMessageHeading").innerHTML = heading;
	document.getElementById("errorMessageBody").innerHTML = text;
	const temp = new bootstrap.Modal("#simpleMOdel");
	temp.show();
}
function addItem() {
	if (document.getElementById("item_name").value == "") {
		displayModal("Please input the item name", "Error");
	} else if (document.getElementById("category").selectedIndex == -1) {
		displayModal("Please select a category", "Error");
	} else if (
		document.getElementById("max_no_of_days").value === "" ||
		document.getElementById("price_for_one_day").value === ""
	) {
		displayModal("Please fill all information", "Error");
	} else {
		fetch("/add_item", {
			method: "POST",
			body: JSON.stringify({
				item_name: document.getElementById("item_name").value,
				category:
					document.getElementById("category").options[
						document.getElementById("category").selectedIndex
					].value,
				max_no_of_days: document.getElementById("max_no_of_days").value,
				price_for_one_day: document.getElementById("price_for_one_day").value,
				description: document.getElementById("description").value,
				img:
					document.getElementById("imageURL").value +
					document.getElementById("imageURL1").value,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				displayModal(data.message, data.heading);
				mainPageItems();
				return false;
			});
	}
}

function search() {
	let item_substring = document.querySelector("#itemSearch").value;
	console.log(item_substring);
	fetch(
		`items/type=${item_substring}/category=none&min_price=none&max_price=none&min_no_days=none&max_no_days=none`
	)
		.then((response) => response.json())
		.then((data) => loadItems(data, item_substring, "Results ..."));
}
