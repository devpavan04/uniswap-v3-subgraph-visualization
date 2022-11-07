import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POOLS } from './pools.queries';
import { PoolsTableType, PoolsPropsType } from './pools.types';
import { Tag, Table, Spinner, Grid, Pagination } from '@geist-ui/core';
import { RefreshCw, ArrowUp, ArrowDown, ChevronRightCircle, ChevronLeftCircle } from '@geist-ui/icons';
import { getPoolsTableData } from './pools.helpers';
import { NetworkStatus } from '@apollo/client';

const Pools = ({ _pageSize, _totalPageCount }: PoolsPropsType) => {
  // Data order and sorting
  const ORDER_BY = 'totalValueLockedUSD';
  const [orderDirection, setOrderDirection] = useState<string>('desc');
  const handleOrderDirection = () => {
    setOrderDirection((prevState) => (prevState === 'desc' ? 'asc' : 'desc'));
  };

  // Pagination
  const PAGE_SIZE = _pageSize;
  const TOTAL_PAGE_COUNT = _totalPageCount;
  const [pageCount, setPageCount] = useState<number>(1);

  const handlePageChange = (val: number) => {
    setPageCount(val);
  };

  // Updated pools data i.e shown in the UI
  const [pools, setPools] = useState<PoolsTableType>([]);

  // Fetch subgraph data using apollo client's useQuery
  const { loading, data, error, refetch, networkStatus } = useQuery(GET_POOLS, {
    variables: {
      first: PAGE_SIZE,
      orderBy: ORDER_BY,
      orderDirection,
      skip: (pageCount - 1) * PAGE_SIZE,
    },
    notifyOnNetworkStatusChange: true,
  });

  // Refetch the data whenever need using refetch function returned from the useQuery hook
  const handleRefetch = () => {
    refetch({ first: PAGE_SIZE, orderBy: ORDER_BY, orderDirection, skip: (pageCount - 1) * PAGE_SIZE });
  };

  // Get the updated pools data that should be shown in the UI upon every new query or data refetching
  useEffect(() => {
    if (data) {
      const { pools } = getPoolsTableData(data.pools);
      setPools(pools);
    }
  }, [data]);

  return (
    <div>
      <Grid.Container justify='space-between'>
        <Grid
          xs={4}
          justify='flex-start'
          alignItems='center'
          style={{ alignItems: 'center', gap: '1rem', padding: '1rem 0' }}
        >
          <h3 style={{ margin: '0' }}>Top Pools</h3>
          {networkStatus === NetworkStatus.refetch || loading ? (
            <Spinner />
          ) : error ? (
            <Tag type='error'>ERROR</Tag>
          ) : null}
        </Grid>
        <Grid xs={4} justify='flex-end' alignItems='center' style={{ alignItems: 'center', gap: '1rem' }}>
          <RefreshCw size={20} cursor='pointer' onClick={handleRefetch} />
        </Grid>
      </Grid.Container>

      <Table data={pools}>
        <Table.Column prop='pool' label='Pool' />
        <Table.Column prop='tvl'>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            TVL{' '}
            {orderDirection === 'desc' ? (
              <ArrowDown cursor='pointer' size={20} onClick={handleOrderDirection} />
            ) : (
              <ArrowUp cursor='pointer' size={20} onClick={handleOrderDirection} />
            )}
          </div>
        </Table.Column>
        <Table.Column prop='volume24' label='Volume 24H' />
        <Table.Column prop='link' label='Uniswap Info' />
      </Table>

      <Pagination
        count={TOTAL_PAGE_COUNT}
        initialPage={pageCount}
        onChange={handlePageChange}
        style={{ textAlign: 'center', padding: '2rem 0' }}
      >
        <Pagination.Next>
          <ChevronRightCircle />
        </Pagination.Next>
        <Pagination.Previous>
          <ChevronLeftCircle />
        </Pagination.Previous>
      </Pagination>
    </div>
  );
};

export default Pools;
