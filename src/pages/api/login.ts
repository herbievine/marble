import { Magic } from "@magic-sdk/admin";
import type { NextApiRequest, NextApiResponse } from "next";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const didToken = req.headers.authorization.substr(7);

    const magic = new Magic(process.env.MAGIC_SECRET);

    magic.token.validate(didToken);

    const metadata = await magic.users.getMetadataByToken(didToken);

    const jwt = sign(
      {
        ...metadata,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      },
      process.env.JWT_SECRET
    );

    const cookie = serialize("jwt", jwt);

    res.status(200).setHeader("Set-Cookie", cookie).json({ user: metadata });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export default login;
