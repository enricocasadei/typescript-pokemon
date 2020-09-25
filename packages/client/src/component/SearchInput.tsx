import React from "react";
import { Input } from "antd";
import { SettingFilled } from "@ant-design/icons";
import { throttle } from "lodash";

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
    onChange={throttleOnChange(set)}
  />
);

const throttleOnChange = (set: (v?: string) => void) => (
  e: React.ChangeEvent<HTMLInputElement>
) => throttle(() => set(e.target.value), 500);
