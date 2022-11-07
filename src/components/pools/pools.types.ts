/**
 * Type of POOL data recieved from the subgraph.
 */
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
  poolDayData: {
    id: string;
    volumeUSD: string;
  }[];
};

/**
 * Type of POOLS data array that is used in the POOLS
 * table component.
 */
export type PoolsTableType = {
  pool: JSX.Element;
  tvl?: string;
  volume24?: string;
  link: JSX.Element;
}[];

/**
 * Props types for the POOLS component.
 */
export type PoolsPropsType = {
  _pageSize: number;
  _totalPageCount: number;
};
