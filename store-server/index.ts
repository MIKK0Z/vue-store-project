import express from "express";
import cors from "cors";

import data from "./data/data.json";
const promotions = data.promotions;
const products = data.products;
 
const PORT = 3000;
const app = express();
app.use(cors());
app.use((_req, _res, next) => {
	setTimeout(() => {
		next();
	}, 500 + Math.random() * 1000);
});

app.get("/promotions", (_req, res) => {
	res.json(promotions);
});

app.get("/promotion/:id", (req, res) => {
	const { id } = req.params;

	const promotion = promotions.find(({ id: promotion_id }) => {
		return promotion_id === id;
	});

	if (promotion) {
		res.json(promotion);
	} else {
		res.status(404).send("Not found");
	}
});

app.get("/product/:id", (req, res) => {
	const { id } = req.params;

	const product = products.find(({ id: product_id }) => {
		return product_id === id;
	});

	if (product) {
		res.json(product);
	} else {
		res.status(404).send("Not found");
	}
});

app.listen(PORT, () => {
	console.log(`server started at localhost:${PORT}`);
});
