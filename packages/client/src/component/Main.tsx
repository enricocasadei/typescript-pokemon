import React from 'react';
import { Col, Layout, Menu, Row } from 'antd';
import ListController from './ListController';
import logo from '../images/pokemon.svg';

const { Header, Content } = Layout;

export default function Main() {
  return (
    <Layout className="layout">
      <Header title="Pokemon" className="header">
        <Row>
          <Col span={4}>
            <img width="60px" src={logo} alt="Pokemon Logo" />
          </Col>
          <Col span={20}>
            <Menu mode="horizontal">
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Content style={{ margin: '24px' }}>
        <ListController />
      </Content>
    </Layout>
  );
}
