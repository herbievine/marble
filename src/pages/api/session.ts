import { Magic } from "@magic-sdk/admin";
import type { NextApiRequest, NextApiResponse } from "next";
import { verify, sign } from "jsonwebtoken";
import { parse } from "cookie";

const session = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.cookies.token) return res.json({ user: null });

    const token = req.cookies.token;

    const user = verify(token, process.env.JWT_SECRET);

    if (typeof user === "string") {
      return res.status(200).json({ user: null });
    }

    let newJwt = sign(
      {
        ...user,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      },

      process.env.JWT_SECRET
    );

    res.status(200).setHeader("Set-Cookie", newJwt).json({ user });
  } catch (error) {
    res.status(200).json({ user: null });
  }
};

export default session;
