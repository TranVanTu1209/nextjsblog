import { MongoClient } from "mongodb";
import { validateEmail } from "../../utils/validators";

async function handler(req, res) {
  let client = null;
  try {
    client = await MongoClient.connect(process.env.MONGO_CLIENT_URI, {
      useUnifiedTopology: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Cannot connect to database",
    });
  }

  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (!email || !validateEmail(email) || !name.trim() || !message.trim()) {
      return res.status(402).json({
        msg: "Please enter valid inputs",
      });
    }
    let result = null;
    const db = client.db();
    try {
      result = await db.collection("messages").insertOne({
        email,
        name,
        message,
      });
      const id = result.insertedId;

      client.close();

      return res.status(201).json({
        msg: "Post message successfully",
        createdMessage: { id, email, name, message },
      });
    } catch (error) {
      client.close();

      return res.status(500).json({
        msg: "Cannot save message to database",
      });
    }
  }
}

export default handler;
