import React, { useState, useCallback, useEffect } from 'react';
import { Table, Button, Popover } from 'antd';
import { Pokemon, PokemonRow } from '../type';
import VirtualTable from './VirtualTable';

export const PokemonTable = ({
  data,
  hasNextPage,
  getLastId,
}: {
  data: Pokemon[];
  hasNextPage?: boolean;
  getLastId: (val: string) => void;
}) => {
  const [lastId, setLastId] = useState<string | undefined>();

  useEffect(() => {
    setLastId(data[data.length - 1].node.id);
  }, [data]);

  const emitLastId = useCallback(() => getLastId(lastId || ''), [lastId, getLastId]);

  return (
    <>
      <VirtualTable<PokemonRow>
        scroll={{ y: 456, x: '100vw' }}
        pagination={false}
        rowKey="name"
        dataSource={data.map(mapToTable)}
        columns={columns}
      />
      {hasNextPage && (
        <div style={{ margin: '24px auto', textAlign: 'center' }}>
          <Button onClick={emitLastId}>Load More</Button>
        </div>
      )}
    </>
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
    width: '66px',
    textAlign: 'center',
    render: (text: any, record: PokemonRow, index: number) => {
      return (
        <Popover content={<img src={`/images/${record.id}.png`} />} title={`${record.name}`} trigger="click">
          <img width="56px" src={`/sprites/${record.id}MS.png`} />
        </Popover>
      );
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '108px',
  },
  {
    title: 'Classification',
    dataIndex: 'classification',
    key: 'classification',
    width: '108px',
  },
  {
    title: 'Types',
    dataIndex: 'types',
    key: 'types',
    width: '108px',
  },
];
