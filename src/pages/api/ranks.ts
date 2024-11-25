import { NextApiRequest, NextApiResponse } from "next";
import data from "../../data/ranks.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nim } = req.query;

  if (!nim) {
    return res.status(400).json({ error: "NIM is required" });
  }

  const result = data.find((student) => student.NIM === nim);

  if (!result) {
    return res.status(404).json({ error: "Rank not found" });
  }

  res.status(200).json(result);
}
