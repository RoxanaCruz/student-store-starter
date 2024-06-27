const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const orderModel = require("../models/order");

// Function to get all orders
const getAllOrders = async (req, res) => {
	try {
		const orders = await prisma.order.findMany({
			include: { orderItems: true },
		});
		res.status(200).json(orders);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Function to get order by ID
const getOrderById = async (req, res) => {
	try {
		const order = await prisma.order.findUnique({
			where: { order_id: parseInt(req.params.order_id) },
			include: { orderItems: true },
		});
		if (order) {
			res.status(200).json(order);
		} else {
			res.status(404).json({ error: "Order not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Function to create a new order with order items
const createOrder = async (req, res) => {
	const orderData = req.body;

	try {
		const newOrder = await orderModel.create(orderData);
		res.status(201).json(newOrder);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const addItemToOrder = async (req, res) => {
	const orderItemData = req.body;
	const order_id = req.params.order_id;

	try {
		const newOrderItem = await orderModel.addItemToOrder(
			order_id,
			orderItemData
		);
		res.status(201).json(newOrderItem);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Function to update an order
const updateOrder = async (req, res) => {
	try {
		const updatedOrder = await prisma.order.update({
			where: { order_id: parseInt(req.params.order_id) },
			data: req.body,
		});
		if (updatedOrder) {
			res.status(200).json(updatedOrder);
		} else {
			res.status(404).json({ error: "Order not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Function to delete an order
const deleteOrder = async (req, res) => {
	try {
		const deletedOrder = await prisma.order.delete({
			where: { order_id: parseInt(req.params.order_id) },
		});
		if (deletedOrder) {
			res.status(200).json(deletedOrder);
		} else {
			res.status(404).json({ error: "Order not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Export the functions
module.exports = {
	getAllOrders,
	getOrderById,
	createOrder,
	addItemToOrder,
	updateOrder,
	deleteOrder,
};
