import { DragOutlined } from '@ant-design/icons/lib/icons';
import { useQuery } from '@apollo/client';
import { Row, Col, List, Typography, Card, Avatar } from 'antd';
import React, { useMemo } from 'react';
import { Pokemon, PokemonTableInfo } from '../../type';
import { GET_POKEMON } from '../../utils/gql';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { Text } = Typography;

export default function FavoriteController() {
  const { loading, data } = useQuery<PokemonTableInfo>(GET_POKEMON);

  const dataMapped = useMemo(() => data?.pokemons.edges.map(mapPokemon), [data]);

  return (
    <Row justify="center" align="middle" style={{ textAlign: 'center', height: '100vh' }}>
      <Col span={12}>
        <List
          loading={loading}
          itemLayout="vertical"
          size="large"
          pagination={false}
          dataSource={dataMapped}
          renderItem={item => (
            <Card hoverable style={{ width: 256, textAlign: 'center' }} type="inner" actions={[<DragOutlined />]}>
              <Card.Meta
                avatar={<Avatar shape="square" size={64} src={`/images/${item.id}.png`} />}
                key={item.id}
                title={item.name}
                description={item.description}
              />
            </Card>
          )}
        />
      </Col>
    </Row>
  );
}

const mapPokemon = (pokemon: Pokemon) => ({
  id: pokemon.node.id,
  name: `${pokemon.node.name}`,
  avatar: `/sprites/${pokemon.node.id}MS.png`,
  description: (
    <Text>
      {pokemon.node.classification}
      <br />
      {pokemon.node.types.join(', ')}
    </Text>
  ),
});

//list of pokemon

///list of favorite
