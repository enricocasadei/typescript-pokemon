import React from "react";
import { Input } from "antd";

interface SearchProps {
  set: (v: string) => void;
  value?: string;
}

export default ({ set, value }: SearchProps) => {
  return (
    <Input
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        set(e.target.value);
      }}
    />
  );
};
