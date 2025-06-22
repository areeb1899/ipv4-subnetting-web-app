export function generateRandomIP() {
  const ip = Array(4).fill(0).map(() => Math.floor(Math.random() * 256));
  const cidr = Math.floor(Math.random() * (30 - 16 + 1)) + 16; // from /16 to /30
  return { ip, cidr };
}
