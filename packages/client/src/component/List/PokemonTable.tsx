import React, { useState } from 'react';
import { Drawer, Typography, Row, Col } from 'antd';
import { Pokemon, PokemonRow } from '../../type';
import VirtualTable from '../VirtualTable';

const { Text } = Typography;

export const PokemonTable = ({ data, loading }: { data: Pokemon[]; loading: boolean }) => {
  const [drawer, setDrawer] = useState<{ open: boolean; record?: PokemonRow }>({ open: false, record: undefined });
  return (
    <>
      <VirtualTable<PokemonRow>
        loading={loading}
        scroll={{ y: 456, x: '80%' }}
        pagination={false}
        rowKey="name"
        dataSource={data.map(mapToTable)}
        columns={columns}
        title={() => `Found ${data.length} Pokemon`}
        onRow={record => {
          return {
            onClick: () => setDrawer({ open: true, record }),
          };
        }}
      />
      <Drawer onClose={() => setDrawer({ open: false })} width={640} placement="right" visible={drawer.open}>
        {drawer.record && (
          <Row>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>{drawer.record.name}</Text>
            </Col>
            <Col>
              <Text>{drawer.record.classification}</Text>
            </Col>
            <Col>
              <Text>{drawer.record.types}</Text>
            </Col>
            <Col>
              <img alt={`${drawer.record.name}`} src={`/images/${drawer.record.id}.png`} />
            </Col>
          </Row>
        )}
      </Drawer>
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
    width: 86,
    textAlign: 'center',
    render: (text: any, record: PokemonRow, index: number) => (
      <img width="56px" alt={`${record.name}`} src={`/sprites/${record.id}MS.png`} />
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: PokemonRow, b: PokemonRow) => a.name.localeCompare(b.name),
    ellipsis: true,
  },
  {
    title: 'Classification',
    dataIndex: 'classification',
    key: 'classification',
    sorter: (a: PokemonRow, b: PokemonRow) => a.classification.localeCompare(b.classification),
    ellipsis: true,
  },
  {
    title: 'Types',
    dataIndex: 'types',
    key: 'types',
  },
];
