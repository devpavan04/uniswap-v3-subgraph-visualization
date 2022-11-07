import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Page, Tabs } from '@geist-ui/core';
import Pools from './components/pools/pools.component';
import Tokens from './components/tokens/tokens.component';

const App = () => {
  return (
    <div>
      <Page style={{ maxWidth: '1200px', margin: 'auto', padding: '1rem' }}>
        <Page.Header style={{ padding: '1rem 0' }}>
          <h2>Uniswap V3 Subgraph Visualization 🦄</h2>
        </Page.Header>
        <Page.Content style={{ padding: '0' }}>
          <Tabs initialValue='1'>
            <Tabs.Item label='Overview' value='1'>
              <Pools _pageSize={5} _totalPageCount={12} />
              <Tokens _pageSize={5} _totalPageCount={12} />
            </Tabs.Item>
            <Tabs.Item label='Pools' value='2'>
              <Pools _pageSize={10} _totalPageCount={6} />
            </Tabs.Item>
            <Tabs.Item label='Tokens' value='3'>
              <Tokens _pageSize={10} _totalPageCount={6} />
            </Tabs.Item>
            <Tabs.Item label='Transactions' value='4'></Tabs.Item>
          </Tabs>
        </Page.Content>
      </Page>
    </div>
  );
};

export default App;
