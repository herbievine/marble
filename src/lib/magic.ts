import { Magic } from "magic-sdk";

const magic = () => {
  return new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY);
};

export { magic };
