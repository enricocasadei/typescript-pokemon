import React, { useMemo, useState } from 'react';
import { DragOutlined } from '@ant-design/icons/lib/icons';
import { useQuery } from '@apollo/client';
import { Row, Col, Typography, Card, Avatar } from 'antd';
import { Pokemon, PokemonTableInfo } from '../../type';
import { GET_POKEMON } from '../../utils/gql';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableLocation } from 'react-beautiful-dnd';

const { Text } = Typography;

type Item = {
  id: string;
  name: string;
  avatar: string;
  description: JSX.Element;
};

export default function FavoriteController() {
  const { loading, data } = useQuery<PokemonTableInfo>(GET_POKEMON);
  const dataMapped: Item[] | undefined = useMemo(() => data?.pokemons.edges.map(mapPokemon), [data]);
  if (dataMapped === undefined || loading === true) return null;
  return <FavoriteContent data={dataMapped} />;
}

export function FavoriteContent(props: { data: Item[] }) {
  const [lists, setLists] = useState<Array<Item[]>>([props.data, []]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = getDroppableId(source.droppableId);
    const dInd = getDroppableId(destination.droppableId);

    const newState = [...lists];
    if (sInd === dInd) {
      const items = reorder(lists[sInd], source.index, destination.index);
      newState[sInd] = [...items];
    } else {
      const result = move(lists[sInd], lists[dInd], source, destination);
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
    }

    setLists(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row justify="center" align="middle" style={{ textAlign: 'center', height: '100vh' }} gutter={[16, 16]}>
        {lists.map(DropList)}
      </Row>
    </DragDropContext>
  );
}

const DropList: (list: Item[], i: number) => React.ReactNode = (list, i) => {
  const listKey = getUniqueIdFromIndex(i);
  return (
    <Col key={listKey} span={12} data-custom={listKey}>
      <Droppable key={listKey} droppableId={listKey}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
            <div style={{ padding: '12px' }}>
              <Text style={{ fontWeight: 'bold' }}>
                {i === 0 ? `List of pokemon` : `List of favorites (${list.length} chosen)`}
              </Text>
            </div>
            <div style={{ minHeight: '27956px' }}>{list.map(DragItem(listKey), false)}</div>
          </div>
        )}
      </Droppable>
    </Col>
  );
};

const DragItem: (listKey: 'list' | 'fvrt', disabled?: boolean) => (item: Item, index: number) => React.ReactNode = (
  listKey,
  disabled
) => (item, index) => (
  <Draggable key={`${listKey}_${item.id}`} draggableId={item.id} index={index} isDragDisabled={disabled}>
    {(provided, snapshot) => (
      <div
        data-custom={`${listKey}_${item.id}`}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, disabled)}
      >
        <PokemonCard pokemon={item} />
      </div>
    )}
  </Draggable>
);

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
  <Card
    hoverable
    style={{ width: 256, textAlign: 'center', margin: 'auto', background: '#fafafa' }}
    type="inner"
    actions={[<DragOutlined />]}
  >
    <Card.Meta
      avatar={<Avatar shape="square" size={64} src={`/images/${pokemon.id}.png`} />}
      key={pokemon.id}
      title={pokemon.name}
      description={pokemon.description}
    />
  </Card>
);

const getListStyle = (isDragging: boolean) => ({
  background: isDragging ? 'rgba(24, 144, 255,0.4)' : 'white',
});

const getItemStyle = (isDragging: boolean, draggableStyle: any, disabled?: boolean) => ({
  padding: 16,
  background: isDragging ? '#1890ff' : disabled ? '#f5f5f5' : 'white',
  borderRadius: isDragging ? '8px' : undefined,
  ...draggableStyle,
});

const move = (
  source: Item[],
  destination: Item[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = [...source];
  const destClone = [...destination];
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: Record<number, Item[]> = {};
  result[getDroppableId(droppableSource.droppableId)] = sourceClone;
  result[getDroppableId(droppableDestination.droppableId)] = destClone;

  return result;
};

const reorder = (list: Item[], startIndex: number, endIndex: number) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getDroppableId = (d: string): number => (d === 'list' ? 0 : 1);
const getUniqueIdFromIndex = (i: number): 'list' | 'fvrt' => (i === 0 ? 'list' : 'fvrt');
