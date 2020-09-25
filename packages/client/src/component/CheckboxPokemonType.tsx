import React from 'react';
import { Checkbox, Row } from 'antd';
import { PokemonType } from '../type';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

export const CheckboxPokemonType = ({
  query = [],
  setQuery,
}: {
  query?: PokemonType[];
  setQuery: (p: PokemonType[]) => void;
}) => (
  <Checkbox.Group>
    {Object.keys(PokemonType).map(el => (
      <Row>
        <Checkbox
          onChange={(e: CheckboxChangeEvent) => {
            if (e.target.checked) {
              setQuery([...query, el as PokemonType]);
            } else {
              setQuery(query.filter(item => item !== el));
            }
          }}
          checked={query.includes(el as PokemonType)}
          style={radioStyle}
          key={'Radio_' + el}
          value={el}
        >
          {el}
        </Checkbox>
      </Row>
    ))}
  </Checkbox.Group>
);
