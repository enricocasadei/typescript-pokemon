import React from "react";
import { Table } from "antd";
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
  hasNextPage
}: {
  data: Pokemon[];
  hasNextPage?: boolean;
}) => {
  /* const handlePaginationChange = e => {
    const { value } = e.target;
    
      pagination value === 'none' ? false : { position: value },
    
  }; */

  return (
    <Table
      pagination={hasNextPage ? { position: "bottom" } : false}
      rowKey="name"
      dataSource={data.map(mapToTable)}
      columns={columns}
    />
  );
};
