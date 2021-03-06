import { Row, Spin } from 'antd';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../component/NotFound';

const ListController = React.lazy(() => import(/* webpackChunkName: "listing" */ '../component/List/Controller'));
const FavoriteController = React.lazy(
  () => import(/* webpackChunkName: "listing" */ '../component/Favorite/Controller')
);

export const Routing = () => (
  <Switch>
    <Route exact path={'/'}>
      <Suspense fallback={<FallbackSpinner />}>
        <ListController />
      </Suspense>
    </Route>
    <Route exact path={'/pokemon-favorite'}>
      <Suspense fallback={<FallbackSpinner />}>
        <FavoriteController />
      </Suspense>
    </Route>
    <Route exact path={'*'}>
      <Suspense fallback={<FallbackSpinner />}>
        <NotFound />
      </Suspense>
    </Route>
  </Switch>
);

const FallbackSpinner = () => (
  <Row justify="center" align="middle" style={{ textAlign: 'center', height: '100vh' }}>
    <Spin size="large" />
  </Row>
);
