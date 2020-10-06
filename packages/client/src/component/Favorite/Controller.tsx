import { DragOutlined } from '@ant-design/icons/lib/icons';
import { useQuery } from '@apollo/client';
import { Row, Col, List, Typography, Card, Avatar } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { Pokemon, PokemonTableInfo } from '../../type';
import { GET_POKEMON } from '../../utils/gql';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const { Text } = Typography;

type Item = {
  id: string;
  name: string;
  avatar: string;
  description: JSX.Element;
};

export default function FavoriteController() {
  const [list, setList] = useState<Item[]>([]);
  const { loading, data } = useQuery<PokemonTableInfo>(GET_POKEMON);

  const dataMapped: Item[] | undefined = useMemo(() => data?.pokemons.edges.map(mapPokemon), [data]);
  if (dataMapped === undefined || loading === true) return null;

  const onDragEnd = (result: DropResult) => {
    setList([...list, ...dataMapped.filter(p => p.id === result.draggableId)]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row justify="center" align="middle" style={{ textAlign: 'center', height: '100vh' }}>
        <Col span={12}>
          <Droppable key={'main'} droppableId={`${'main'}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                //style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={false}
                  dataSource={dataMapped}
                  renderItem={(item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          <PokemonCard pokemon={item} />
                        </div>
                      )}
                    </Draggable>
                  )}
                />
              </div>
            )}
          </Droppable>
        </Col>
        <Col span={12} style={{ border: '1px solid', minHeight: '56px' }}>
          <Droppable key={'main'} droppableId={`${'main'}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                //style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {list.map(p => (
                  <PokemonCard key={`${p.id}_list`} pokemon={p} />
                ))}
              </div>
            )}
          </Droppable>
        </Col>
      </Row>
    </DragDropContext>
  );
}

const mapPokemon = (pokemon: Pokemon): Item => ({
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

const PokemonCard = ({ pokemon }: { pokemon: Item }) => (
  <Card hoverable style={{ width: 256, textAlign: 'center' }} type="inner" actions={[<DragOutlined />]}>
    <Card.Meta
      avatar={<Avatar shape="square" size={64} src={`/images/${pokemon.id}.png`} />}
      key={pokemon.id}
      title={pokemon.name}
      description={pokemon.description}
    />
  </Card>
);

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 8 * 2,
  margin: `0 0 ${8}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});
