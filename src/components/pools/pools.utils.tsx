import { Avatar, Spacer } from '@geist-ui/core';
import { ExternalLink } from '@geist-ui/icons';
import { utils } from 'ethers';
import { CurrencyToAbbreviation } from 'currency-to-abbreviation';
import { PoolType, PoolsTableType } from './pools.types';

export const getPoolsTableData = (pools: PoolType[]) => {
  const { getAddress } = utils;

  let poolsTableData: PoolsTableType = [];

  pools.map((pool: PoolType, index: number) => {
    const token0Address = getAddress(pool.token0.id);
    const token1Address = getAddress(pool.token1.id);

    let poolData = {
      pool: (
        <>
          <Avatar
            src={`https://raw.githubusercontent.com/devpavan04/assets/master/blockchains/ethereum/assets/${token0Address}/logo.png`}
          />
          <Avatar
            src={`https://raw.githubusercontent.com/devpavan04/assets/master/blockchains/ethereum/assets/${token1Address}/logo.png`}
          />
          <Spacer />
          {pool.token0.symbol === 'WETH' ? 'ETH' : pool.token0.symbol === 'WBTC' ? 'BTC' : pool.token0.symbol}/
          {pool.token1.symbol === 'WETH' ? 'ETH' : pool.token1.symbol === 'WBTC' ? 'BTC' : pool.token1.symbol}
        </>
      ),
      tvl: CurrencyToAbbreviation({ inputNumber: Number(pool.totalValueLockedUSD) })?.toString(),
      volume24: CurrencyToAbbreviation({ inputNumber: Number(pool.poolDayData[0].volumeUSD) })?.toString(),
      link: (
        <a href={`https://info.uniswap.org/#/pools/${pool.id}`} target='_blank'>
          <ExternalLink size={20} />
        </a>
      ),
    };

    poolsTableData.push(poolData);
  });

  return { pools: poolsTableData };
};
