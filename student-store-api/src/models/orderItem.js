const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class OrderItem {
	static async create(data) {
		return await prisma.orderItem.create({ data });
	}

	static async getAll() {
		return await prisma.orderItem.findMany();
	}

	static async getByOrderId(orderId) {
		return await prisma.orderItem.findMany({
			where: { order_id: Number(orderId) },
		});
	}
}

module.exports = OrderItem;
