import React from 'react';
import { Col, Layout, Row } from 'antd';
import Navbar from './Navbar';
import logo from '../images/pokemon.svg';

const { Header } = Layout;

export default function PokemonHeader() {
  return (
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
  );
}
