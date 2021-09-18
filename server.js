const express = require("express");
const Layout = require("@podium/layout");
const utils = require("@podium/utils");

const app = express();

const layout = new Layout({
	name: "Counters",
	pathname: "/",
});

layout.view(
	(incoming, body, head) => `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			${incoming.css.map(utils.buildLinkElement).join("\n")}
			${incoming.js.map(utils.buildScriptElement).join("\n")}
			<title>${incoming.view.title}</title>
		</head>
		<body>
			<header>
				<h1>Counter FYI</h1>
				<p>This is a Micro Frontend demoing four different frameworks/languages in a single app.</p>
				<a class="cta" href="#" target="_blank" rel="noopener">Read More</a>
				<a class="cta" href="#" target="_blank" rel="noopener">View Code</a>
			</header>
			${body}
			<footer>Made with curiosity by <a href="http://www.amediocre.dev" target="_blank" rel="noopener">aMediocreDev</a> 🚀</footer>
		</body>
	</html>`
);

const reactPod = layout.client.register({
	name: "react-podlet",
	uri: "http://localhost:7000/manifest.json",
});

const sveltePod = layout.client.register({
	name: "svelte-podlet",
	uri: "http://localhost:7100/manifest.json",
});

const vuePod = layout.client.register({
	name: "vue-podlet",
	uri: "http://localhost:7200/manifest.json",
});

const imbaPod = layout.client.register({
	name: "imba-podlet",
	uri: "http://localhost:7300/manifest.json",
});

app.use(layout.middleware());

app.get("/", async (_req, res) => {
	const incoming = res.locals.podium;
	const response = await Promise.all([
		reactPod.fetch(incoming),
		sveltePod.fetch(incoming),
		vuePod.fetch(incoming),
		imbaPod.fetch(incoming),
	]);
	incoming.podlets = response;
	incoming.view.title = "Counter | FYI";

	res.podiumSend(`<main>${response.join("")}</main>`);
});

layout.css({ value: "http://localhost:6969/static/layout.css" });
app.use("/static", express.static("static"));

app.listen(6969);
