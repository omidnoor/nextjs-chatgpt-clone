import { OpenAIEdgeStream } from "openai-edge-stream";

export const config = {
  runtime: "edge",
};

export default async function handler(req, res, next) {
  try {
    const { message } = await req.json();
    const stream = await OpenAIEdgeStream(
      `https://api.openai.com/v1/chat/completions`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              content: message,
              role: "user",
            },
          ],
          stream: true,
          temprature: 0.9,
        }),
      }
    );
    return new Response(stream);
  } catch (error) {
    console.error("Error: ", error);
    // return res.status(400).json({ error: error.message });
  }
}
