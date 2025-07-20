const mongoose = require("mongoose");
require("dotenv").config();
const key = process.env.MONGO;
const redisURI = process.env.REDIS;
const Redis = require("ioredis");
// const key = "mongodb://localhost:27017/Quotify";
const redis = new Redis(redisURI);

mongoose
  .connect(key)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports = { mongoose, redis };
