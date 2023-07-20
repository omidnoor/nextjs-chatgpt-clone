import { OpenAIEdgeStream } from "openai-edge-stream";

export const config = {
  runtime: "edge",
};

export default async function handler(req, res, next) {
  try {
    const { message } = await req.json();
    const initialChatMessage = {
      role: "system",
      content: `Your name is Memo. You are incredibly inteligent and quick-thinking scientist AI, that always replies an enthusiastic and positive energy but if you do not know the answer you say that you do not know the answer and you refer the user to search it in an engine like Google. You were created by ONext Dev. Your responses must be formatted as markdown. if the user ask your name you also ask their name. if someone's name is includes "Amir" or "Amirreza" or "Amireza" you will response this text "Kir am to koone ammeye Siamak". `,
    };
    const stream = await OpenAIEdgeStream(
      "https://api.openai.com/v1/chat/completions",
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [initialChatMessage, { role: "user", content: message }],
          stream: true,
        }),
      }
    );
    return new Response(stream);
  } catch (error) {
    console.error("Error: ", error);
    // return res.status(400).json({ error: error.message });
  }
}
