import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "lib/mongodb";

const RATE_LIMIT_TIME_FRAME = 6000; // 1 minute in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 100; // Max requests per time frame
let requests = {};

export default async function handler(req, res) {
  try {
    const now = Date.now();
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    requests[ip] = (requests[ip] || []).filter(
      (timeStamp) => now - timeStamp < RATE_LIMIT_TIME_FRAME
    );
    requests[ip].push(now);

    if (requests[ip].length > RATE_LIMIT_MAX_REQUESTS) {
      res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    } else {
      const { user } = await getSession(req, res);
      const { message } = req.body;
      const newUserMessage = {
        role: "user",
        content: message,
      };
      const client = await clientPromise;
      const db = client.db("memoai");
      const chat = await db.collection("chats").insertOne({
        userId: user.sub,
        messages: [newUserMessage],
        title: message,
      });

      res.status(200).json({
        _id: chat.insertedId.toString(),
        messages: [newUserMessage],
        title: message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured while creating a new chat",
    });
    console.log("error: ", error);
  }
}
