export default async function verifyPassword(hashedPass1: string, hashedPass2: string) {
  return (await import("crypto")).timingSafeEqual(
    Buffer.from(hashedPass1),
    Buffer.from(hashedPass2)
  );
}