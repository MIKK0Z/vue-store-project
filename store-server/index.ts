import express from "express";
import cors from "cors";

import promotions from "./data/promotions.json";
 
const PORT = 3000;
const app = express();
app.use(cors());

app.get("/promotions", (_req, res) => {
	res.json(promotions);
});

app.listen(PORT, () => {
	console.log(`server started at localhost:${PORT}`);
});
