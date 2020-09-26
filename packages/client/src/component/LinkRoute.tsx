import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

export const LinkRoute = ({ ...props }: LinkProps) => (
  <Link style={{ textDecoration: 'none', color: 'inherit' }} {...props} />
);
