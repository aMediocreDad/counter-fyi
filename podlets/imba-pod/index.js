const express = require("express");
const Podlet = require("@podium/podlet");
const fs = require("fs");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:6969");
  next();
});

const podlet = new Podlet({
  name: "imba-pod",
  version: "0.1.0",
  pathname: "/",
  development: process.env.NODE_ENV === "development" ? true : false,
});

const buildfiles = fs.readdirSync("dist/public/__assets__/app");

buildfiles.forEach((el) => {
  if (el.match(/^.+?.js$/)) {
    podlet.js({
      value: `http://localhost:7300/assets/${el}`,
      defer: true,
      type: "module",
      crossorigin: "anonymous",
    });
  }
});

app.use(podlet.middleware());
app.use("/assets", express.static("dist/public/__assets__/app"));

app.get(podlet.content(), (_req, res) => {
  res.status(200).podiumSend(`
		<div class="container" id='imba-pod' title="Imba"></div>
	`);
});

app.get(podlet.manifest(), (_req, res) => {
  res.status(200).send(podlet);
});

app.listen(7300);
