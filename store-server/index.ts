import express from "express";
import { json } from "express";
import cors from "cors";

import data from "./data/data.json";
const promotions = data.promotions;
const products = data.products;

import { getUser, createUser } from "./db/controller";
 
const PORT = 3000;
const app = express();

app.use(json());
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true,
	optionsSuccessStatus: 200,
}));

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

app.post("/register", async (req, res) => {
	const { email, password, repeatPassword } = req.body;

	if (email === "") {
		res.status(400).json({ message: "E-mail cannot be empty" });
		return;
	}

	if (email.length < 6) {
		res.status(400).json({ message: "E-mail have to be at least 6 characters long" });
		return;
	}

	if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.exec(email)) {
		res.status(400).json({ message: "E-mail is incorrect" });
		return;
	}

	if (password === "") {
		res.status(400).json({ message: "Password cannot be empty" });
		return;
	}

	if (password.length < 8) {
		res.status(400).json({ message: "Password have to be at least 8 characters long" });
		return;
	}

	if (!/[a-z]/.exec(password)) {
		res.status(400).json({ message: "Password have to include lowercase character" });
		return;
	}

	if (!/[A-Z]/.exec(password)) {
		res.status(400).json({ message: "Password have to include uppercase character" });
		return;
	}

	if (!/\d/.exec(password)) {
		res.status(400).json({ message: "Password have to include digit" });
		return;
	}

	if (password !== repeatPassword) {
		res.status(400).json({ message: "Passwords don't match" });
		return;
	}

	const user = await getUser(email);
	if (user.length != 0) {
		res.sendStatus(409);
		return;
	}

	await createUser(email, password);
	res.sendStatus(200)
})

app.listen(PORT, () => {
	console.log(`server started at localhost:${PORT}`);
});
