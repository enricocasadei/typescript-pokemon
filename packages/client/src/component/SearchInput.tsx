import React from "react";
import { Input } from "antd";
import { SettingFilled } from "@ant-design/icons";

interface SearchProps {
  set: (v?: string) => void;
  value?: string;
  placeholder?: string;
}

export const SearchInput = ({ set, value, placeholder }: SearchProps) => (
  <Input
    placeholder={placeholder}
    addonAfter={<SettingFilled />}
    value={value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(e.target.value)}
  />
);
