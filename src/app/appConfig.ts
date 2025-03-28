type KOL = {
  displayName: string;
  pfp: string;
  username: string;
};
const KOLS: KOL[] = [
  {
    displayName: "Dan Romero",
    pfp: "/dwr.png",
    username: "dwr",
  },
  {
    displayName: "Vitalik Buterin",
    pfp: "/vitalik.avif",
    username: "vitalik.eth",
  },
  {
    displayName: "Donald J. Trump",
    pfp: "/trump.jpg",
    username: "realDonaldTrump",
  },
  {
    displayName: "thread🎩",
    pfp: "/threadguy.jpg",
    username: "threadguy",
  },
  {
    displayName: "Cobie",
    pfp: "/cobie.jpg",
    username: "cobie",
  },
  {
    displayName: "ted (not lasso)",
    pfp: "/ted.png",
    username: "ted",
  },
  {
    displayName: "ansem",
    pfp: "/ansem.jpg",
    username: "ansem",
  },
  {
    displayName: "solana",
    pfp: "/solana.jpg",
    username: "solana",
  },
];

export const appConfig = {
  neynar_api_key: process.env.NEYNAR_API_KEY!,
  hostUrl: process.env.HOST_URL || "http://localhost:3000",
  kols: KOLS,
};
