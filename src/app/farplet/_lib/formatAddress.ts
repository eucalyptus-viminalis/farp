export function formatAddress(input: string): string {
  if (input.length < 10) {
    throw new Error("Input string must be at least 10 characters long.");
  }

  return `${input.slice(0, 6)}...${input.slice(-4)}`;
}
