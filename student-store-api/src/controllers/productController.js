const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function gets all the products
const getAllProducts = async (req, res) => {
	const { category, price, sort } = req.query;
	let filter = {}; // filter object
	let orderBy = {}; // orderBy - asc/desc

	if (category) {
		filter.category = category;
	}
	if (price) {
		filter.price = parseFloat(price);
	}

	if (sort) {
		// set the orderBy according to asc/desc
		orderBy = { price: sort === "asc" ? "asc" : "desc" };
	}

	try {
		const products = await prisma.product.findMany({ where: filter, orderBy });
		res.status(200).json(products);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Function to get product by ID
const getProductById = async (req, res) => {
	try {
		const product = await prisma.product.findUnique({
			where: { id: parseInt(req.params.id) },
		});
		if (product) {
			res.status(200).json(product);
		} else {
			res.status(404).json({ error: "Product not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Function to create a new product
const createProduct = async (req, res) => {
	try {
		const newProduct = await prisma.product.create({
			data: req.body,
		});
		res.status(201).json(newProduct);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Function to update a product
const updateProduct = async (req, res) => {
	try {
		const updatedProduct = await prisma.product.update({
			where: { id: parseInt(req.params.id) },
			data: req.body,
		});
		if (updatedProduct) {
			res.status(200).json(updatedProduct);
		} else {
			res.status(404).json({ error: "Product not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Function to delete a product
const deleteProduct = async (req, res) => {
	try {
		const deletedProduct = await prisma.product.delete({
			where: { id: parseInt(req.params.id) },
		});
		if (deletedProduct) {
			res.status(200).json(deletedProduct);
		} else {
			res.status(404).json({ error: "Product not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Export the functions
module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// // Function gets all the products
// const getAllProducts = async (req, res) => {
// 	const { category, price, sort } = req.query;
// 	let filter = {}; // filter object
// 	let orderBy = {}; // orderBy - asc/desc

// 	if (category) {
// 		filter.category = category;
// 	}
// 	if (price) {
// 		filter.price = parseFloat(price);
// 	}

// 	if (sort) {
// 		// set the orderBy according to asc/desc
// 		orderBy = { price: sort === "asc" ? "asc" : "desc" };
// 	}

// 	try {
// 		const products = await prisma.product.findMany({ where: filter, orderBy });
// 		res.status(200).json(products);
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };

// // Function to get product by ID
// const getProductById = async (req, res) => {
// 	try {
// 		const product = await prisma.product.findUnique({
// 			where: { id: parseInt(req.params.id) },
// 		});
// 		if (product) {
// 			res.status(200).json(product);
// 		} else {
// 			res.status(404).json({ error: "Product not found" });
// 		}
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };

// // Function to create a new product
// const createProduct = async (req, res) => {
// 	try {
// 		const newProduct = await prisma.product.create({
// 			data: req.body,
// 		});
// 		res.status(201).json(newProduct);
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };

// // Function to update a product
// const updateProduct = async (req, res) => {
// 	try {
// 		const updatedProduct = await prisma.product.update({
// 			where: { id: parseInt(req.params.id) },
// 			data: req.body,
// 		});
// 		if (updatedProduct) {
// 			res.status(200).json(updatedProduct);
// 		} else {
// 			res.status(404).json({ error: "Product not found" });
// 		}
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };

// // Function to delete a product
// const deleteProduct = async (req, res) => {
// 	try {
// 		const deletedProduct = await prisma.product.delete({
// 			where: { id: parseInt(req.params.id) },
// 		});
// 		if (deletedProduct) {
// 			res.status(200).json(deletedProduct);
// 		} else {
// 			res.status(404).json({ error: "Product not found" });
// 		}
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };

// // Export the functions
// module.exports = {
// 	getAllProducts,
// 	getProductById,
// 	createProduct,
// 	updateProduct,
// 	deleteProduct,
// };
//----------
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// // Function gets all the cars
// const getAllProducts = async (filter = {}, orderBy = {}) => {
// 	console.log("getAllProducts");
// 	return {};
// 	return prisma.product.findMany();
// };
// //Function to get car by ID
// const getProductById = async (id) => {
// 	return prisma.product.findUnique({ where: { id: parseInt(id) } });
// };
// //Function to create a new car
// const createProduct = async (Product) => {
// 	return prisma.product.create({ data: Product });
// };
// //Function to update a car
// const updateProduct = async (id, productData) => {
// 	return prisma.product.update({
// 		where: { id: parseInt(id) },
// 		data: productData,
// 	});
// };
// //Function to delete a car
// const deleteProduct = async (id) => {
// 	return prisma.product.delete({ where: { id: parseInt(id) } });
// };
// //export the functions
// module.exports = {
// 	getAllProducts,
// 	getProductById,
// 	createProduct,
// 	updateProduct,
// 	deleteProduct,
// };

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// // import productModel
// const productModel = require("../models/productModel");

// // Function gets all the products
// const getAllProducts = async (req, res) => {
// 	const { category, name, price } = req.query;
// 	let filter = {}; //filter object
// 	let orderBy = {}; //orderBy - asc/desc

// 	if (category) {
// 		filter.category = category;
// 	}
// 	if (name) {
// 		//set the orderBy according to asc/desc
// 		orderBy = { name: name === "asc" ? "asc" : "desc" };
// 	}

// 	if (price) {
// 		//set the orderBy according to asc/desc
// 		orderBy = { price: price === "asc" ? "asc" : "desc" };
// 	}

// 	try {
// 		const products = await productModel.getAllProducts(filter, orderBy);
// 		res.status(200).json(products);
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };

// //Function to get product by ID
// const getProductById = async (req, res) => {
// 	try {
// 		const product = await productModel.getProductById(req.params.id);
// 		if (product) {
// 			res.status(200).json(product);
// 		} else {
// 			res.status(404).json({ error: "Product not found" });
// 		}
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };

// //Function to create a new product
// const createProduct = async (req, res) => {
// 	try {
// 		const newProduct = await productModel.createProduct(req.body);
// 		res.status(201).json(newProduct);
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };

// //Function to update a product
// const udpateProduct = async (req, res) => {
// 	try {
// 		const updatedProduct = await productModel.updateProduct(
// 			req.params.id,
// 			req.body
// 		);
// 		if (updatedProduct) {
// 			res.status(200).json(updatedProduct);
// 		} else {
// 			res.status(404).json({ error: "Product not found" });
// 		}
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };

// //Function to delete a product
// const deleteProduct = async (req, res) => {
// 	try {
// 		const deletedProduct = await productModel.deleteProduct(req.params.id);
// 		if (deletedProduct) {
// 			res.status(200).json(deletedProduct);
// 		} else {
// 			res.status(404).json({ error: "Product not found" });
// 		}
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };

// //export the functions
// module.exports = {
// 	getAllProducts,
// 	getProductById,
// 	createProduct,
// 	udpateProduct,
// 	deleteProduct,
// };
