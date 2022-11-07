import { useState, useEffect } from 'react';
import { useQuery, NetworkStatus } from '@apollo/client';
import { Tag, Table, Spinner, Grid, Pagination } from '@geist-ui/core';
import { RefreshCw, ArrowUp, ArrowDown, ChevronRightCircle, ChevronLeftCircle } from '@geist-ui/icons';
import { GET_TRANSACTIONS } from './transactions.queries';
import { TransactionsTableType, TransactionsPropsType } from './transactions.types';
import { getTransactionsTableData } from './transactions.helpers';

const Transactions = ({ _pageSize, _totalPageCount }: TransactionsPropsType) => {
  // Data order and sorting
  const ORDER_BY = 'timestamp';
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

  // Updated transactions data i.e shown in the UI
  const [transactions, setTransactions] = useState<TransactionsTableType>([]);

  // Fetch subgraph data using apollo client's useQuery
  const { loading, data, error, refetch, networkStatus } = useQuery(GET_TRANSACTIONS, {
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

  // Get the updated transactions data that should be shown in the UI upon every new query or data refetching
  useEffect(() => {
    if (data) {
      const { transactions } = getTransactionsTableData(data.transactions);
      setTransactions(transactions);
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
          <h3 style={{ margin: '0' }}>Transactions</h3>
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

      <Table data={transactions}>
        <Table.Column prop='transactions' label='Transactions' />
        <Table.Column prop='transactionType' label='Type' />
        <Table.Column prop='totalValue' label='Total Value' />
        <Table.Column prop='tokenAmount0' label='Token Amount 0' />
        <Table.Column prop='tokenAmount1' label='Token Amount 1' />
        <Table.Column prop='account' label='Sender' />
        <Table.Column prop='time'>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            Time{' '}
            {orderDirection === 'desc' ? (
              <ArrowDown cursor='pointer' size={20} onClick={handleOrderDirection} />
            ) : (
              <ArrowUp cursor='pointer' size={20} onClick={handleOrderDirection} />
            )}
          </div>
        </Table.Column>
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

export default Transactions;
