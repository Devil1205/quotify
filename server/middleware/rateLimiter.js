const { redis } = require("../db/connectDB");

const rateLimiter = (noOfRequests, timeInSeconds) => {
  return async (req, res, next) => {
    const ip = req.ip;
    const rateRecord = await redis.get(`ip-${ip}`);
    if (!rateRecord) {
      await redis.set(`ip-${ip}`, 1, "EX", timeInSeconds);
      return next();
    } else {
      const timeLeft = await redis.ttl(`ip-${ip}`);
      if (rateRecord >= noOfRequests) {
        return res.status(429).json({
          message: `Too many requests, please try after ${timeLeft} seconds.`,
        });
      } else {
        await redis.incr(`ip-${ip}`);
        return next();
      }
    }
  };
};

module.exports = rateLimiter;
