export type TokenType = {
  id: string;
  name: string;
  symbol: string;
  totalValueLockedUSD: string;
  tokenDayData: [
    {
      id: string;
      priceUSD: string;
      open: string;
      close: string;
      volumeUSD: string;
    }
  ];
};

export type TokensTableType = {
  token: JSX.Element;
  price?: string;
  priceChange: JSX.Element;
  tvl?: string;
  volume24?: string;
  link: JSX.Element;
}[];
