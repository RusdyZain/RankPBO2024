import { NextApiRequest, NextApiResponse } from "next";
import data from "../../data/ranks.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nim } = req.query;

  const result = data.find((student) => student.NIM === nim);

  if (!result) {
    return res.status(404).json({ error: "Rank not found" });
  }

  res.status(200).json(result);
}
