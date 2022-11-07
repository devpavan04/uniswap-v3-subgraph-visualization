/**
 * Type of TRANSACTION TYPE(Mint/Swap/Burn) data i.e nested
 * inside the TRANSACTIONS data recieved from the subgraph.
 */
export type MintOrSwapTransactionType = {
  id: string;
  transaction: {
    id: string;
  };
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
  sender: string;
  amountUSD: string;
  amount0: string;
  amount1: string;
};

/**
 * Type of TRANSACTION TYPE(Mint/Swap/Burn) data i.e nested
 * inside the TRANSACTIONS data recieved from the subgraph.
 *
 * TRANSACTION TYPE of Burn does not have a SENDER data
 * attribute, hence being separate from the TRANSACTION TYPE of
 * Mint and Swap.
 */
export type BurnTransactionType = {
  id: string;
  transaction: {
    id: string;
  };
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
  origin: string;
  amountUSD: string;
  amount0: string;
  amount1: string;
};

/**
 * Type of TRANSACTION data i.e nested inside the TRANSACTIONS
 * data recieved from the subgraph.
 */
export type TransactionsType = {
  id: string;
  timestamp: string;
  mints: MintOrSwapTransactionType[];
  swaps: MintOrSwapTransactionType[];
  burns: BurnTransactionType[];
};

/**
 * Type of TRANSACTIONS data array that is used in the
 * TRANSACTIONS table component.
 */
export type TransactionsTableType = {
  transactions: JSX.Element;
  transactionType: JSX.Element;
  totalValue?: string;
  tokenAmount0: string;
  tokenAmount1: string;
  account: JSX.Element;
  time: string;
}[];

/**
 * Props types for the TRANSACTIONS component.
 */
export type TransactionsPropsType = {
  _pageSize: number;
  _totalPageCount: number;
};
