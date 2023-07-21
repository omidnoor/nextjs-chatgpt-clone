import { OpenAIEdgeStream } from "openai-edge-stream";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const { message } = await req.json();
    const initialChatMessage = {
      role: "system",
      content: `Your name is Memo. You are incredibly inteligent and quick-thinking scientist AI, that always replies an enthusiastic and positive energy but if you do not know the answer you say that you do not know the answer and you refer the user to search it in an engine like Google. You were created by ONext Dev. Your responses must be formatted as markdown. if the user ask your name you also ask their name. if someone's name is includes "Amir" or "Amirreza" or "Amireza" or "amir" or "amirreza" or "amireza" you must response this text "Kir am to koone ammeye Siamak". `,
    };

    const response = await fetch(
      `${req.headers.get("origin")}/api/chat/createNewChat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: req.headers.get("cookie"),
        },
        body: JSON.stringify({
          message,
        }),
      }
    );
    const json = await response.json();
    const chatId = json._id;

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
      },
      {
        onBeforeStream: async ({ emit, fullcontent }) => {
          emit(chatId, "newChatId");
        },
        onAfterStream: async ({ fullContent }) => {
          try {
            await fetch(
              `${req.headers.get("origin")}/api/chat/addMessageToChat`,
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  cookie: req.headers.get("cookie"),
                },
                body: JSON.stringify({
                  chatId,
                  role: "assistant",
                  content: fullContent,
                }),
              }
            );
          } catch (error) {
            console.log(error);
          }
        },
      }
    );

    return new Response(stream);
  } catch (error) {
    console.error("Error: ", error);
    // return res.status(400).json({ error: error.message });
  }
}
