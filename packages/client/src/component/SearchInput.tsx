import React, { useState, useEffect } from "react";
import { Input, Icon } from "antd";

interface SearchProps {
  set: (v?: string) => void;
  value?: string;
  placeholder?: string;
}

export const SearchInput = ({ set, value, placeholder }: SearchProps) => (
  <Input
    placeholder={placeholder}
    addonAfter={<Icon type="setting" />}
    value={value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      set(e.target.value);
    }}
  />
);
