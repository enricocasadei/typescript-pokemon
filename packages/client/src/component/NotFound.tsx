import { Row, Col } from 'antd';
import React from 'react';
import { LinkRoute } from './LinkRoute';

export default function NotFound() {
  return (
    <Row style={{ width: '100%', textAlign: 'center', backgroundColor: '#f5f5f5' }} gutter={[16, 16]}>
      <Col>
        <LinkRoute to="/">
          <img alt="404" width="44%" src="/images/404-page-not-found.jpg" />
        </LinkRoute>
      </Col>
    </Row>
  );
}
