const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.askAI = async (req, res) => {
  try {
    const { question } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: question
        }
      ]
    });

    const answer = response.choices[0].message.content;

    res.json({ answer });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};