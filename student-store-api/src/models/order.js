const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Order {
	static async create(data) {
		return await prisma.order.create({
			data: {
				customer_id: parseInt(data.customer_id),
				total_price: 0,
				status: data.status,
			},
		});
	}

	static async addItemToOrder(order_id, order_item_data) {
		const order = await prisma.order.findUnique({
			where: { order_id: parseInt(order_id) },
		});

		const product = await prisma.product.findUnique({
			where: { id: parseInt(order_item_data.product_id) },
		});

		await prisma.order.update({
			where: {
				order_id: parseInt(order_id),
			},
			data: {
				total_price:
					parseFloat(order.total_price) +
					parseFloat(product.price) * parseInt(order_item_data.quantity),
			},
		});

		return prisma.orderItem.create({
			data: {
				order_id: parseInt(order_item_data.order_id),
				product_id: parseInt(order_item_data.product_id),
				quantity: parseInt(order_item_data.quantity),
				price: parseFloat(product.price) * parseInt(order_item_data.quantity),
			},
		});
	}

	static async getAll() {
		return await prisma.order.findMany();
	}

	static async get(id) {
		return await prisma.order.findUnique({
			where: { order_id: Number(id) },
			include: { orderItems: true },
		});
	}

	static async update(id, data) {
		return await prisma.order.update({
			where: { order_id: Number(id) },
			data,
		});
	}

	static async delete(id) {
		return await prisma.order.delete({
			where: { order_id: Number(id) },
		});
	}
}

module.exports = Order;
