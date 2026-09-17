import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(405).json({ message: "Deprecated endpoint. Use /api/models instead." });
}
//   if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

//   try {
//     await connectToDatabase();

//     const sharedCars = await Car.find({ shared: true });
//     res.status(200).json(sharedCars);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch gallery data." });
//   }
// }
