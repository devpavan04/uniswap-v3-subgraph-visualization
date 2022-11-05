export type PoolType = {
  id: number;
  tokens: {
    token0: {
      name: string;
      symbol: string;
    };
    token1: {
      name: string;
      symbol: string;
    };
  };
  // sort
  totalValueLockedUSD: string;
  // sort
  twentyFourHourVolume: string;
};

export type PoolsStateType = {
  pools: PoolType[];
};
