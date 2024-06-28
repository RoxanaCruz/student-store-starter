import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import {
	removeFromCart,
	addToCart,
	getQuantityOfItemInCart,
	getTotalItemsInCart,
} from "../../utils/cart";
import "./App.css";
const DEV_BASE_URL = "http://localhost:3000";

function App() {
	// State variables
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState("All Categories");
	const [searchInputValue, setSearchInputValue] = useState("");
	const [userInfo, setUserInfo] = useState({ id: "", email: "" });
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [isFetching, setIsFetching] = useState(false);
	const [isCheckingOut, setIsCheckingOut] = useState(false);
	const [error, setError] = useState(null);
	const [order, setOrder] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			const url = `${DEV_BASE_URL}/products`;
			try {
				const response = await axios.get(url);
				console.log(response);
				setProducts(response.data);
			} catch (error) {
				console.error("Error fetching products", error);
			}
		};
		fetchProducts();
	}, []);

	// Toggles sidebar
	const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

	// Functions to change state (used for lifting state)
	const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
	const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
	const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
	const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

	const handleOnSearchInputChange = (event) => {
		setSearchInputValue(event.target.value);
	};

	const handleOnCheckout = async () => {
		setIsCheckingOut(true);
		const url = `${DEV_BASE_URL}/orders`;
		const newOrder = {
			customer_id: parseInt(userInfo.id),
			status: "pending",
		};
		const response = await axios.post(url, newOrder);
		const data = response.data;
		console.log(data);
		setOrder(data);

		for (const [key, value] of Object.entries(cart)) {
			const url1 = `${url}/${data.order_id}/items`;
			const newItem = {
				order_id: data.order_id,
				product_id: key,
				quantity: value,
			};
			const response1 = await axios.post(url1, newItem);
		}
		const url2 = `${url}/${data.order_id}`;
		const updateItem = {
			status: "completed",
		};
		const response2 = await axios.put(url2, updateItem);
		const data2 = response2.data;
		console.log(data2);
		setOrder(data2);
		setCart({});
		setIsCheckingOut(false);
	};

	return (
		<div className="App">
			<BrowserRouter>
				<Sidebar
					cart={cart}
					error={error}
					userInfo={userInfo}
					setUserInfo={setUserInfo}
					isOpen={sidebarOpen}
					products={products}
					toggleSidebar={toggleSidebar}
					isCheckingOut={isCheckingOut}
					addToCart={handleOnAddToCart}
					removeFromCart={handleOnRemoveFromCart}
					getQuantityOfItemInCart={handleGetItemQuantity}
					getTotalItemsInCart={handleGetTotalCartItems}
					handleOnCheckout={handleOnCheckout}
					order={order}
					setOrder={setOrder}
				/>
				<main>
					<SubNavbar
						activeCategory={activeCategory}
						setActiveCategory={setActiveCategory}
						searchInputValue={searchInputValue}
						handleOnSearchInputChange={handleOnSearchInputChange}
					/>
					<Routes>
						<Route
							path="/"
							element={
								<Home
									error={error}
									products={products}
									isFetching={isFetching}
									activeCategory={activeCategory}
									setActiveCategory={setActiveCategory}
									addToCart={handleOnAddToCart}
									searchInputValue={searchInputValue}
									removeFromCart={handleOnRemoveFromCart}
									getQuantityOfItemInCart={handleGetItemQuantity}
								/>
							}
						/>
						<Route
							path="/:productId"
							element={
								<ProductDetail
									cart={cart}
									error={error}
									products={products}
									addToCart={handleOnAddToCart}
									removeFromCart={handleOnRemoveFromCart}
									getQuantityOfItemInCart={handleGetItemQuantity}
								/>
							}
						/>
						<Route
							path="*"
							element={
								<NotFound
									error={error}
									products={products}
									activeCategory={activeCategory}
									setActiveCategory={setActiveCategory}
								/>
							}
						/>
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
