import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POOLS } from './pools.queries';
import { PoolsTableType } from './pools.types';
import { Tag, Table, Spinner, Grid, Pagination } from '@geist-ui/core';
import { RefreshCw, ArrowUp, ArrowDown, ChevronRightCircle, ChevronLeftCircle } from '@geist-ui/icons';
import { getPoolsTableData } from './pools.utils';
import { NetworkStatus } from '@apollo/client';

const Pools = () => {
  const PAGE_SIZE = 10;
  const ORDER_BY = 'totalValueLockedUSD';
  const TOTAL_PAGE_COUNT = 6;

  const [pageCount, setPageCount] = useState<number>(1);
  const [orderDirection, setOrderDirection] = useState<string>('desc');
  const [pools, setPools] = useState<PoolsTableType>([]);

  const { loading, data, error, refetch, networkStatus } = useQuery(GET_POOLS, {
    variables: {
      first: PAGE_SIZE,
      orderBy: ORDER_BY,
      orderDirection,
      skip: (pageCount - 1) * PAGE_SIZE,
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleOrderDirection = () => {
    setOrderDirection((prevState) => (prevState === 'desc' ? 'asc' : 'desc'));
  };

  const handleRefetch = () => {
    refetch({ first: PAGE_SIZE, orderBy: ORDER_BY, orderDirection, skip: (pageCount - 1) * PAGE_SIZE });
  };

  const handlePageChange = (val: number) => {
    setPageCount(val);
  };

  useEffect(() => {
    if (data) {
      const { pools } = getPoolsTableData(data.pools);
      setPools(pools);
    }
  }, [data]);

  return (
    <>
      <div style={{ padding: '1rem 0' }}>
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
        </Table>

        {data ? (
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
        ) : null}
      </div>
    </>
  );
};

export default Pools;
