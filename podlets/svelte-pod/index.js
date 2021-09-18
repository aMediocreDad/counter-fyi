const express = require("express");
const Podlet = require("@podium/podlet");

const app = express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:6969");
	next();
});

const podlet = new Podlet({
	name: "svelte-pod",
	version: "0.1.0",
	pathname: "/",
	development: process.env.NODE_ENV === "development" ? true : false,
});

podlet.js({
	value: `http://localhost:7100/assets/bundle.js`,
	defer: true,
	type: "module",
	crossorigin: "anonymous",
});

app.use(podlet.middleware());
app.use("/assets", express.static("public/build/"));

app.get(podlet.content(), (_req, res) => {
	res.status(200).podiumSend(`
		<div class="container" id="svelte-pod" title="Svelte"></div>
	`);
});

app.get(podlet.manifest(), (_req, res) => {
	res.status(200).send(podlet);
});

app.listen(7100);
