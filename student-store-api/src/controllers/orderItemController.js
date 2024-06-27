const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to get all order items
const getAllOrderItems = async (req, res) => {
	try {
		const orderItems = await prisma.orderItem.findMany();
		res.status(200).json(orderItems);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Function to get order items by order ID
const getOrderItemsByOrderId = async (req, res) => {
	try {
		const orderItems = await prisma.orderItem.findMany({
			where: { order_id: parseInt(req.params.order_id) },
			include: { product: true },
		});
		res.status(200).json(orderItems);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Function to create a new order item
const createOrderItem = async (req, res) => {
	const { order_id, product_id, quantity } = req.body;

	try {
		const product = await prisma.product.findUnique({
			where: { id: Number(product_id) },
		});

		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}

		const newOrderItem = await prisma.orderItem.create({
			data: {
				order_id: Number(order_id),
				product_id: Number(product_id),
				quantity: Number(quantity),
				price: product.price * quantity,
			},
		});

		res.status(201).json(newOrderItem);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Function to update an order item
const updateOrderItem = async (req, res) => {
	const { order_item_id } = req.params;
	const { quantity } = req.body;

	try {
		const orderItem = await prisma.orderItem.findUnique({
			where: { order_item_id: Number(order_item_id) },
		});

		if (!orderItem) {
			return res.status(404).json({ error: "Order item not found" });
		}

		const updatedOrderItem = await prisma.orderItem.update({
			where: { order_item_id: Number(order_item_id) },
			data: {
				quantity: Number(quantity),
				price: (orderItem.price / orderItem.quantity) * Number(quantity),
			},
		});

		res.status(200).json(updatedOrderItem);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Function to delete an order item
const deleteOrderItem = async (req, res) => {
	const { order_item_id } = req.params;

	try {
		const deletedOrderItem = await prisma.orderItem.delete({
			where: { order_item_id: Number(order_item_id) },
		});

		res.status(200).json(deletedOrderItem);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Export the functions
module.exports = {
	getAllOrderItems,
	getOrderItemsByOrderId,
	createOrderItem,
	updateOrderItem,
	deleteOrderItem,
};
