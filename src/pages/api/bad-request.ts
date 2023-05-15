import type { NextApiRequest, NextApiHandler, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { message = "Bad request" } = req.body;

  res.status(400).json({
    message: "something is wrong",
  });
}
