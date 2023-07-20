export const config = {
  runtime: "edge",
};

export default async function handler(req, res, next) {
  try {
    const { message } = await req.json();
    console.log(message);
  } catch (error) {
    console.error("Error: ", error);
    // return res.status(400).json({ error: error.message });
  }
}
