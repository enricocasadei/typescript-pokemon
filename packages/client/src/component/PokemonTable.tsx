import React from 'react';
import { Popover } from 'antd';
import { Pokemon, PokemonRow } from '../type';
import VirtualTable from './VirtualTable';

export const PokemonTable = ({ data, loading }: { data: Pokemon[]; loading: boolean }) => {
  return (
    <VirtualTable<PokemonRow>
      loading={loading}
      scroll={{ y: 456, x: '100vw' }}
      pagination={false}
      rowKey="name"
      dataSource={data.map(mapToTable)}
      columns={columns}
    />
  );
};

const mapToTable = (pokemon: Pokemon): PokemonRow & { dataIndex: string } => ({
  id: pokemon.node.id,
  name: pokemon.node.name,
  classification: pokemon.node.classification,
  types: pokemon.node.types.join(','),
  dataIndex: pokemon.node.id,
});

const columns = [
  {
    title: 'Sprite',
    dataIndex: 'sprite',
    key: 'sprite',
    width: 66,
    textAlign: 'center',
    render: (text: any, record: PokemonRow, index: number) => {
      return (
        <Popover
          content={<img alt={`${record.name}`} src={`/images/${record.id}.png`} />}
          title={`${record.name}`}
          trigger="click"
        >
          <img width="56px" alt={`${record.name}`} src={`/sprites/${record.id}MS.png`} />
        </Popover>
      );
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 108,
  },
  {
    title: 'Classification',
    dataIndex: 'classification',
    key: 'classification',
    width: 108,
  },
  {
    title: 'Types',
    dataIndex: 'types',
    key: 'types',
    width: 108,
  },
];
