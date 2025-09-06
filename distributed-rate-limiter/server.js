const express = require("express");
const { createClient } = require("redis");
require("dotenv").config();

const app = express();

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

// Handle Redis connection errors
redisClient.on("error", (err) => console.error("Redis Client Error", err));

async function startServer() {
  await redisClient.connect();   

  const RATE_LIMIT = process.env.RATE_LIMIT || 5;
  const TIME_WINDOW = process.env.TIME_WINDOW || 60;

  app.use(async (req, res, next) => {
    try {
      const ip = req.ip;
      const key = `rate-limit:${ip}`;

      let requests = await redisClient.get(key);

      if (requests === null) {
        await redisClient.setEx(key, TIME_WINDOW, 1);
        next();
      } else if (parseInt(requests) < RATE_LIMIT) {
        await redisClient.incr(key);
        next();
      } else {
        res.status(429).send("Too many requests. Please try again later.");
      }
    } catch (err) {
      console.error("Error in rate limiter:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/", (req, res) => {
    res.send("Hello, world! 🚀");
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
}

startServer();
