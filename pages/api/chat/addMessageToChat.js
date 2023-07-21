import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const { user } = await getSession(req, res);
    const client = await clientPromise; // Corrected "client" variable name
    const db = client.db("memoai");
    const { chatId, role, content } = req.body;

    const chat = await db.collection("chats").findOneAndUpdate(
      {
        _id: new ObjectId(chatId),
        userId: user.sub,
      },
      {
        $push: {
          messages: {
            role,
            content,
          },
        },
      },
      {
        returnOriginal: false,
      }
    );

    if (!chat.value) {
      res.status(404).send({ message: "Chat not found!" });
      return;
    }

    // console.log(chat.value);
    res.status(200).json({
      chat: {
        ...chat.value,
        _id: chat.value._id.toString(),
      },
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
}
