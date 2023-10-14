import jwt from "jsonwebtoken";

// const privateKey = config.get<string>("privateKey");
// const publicKey = config.get<string>("publicKey");
const simpleSecret = process.env.JWT_SECRET || "secret";

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, simpleSecret, {
    ...(options && options),
    // algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, simpleSecret);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
