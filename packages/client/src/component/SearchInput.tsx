import React, { useCallback, useEffect, useState } from 'react';
import { Input } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import { debounce } from 'lodash';

interface SearchProps {
  set: (v?: string) => void;
  value?: string;
  placeholder?: string;
}

export const SearchInput = ({ set, value, placeholder }: SearchProps) => {
  const [v, setV] = useState<string | undefined>(value);
  const delayedSet = useCallback(
    debounce(q => set(q), 1000),
    []
  );
  useEffect(() => {
    delayedSet(v);
  }, [v]);

  return (
    <Input
      placeholder={placeholder}
      addonAfter={<SettingFilled />}
      value={v}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setV(e.target.value)}
    />
  );
};
