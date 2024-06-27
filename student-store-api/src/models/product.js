const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Product {
	static async create(data) {
		return await prisma.product.create({
			data,
		});
	}

	static async getAll() {
		return await prisma.product.findMany();
	}

	static async get(id) {
		return await prisma.product.findUnique({
			where: { id: Number(id) },
		});
	}

	static async update(id, data) {
		return await prisma.product.update({
			where: { id: Number(id) },
			data,
		});
	}

	static async delete(id) {
		return await prisma.product.delete({
			where: { id: Number(id) },
		});
	}
}
module.exports = Product;
