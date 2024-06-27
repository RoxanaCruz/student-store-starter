const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Order {
	static async create(data) {
		return await prisma.order.create({ data });
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
