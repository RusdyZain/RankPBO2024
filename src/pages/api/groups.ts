import { NextApiRequest, NextApiResponse } from "next";
import data from "../../data/groups.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nim } = req.query;

  if (!nim) {
    return res.status(400).json({ error: "NIM is required" });
  }

  const result = data.filter((entry) => entry.NIM === nim);

  if (result.length === 0) {
    return res.status(404).json({ error: "NIM not found" });
  }

  res.status(200).json(result[0]);
}
