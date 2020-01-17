import React, { useState, useEffect } from "react";
import { Input, Icon } from "antd";
import { debounce } from "lodash";

interface SearchProps {
  set: (v?: string) => void;
  value?: string;
  placeholder?: string;
}

export const SearchInput = ({ set, value, placeholder }: SearchProps) => {
  const [_value, _setValue] = useState<string | undefined>(value);
  const debouncedSet = debounce(set, 500);

  useEffect(() => {
    if (value !== _value) debouncedSet(_value);
  }, [_value]);

  return (
    <Input
      placeholder={placeholder}
      addonAfter={<Icon type="setting" />}
      value={_value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        _setValue(e.target.value);
      }}
    />
  );
};
