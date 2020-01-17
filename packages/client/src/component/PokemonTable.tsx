import React from "react";
import { Table } from "antd";
import { Pokemon, PokemonRow } from "../type";

const mapToTable = (pokemon: Pokemon): PokemonRow => ({
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

export const PokemonTable = ({ data }: { data: Pokemon[] }) => (
  <Table rowKey="name" dataSource={data.map(mapToTable)} columns={columns} />
);
