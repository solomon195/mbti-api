import { OpenAI } from "openai";

export default async function handler(req, res) {
  const { mbti, answers } = req.body;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `
MBTI: ${mbti}
ストレス質問の回答: ${JSON.stringify(answers)}

これらの情報をもとに、以下の形式でストレス診断結果を生成してください。

1. ストレス評価（軽度 / 中程度 / 高い）
2. MBTIタイプの傾向（ストレス時に見られがちな特徴）
3. 具体的な対処法（3つ）
4. やさしいアドバイス（1文）
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
  });

  const result = completion.choices[0].message.content;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ result });
}
