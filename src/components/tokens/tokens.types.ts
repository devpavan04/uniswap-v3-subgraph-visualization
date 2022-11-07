/**
 * Type of TOKEN data recieved from the subgraph.
 */
export type TokenType = {
  id: string;
  name: string;
  symbol: string;
  totalValueLockedUSD: string;
  tokenDayData: {
    id: string;
    priceUSD: string;
    open: string;
    close: string;
    volumeUSD: string;
  }[];
};

/**
 * Type of TOKENS data array that is used in the TOKENS
 * table component.
 */
export type TokensTableType = {
  token: JSX.Element;
  price?: string;
  priceChange: JSX.Element;
  tvl?: string;
  volume24?: string;
  link: JSX.Element;
}[];

/**
 * Props types for the TOKENS component.
 */
export type TokensPropsType = {
  _pageSize: number;
  _totalPageCount: number;
};
