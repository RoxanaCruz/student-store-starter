const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);
router.get("/:order_id", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.post("/:order_id/items", orderController.addItemToOrder);
router.put("/:order_id", orderController.updateOrder);
router.delete("/:order_id", orderController.deleteOrder);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { PrismaClient } = require("@prisma/client"); // Add this import statement
// const Order = require("../models/order");

// const prisma = new PrismaClient(); // Correctly initialize PrismaClient

// router.get("/", async (req, res) => {
// 	try {
// 		const orders = await Order.getAll();
// 		res.json(orders);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// router.get("/:id", async (req, res) => {
// 	try {
// 		const order = await Order.get(req.params.id);
// 		res.json(order);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// router.post("/", async (req, res) => {
// 	try {
// 		const newOrder = await Order.create(req.body);
// 		res.json(newOrder);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// router.put("/:id", async (req, res) => {
// 	try {
// 		const updatedOrder = await Order.update(req.params.id, req.body);
// 		res.json(updatedOrder);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// router.delete("/:id", async (req, res) => {
// 	try {
// 		const deletedOrder = await Order.delete(req.params.id);
// 		res.json(deletedOrder);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// // New endpoint to calculate the total price of an order
// router.get("/:order_id/total", async (req, res) => {
// 	const { order_id } = req.params;

// 	try {
// 		const items = await prisma.orderItem.findMany({
// 			where: { order_id: Number(order_id) },
// 			include: { product: true },
// 		});

// 		const total = items.reduce((acc, item) => {
// 			return acc + item.quantity * item.product.price;
// 		}, 0);

// 		res.status(200).json({ total });
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// module.exports = router;
//-----
// const express = require("express");
// const router = express.Router();
// const Order = require("../models/order");

// router.get("/", async (req, res) => {
// 	try {
// 		const orders = await Order.getAll();
// 		res.json(orders);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// router.get("/:id", async (req, res) => {
// 	try {
// 		const order = await Order.get(req.params.id);
// 		res.json(order);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// router.post("/", async (req, res) => {
// 	try {
// 		const newOrder = await Order.create(req.body);
// 		res.json(newOrder);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// router.put("/:id", async (req, res) => {
// 	try {
// 		const updatedOrder = await Order.update(req.params.id, req.body);
// 		res.json(updatedOrder);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// router.delete("/:id", async (req, res) => {
// 	try {
// 		const deletedOrder = await Order.delete(req.params.id);
// 		res.json(deletedOrder);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// module.exports = router;
