import React, { useState, useCallback, useEffect } from "react";
import { Table, Button } from "antd";
import { Pokemon, PokemonRow } from "../type";

const mapToTable = (pokemon: Pokemon): PokemonRow => ({
  id: pokemon.node.id,
  name: pokemon.node.name,
  classification: pokemon.node.classification,
  types: pokemon.node.types.join(",")
});

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Classification",
    dataIndex: "classification",
    key: "classification"
  },
  {
    title: "Types",
    dataIndex: "types",
    key: "types"
  }
];

export const PokemonTable = ({
  data,
  hasNextPage,
  getLastId
}: {
  data: Pokemon[];
  hasNextPage?: boolean;
  getLastId: (val: string) => void;
}) => {
  const [lastId, setLastId] = useState<string | undefined>();

  useEffect(() => {
    setLastId(data[data.length - 1].node.id);
  }, [data]);

  const emitLastId = useCallback(() => getLastId(lastId || ""), [
    lastId,
    getLastId
  ]);

  return (
    <>
      <Table
        onRow={(record: PokemonRow) => {
          return {
            onClick: event => {
              console.log(record, event);
              fetch(
                `https://pokeres.bastionbot.org/images/pokemon/${record.id}.png`
              ).then(console.log);
            }
          };
        }}
        pagination={false}
        rowKey="name"
        dataSource={data.map(mapToTable)}
        columns={columns}
      />
      {hasNextPage && (
        <div style={{ margin: "24px auto", textAlign: "center" }}>
          <Button onClick={emitLastId}>Load More</Button>
        </div>
      )}
    </>
  );
};
