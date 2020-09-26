import { Row, Spin } from 'antd';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const ListController = React.lazy(() => import(/* webpackChunkName: "listing" */ '../component/ListController'));

export const Routing = () => (
  <Switch>
    <Route exact path={'/'}>
      <Suspense fallback={<FallbackSpinner />}>
        <ListController />
      </Suspense>
    </Route>
  </Switch>
);

const FallbackSpinner = () => (
  <Row justify="center" align="middle" style={{ textAlign: 'center' }}>
    <Spin size="large" />
  </Row>
);
