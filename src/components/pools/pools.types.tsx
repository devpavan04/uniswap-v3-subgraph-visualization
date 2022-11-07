export type PoolType = {
  id: string;
  poolDayData: [
    {
      id: string;
      volumeUSD: string;
    }
  ];
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
};

export type PoolsTableType = {
  pool: JSX.Element;
  tvl: string;
  volume24: string;
}[];
