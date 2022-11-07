import { utils } from 'ethers';
import { Avatar, Spacer } from '@geist-ui/core';
import { PoolType, PoolsTableType } from './pools.types';

export const getPoolsTableData = (pools: PoolType[]) => {
  const { getAddress } = utils;

  let poolsTableData: PoolsTableType = [];

  pools.map((pool: PoolType, index: number) => {
    const token0Address = getAddress(pool.token0.id);
    const token1Address = getAddress(pool.token1.id);

    const totalValueLockedUSD = (Number(pool.totalValueLockedUSD) / 1000000).toFixed(2);
    const twentyFourHourVolume = (Number(pool.poolDayData[0].volumeUSD) / 1000000).toFixed(2);

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
      tvl: `$${totalValueLockedUSD}m`,
      volume24: `$${twentyFourHourVolume}m`,
    };

    poolsTableData.push(poolData);
  });

  return { pools: poolsTableData };
};
