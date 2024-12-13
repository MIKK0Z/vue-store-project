import express from "express";
import cors from "cors";

import promotions from "./data/promotions.json";
 
const PORT = 3000;
const app = express();
app.use(cors());

app.get("/promotions", (_req, res) => {
	setTimeout(() => {
		res.json(promotions);
	}, 500 + Math.random() * 1000);
});

app.listen(PORT, () => {
	console.log(`server started at localhost:${PORT}`);
});
