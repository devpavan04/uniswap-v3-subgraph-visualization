import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query ($first: Int, $orderBy: String, $orderDirection: String, $skip: Int) {
    transactions(first: $first, orderBy: $orderBy, orderDirection: $orderDirection, skip: $skip) {
      id
      timestamp
      mints {
        id
        transaction {
          id
        }
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
        sender
        amountUSD
        amount0
        amount1
      }
      swaps {
        id
        transaction {
          id
        }
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
        sender
        amountUSD
        amount0
        amount1
      }
      burns {
        id
        transaction {
          id
        }
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
        origin
        amountUSD
        amount0
        amount1
      }
    }
  }
`;

export const GET_TRANSACTION = gql`
  query ($id: Int!) {
    transactions(id: $id) {
      id
      timestamp
      mints {
        id
        transaction {
          id
        }
        token0 {
          id
          name
        }
        token1 {
          id
          name
        }
        sender
        amountUSD
        amount0
        amount1
      }
      swaps {
        id
        transaction {
          id
        }
        token0 {
          id
          name
        }
        token1 {
          id
          name
        }
        sender
        amountUSD
        amount0
        amount1
      }
      burns {
        id
        transaction {
          id
        }
        token0 {
          id
          name
        }
        token1 {
          id
          name
        }
        origin
        amountUSD
        amount0
        amount1
      }
    }
  }
`;
