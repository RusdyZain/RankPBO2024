import { NextApiRequest, NextApiResponse } from "next";

const ranks = [
  { nim: "12345", rank: 1 },
  { nim: "67890", rank: 2 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nim } = req.query;

  const result = ranks.find((student) => student.nim === nim);
  if (!result) {
    return res.status(404).json({ error: "Rank not found" });
  }

  res.status(200).json(result);
}
