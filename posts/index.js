const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const posts = {};

app.get("/", async (req, res) => {
  console.log('posts: get /')

  await sleep(1000)
  const ip = req.ip;
  const headers = req.headers
  res.send({
    ip,
    headers
  });
});

app.get("/posts", (req, res) => {
  console.log('posts: get /posts')

  res.send(posts);
});

app.post("/posts", async (req, res) => {
  console.log('posts: post /posts')

  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://event-bus-cluster-ip:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log('posts: post /events')

  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("9999");
  console.log("Listening on 4000");
});
