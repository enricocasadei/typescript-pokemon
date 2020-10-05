import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';

import classNames from 'classnames';
import { Table } from 'antd';
import { VirtualTableProps } from '../type';

export default function VirtualTable<T>(props: VirtualTableProps<T>) {
  const { columns, scroll } = props;

  const renderVirtualList = (rawData: any[]) => {
    return (
      <Grid
        className="virtual-grid"
        columnCount={columns.length}
        columnWidth={98}
        height={scroll.y}
        width={456}
        rowCount={rawData.length}
        rowHeight={54}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === columns.length - 1,
            })}
            style={style}
          >
            {rawData[rowIndex][columns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <Table
      {...props}
      className="virtual-table"
      columns={columns}
      pagination={false}
      components={{
        body: renderVirtualList as any,
      }}
    />
  );
}

// Usage
/* const columns = [
  { title: 'A', dataIndex: 'key', width: 150 },
  { title: 'B', dataIndex: 'key' },
  { title: 'C', dataIndex: 'key' },
  { title: 'D', dataIndex: 'key' },
  { title: 'E', dataIndex: 'key', width: 200 },
  { title: 'F', dataIndex: 'key', width: 100 },
]; */

//const data = Array.from({ length: 100000 }, (_, key) => ({ key }));

//ReactDOM.render(<VirtualTable columns={columns} dataSource={data} scroll={{ y: 300, x: '100vw' }} />, mountNode);
