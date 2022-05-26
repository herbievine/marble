import type { NextApiRequest, NextApiResponse } from "next";
import { verify, sign } from "jsonwebtoken";

const session = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.cookies.jwt) return res.json({ user: null });

    const jwt = req.cookies.jwt;

    const user = verify(jwt, "secret");

    if (typeof user === "string") {
      return res.status(200).json({ user: null });
    }

    let newJwt = sign(
      {
        ...user,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      },
      "secret"
    );

    res.status(200).setHeader("Set-Cookie", newJwt).json({ user });
  } catch (error) {
    res.status(200).json({ user: null });
  }
};

export default session;
