const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");

router.get("/", orderItemController.getAllOrderItems);
router.get("/:order_id", orderItemController.getOrderItemsByOrderId);
router.post("/", orderItemController.createOrderItem);
router.put("/:order_item_id", orderItemController.updateOrderItem);
router.delete("/:order_item_id", orderItemController.deleteOrderItem);

module.exports = router;

//------
// const express = require("express");
// const router = express.Router();
// const OrderItem = require("../models/orderItem");

// router.post("/", async (req, res) => {
// 	try {
// 		const newOrderItem = await OrderItem.create(req.body);
// 		res.json(newOrderItem);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// router.get("/:orderId", async (req, res) => {
// 	try {
// 		const orderItems = await OrderItem.getByOrderId(req.params.orderId);
// 		res.json(orderItems);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// module.exports = router;
