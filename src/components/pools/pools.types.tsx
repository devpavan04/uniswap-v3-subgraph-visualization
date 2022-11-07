export type PoolType = {
  id: string;
  token0: {
    id: string;
    name: string;
    symbol: string;
  };
  token1: {
    id: string;
    name: string;
    symbol: string;
  };
  totalValueLockedUSD: string;
  poolDayData: [
    {
      id: string;
      volumeUSD: string;
    }
  ];
};

export type PoolsTableType = {
  pool: JSX.Element;
  tvl?: string;
  volume24?: string;
  link: JSX.Element;
}[];
