import React from "react";
import { Radio } from "antd";
import { PokemonType } from "../type";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

export const RadioPokemonType = ({
  query,
  setQuery,
}: {
  query?: PokemonType;
  setQuery: (p?: PokemonType) => void;
}) => (
  <Radio.Group
    onChange={(e) => {
      setQuery(e.target.value);
    }}
    value={query}
  >
    {Object.keys(PokemonType).map((el) => (
      <Radio style={radioStyle} key={"Radio_" + el} value={el}>
        {el}
      </Radio>
    ))}
  </Radio.Group>
);
