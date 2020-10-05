import React, { useState, useRef } from 'react';
import { GridOnScrollProps, VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { Table } from 'antd';
import { VirtualTableProps } from '../type';

export default function VirtualTable<T>(props: VirtualTableProps<T>) {
  const { columns, scroll } = props;

  const gridRef = useRef<any | undefined>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const renderVirtualList = (rawData: any[], { ref, onScroll }: any) => {
    ref.current = connectObject;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={columns.length}
        columnWidth={index => columns[index]?.width || 108}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={108 * 4}
        onScroll={(o: GridOnScrollProps) => {
          console.log(o);
          onScroll({ scrollLeft: o.scrollLeft });
        }}
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
    <ResizeObserver
      onResize={({ width }) => {
        console.log(width);
      }}
    >
      <Table
        {...props}
        className="virtual-table"
        columns={columns}
        pagination={false}
        components={{
          body: renderVirtualList as any,
        }}
      />
    </ResizeObserver>
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
