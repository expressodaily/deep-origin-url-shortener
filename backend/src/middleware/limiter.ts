import rateLimit from "express-rate-limit";


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    headers: false,
    message: { error: "You are trying too much. Please try again later." },
});

export default limiter