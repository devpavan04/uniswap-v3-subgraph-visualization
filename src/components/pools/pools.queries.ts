import { gql } from '@apollo/client';

export const GET_POOLS = gql`
  query ($first: Int, $orderBy: String, $orderDirection: String, $skip: Int) {
    pools(
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      skip: $skip
      where: { volumeUSD_gt: 100000, totalValueLockedUSD_gt: 1000000 }
    ) {
      id
      token0 {
        id
        name
        symbol
      }
      token1 {
        id
        name
        symbol
      }
      totalValueLockedUSD
      poolDayData(first: 1, orderBy: date, orderDirection: desc) {
        id
        volumeUSD
      }
    }
  }
`;

export const GET_POOL = gql`
  query ($id: ID!) {
    pools(where: { id: $id }) {
      id
      token0 {
        id
        name
        symbol
      }
      token1 {
        id
        name
        symbol
      }
      token0Price
      token1Price
      volumeToken0
      volumeToken1
      totalValueLockedUSD
    }
  }
`;
