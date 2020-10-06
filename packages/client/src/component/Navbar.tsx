import { Menu } from 'antd';
import React from 'react';
import { LinkRoute } from './LinkRoute';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const m = useLocation();
  return (
    <Menu mode="horizontal" defaultSelectedKeys={[activeRoute(m.pathname)]}>
      {routesList.map(item => (
        <Menu.Item key={item.link}>
          <LinkRoute to={item.link}>{item.label}</LinkRoute>
        </Menu.Item>
      ))}
    </Menu>
  );
}

const routesList: { link: string; label: string }[] = [
  {
    link: '/',
    label: 'List',
  },
  { link: '/pokemon-favorite', label: 'Favorite' },
];

const activeRoute = (p: string) => routesList.map(k => k.link).find(k => k === p) || '';
