import React from 'react';
import { Col, Layout, Menu, Row } from 'antd';
import logo from '../images/pokemon.svg';
import { BrowserRouter } from 'react-router-dom';
import { Routing } from '../utils/Routing';
import Navbar from './Navbar';

const { Header, Content } = Layout;

export default function Main() {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <Header title="Pokemon" className="header">
          <Row>
            <Col span={4}>
              <img width="60px" src={logo} alt="Pokemon Logo" />
            </Col>
            <Col span={20}>
              <Navbar />
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: '24px', width: '100vw', height: '100vh' }}>
          <Routing />
        </Content>
      </Layout>
    </BrowserRouter>
  );
}
