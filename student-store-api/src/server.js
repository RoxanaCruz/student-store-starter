require("dotenv").config();

const express = require("express");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderItemRoutes = require("./routes/orderItemRoutes");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/order-items", orderItemRoutes);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

// require("dotenv").config()

// const express = require("express");
// const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const orderItemRoutes = require("./routes/orderItemRoutes");

// const app = express();
// const port = 3000;

// app.use(express.json());

// app.get("/", (req, res) => {
// 	res.send("Hello World!");
// });

// app.use("/products", productRoutes);
// app.use("/orders", orderRoutes);
// app.use("/order-items", orderItemRoutes);

// app.listen(port, () => {
// 	console.log(`Server running at http://localhost:${port}`);
// });
