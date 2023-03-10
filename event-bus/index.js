const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  console.log('event-bus: post /events :D')
  
  const event = req.body;

  events.push(event);

  axios.post("http://posts-cluster-ip:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://comments-cluster-ip:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://query-cluster-ip:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-cluster-ip:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  console.log('event-bus: get /events ')
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
