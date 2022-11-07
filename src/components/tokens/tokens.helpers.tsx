import { utils } from 'ethers';
import { Avatar, Spacer } from '@geist-ui/core';
import { ArrowDown, ArrowUp, ExternalLink } from '@geist-ui/icons';
import { CurrencyToAbbreviation } from 'currency-to-abbreviation';
import { TokenType, TokensTableType } from './tokens.types';

/**
 * Helper function to populate geist UI's table component.
 *
 * Returns an updated version of the TOKENS data fetched from the subgraph
 * to update the TOKENS table in the UI.
 *
 * Table array can include JSX elements.
 */
export const getTokensTableData = (tokens: TokenType[]) => {
  const { getAddress } = utils;

  let tokensTableData: TokensTableType = [];

  tokens.map((token: TokenType) => {
    const tokenAddress = getAddress(token.id);

    let tokenData = {
      token: (
        <>
          <Avatar
            src={`https://raw.githubusercontent.com/devpavan04/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`}
          />
          <Spacer />
          {token.name === 'Wrapped Ether' ? 'Ether' : token.name === 'Wrapped BTC' ? 'Bitcoin' : token.name}{' '}
          {token.symbol === 'WETH' ? '(ETH)' : token.symbol === 'WBTC' ? '(BTC)' : `(${token.symbol})`}
        </>
      ),
      price: CurrencyToAbbreviation({ inputNumber: Number(token.tokenDayData[0].priceUSD) })?.toString(),
      priceChange: getPriceChange(Number(token.tokenDayData[0].open), Number(token.tokenDayData[0].close)),
      tvl: CurrencyToAbbreviation({ inputNumber: Number(token.totalValueLockedUSD) })?.toString(),
      volume24: CurrencyToAbbreviation({ inputNumber: Number(token.tokenDayData[0].volumeUSD) })?.toString(),
      link: (
        <a href={`https://info.uniswap.org/#/tokens/${token.id}`} target='_blank'>
          <ExternalLink size={20} />
        </a>
      ),
    };

    tokensTableData.push(tokenData);
  });

  return { tokens: tokensTableData };
};

/**
 * Helper function to get the PRICE CHANGE value of a token in percentages.
 *
 * Returns a JSX element that is sent to the TOKENS table component.
 * Includes PRICE CHANGE value and the UI changes with respect to the value.
 */
export const getPriceChange = (oldPrice: number, newPrice: number) => {
  let priceChange = ((newPrice - oldPrice) / oldPrice) * 100;

  if (priceChange < 0) {
    if (Math.abs(priceChange).toFixed(2) === '0.00') {
      return <p style={{ color: 'green' }}>{Math.abs(priceChange).toFixed(2)}</p>;
    } else {
      return (
        <p style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
          {Math.abs(priceChange).toFixed(2)}% <ArrowDown size={20} />
        </p>
      );
    }
  } else {
    if (Math.abs(priceChange).toFixed(2) === '0.00') {
      return <p style={{ color: 'green' }}>{Math.abs(priceChange).toFixed(2)}</p>;
    } else {
      return (
        <p style={{ color: 'green', display: 'flex', alignItems: 'center' }}>
          {Math.abs(priceChange).toFixed(2)}% <ArrowUp size={20} />
        </p>
      );
    }
  }
};
