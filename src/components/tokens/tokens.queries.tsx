import { gql } from '@apollo/client';

// GET Tokens
// volumeUSD > 100k
// totalValueLockedUSD_gt > 1m
export const GET_TOKENS = gql`
  query ($first: Int, $orderBy: String, $orderDirection: String, $skip: Int) {
    tokens(
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      skip: $skip
      where: { volumeUSD_gt: 100000, totalValueLockedUSD_gt: 1000000 }
    ) {
      id
      name
      symbol
      decimals
      volume
      totalValueLockedUSD
      tokenDayData(first: 1, orderBy: date, orderDirection: desc) {
        priceUSD
        open
        close
        volumeUSD
      }
    }
  }
`;

// GET Token
export const GET_TOKEN = gql`
  query ($id: Int!) {
    token(id: $id) {
      id
      name
      symbol
      decimals
      volume
      totalValueLockedUSD
      tokenDayData(first: 1, orderBy: date, orderDirection: desc) {
        priceUSD
        high
        low
        volumeUSD
      }
    }
  }
`;
