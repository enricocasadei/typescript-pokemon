import React from 'react';
import { Checkbox, Row, Typography } from 'antd';
import { PokemonType } from '../type';

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const { Text } = Typography;

export const CheckboxPokemonType = ({
  query = [],
  setQuery,
}: {
  query?: PokemonType[];
  setQuery: (p: PokemonType[]) => void;
}) => (
  <Checkbox.Group
    style={{ width: '100%' }}
    onChange={checkedValues => {
      setQuery(checkedValues as PokemonType[]);
    }}
  >
    {Object.keys(PokemonType).map(el => (
      <Row key={'type_checkbox_' + el}>
        <Checkbox style={radioStyle} value={el}>
          <Text>{el}</Text>
        </Checkbox>
      </Row>
    ))}
  </Checkbox.Group>
);
