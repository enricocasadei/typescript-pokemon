import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Routing } from '../utils/Routing';
import PokemonHeader from './PokemonHeader';

const { Content } = Layout;

export default function Main() {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <PokemonHeader />
        <Content style={{ margin: '24px' }}>
          <Routing />
        </Content>
      </Layout>
    </BrowserRouter>
  );
}
