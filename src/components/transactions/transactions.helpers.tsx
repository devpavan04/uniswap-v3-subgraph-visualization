import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { utils } from 'ethers';
import { Avatar, Spacer } from '@geist-ui/core';
import { CurrencyToAbbreviation } from 'currency-to-abbreviation';
import { TransactionsType, TransactionsTableType } from './transactions.types';

dayjs.extend(relativeTime);

/**
 * Helper function to populate geist UI's table component.
 *
 * Returns an updated version of the TRANSACTIONS data fetched from the subgraph
 * to update the TRANSACTIONS table in the UI.
 *
 * Table array can include JSX elements.
 */
export const getTransactionsTableData = (transactions: TransactionsType[]) => {
  const { getAddress } = utils;

  let transactionsTableData: TransactionsTableType = [];

  transactions.map((transaction: TransactionsType) => {
    let id,
      type,
      totalValue,
      token0Address,
      token1Address,
      token0Symbol,
      token1Symbol,
      tokenAmount0,
      tokenAmount1,
      account;

    if (transaction.mints.length > 0) {
      const mint = transaction.mints[transaction.mints.length - 1];

      id = mint.id;
      type = 'Mint';
      totalValue = mint.amountUSD;
      token0Address = mint.token0.id;
      token1Address = mint.token1.id;
      token0Symbol = mint.token0.symbol;
      token1Symbol = mint.token1.symbol;
      tokenAmount0 = mint.amount0;
      tokenAmount1 = mint.amount1;
      account = mint.sender;
    } else if (transaction.swaps.length > 0) {
      const swap = transaction.swaps[transaction.swaps.length - 1];

      id = swap.id;
      type = 'Swap';
      totalValue = swap.amountUSD;
      token0Address = swap.token0.id;
      token1Address = swap.token1.id;
      token0Symbol = swap.token0.symbol;
      token1Symbol = swap.token1.symbol;
      tokenAmount0 = swap.amount0;
      tokenAmount1 = swap.amount1;
      account = swap.sender;
    } else {
      const burn = transaction.burns[transaction.burns.length - 1];

      id = burn.id;
      type = 'Burn';
      totalValue = burn.amountUSD;
      token0Address = burn.token0.id;
      token1Address = burn.token1.id;
      token0Symbol = burn.token0.symbol;
      token1Symbol = burn.token1.symbol;
      tokenAmount0 = burn.amount0;
      tokenAmount1 = burn.amount1;
      account = burn.origin;
    }

    token0Address = getAddress(token0Address);
    token1Address = getAddress(token1Address);
    token0Symbol = token0Symbol === 'WETH' ? 'ETH' : token0Symbol === 'WBTC' ? '(BTC)' : `${token0Symbol}`;
    token1Symbol = token1Symbol === 'WETH' ? 'ETH' : token1Symbol === 'WBTC' ? '(BTC)' : `${token1Symbol}`;

    let transactionData = {
      transactions: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={`https://raw.githubusercontent.com/devpavan04/assets/master/blockchains/ethereum/assets/${token0Address}/logo.png`}
          />
          <Spacer w={0.4} />
          {token0Symbol}
          <Spacer w={0.6} />
          {type === 'Mint' ? 'and' : type === 'Swap' ? 'For' : type === 'Burn' ? 'And' : ''}
          <Spacer w={0.6} />
          <Avatar
            src={`https://raw.githubusercontent.com/devpavan04/assets/master/blockchains/ethereum/assets/${token1Address}/logo.png`}
          />
          <Spacer w={0.4} />
          {token1Symbol}
        </div>
      ),
      transactionType: (
        <a href={`https://etherscan.io/tx/${id}`} target='_blank'>
          {type}
        </a>
      ),
      totalValue: CurrencyToAbbreviation({ inputNumber: Number(totalValue) })?.toString(),
      tokenAmount0:
        CurrencyToAbbreviation({ inputNumber: Math.abs(Number(tokenAmount0)) })?.toString() + ' ' + token0Symbol,
      tokenAmount1:
        CurrencyToAbbreviation({ inputNumber: Math.abs(Number(tokenAmount1)) })?.toString() + ' ' + token1Symbol,
      account: (
        <a href={`https://etherscan.io/address/${account}`} target='_blank'>
          {account.substr(0, 5) + '...' + account.slice(account.length - 5)}
        </a>
      ),
      time: dayjs().to(dayjs.unix(Number(transaction.timestamp))),
    };

    transactionsTableData.push(transactionData);
  });

  return { transactions: transactionsTableData };
};
