import React, { useState, useEffect, useRef } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { Table } from 'antd';
import { ColumnProps, TableProps } from 'antd/lib/table/interface';

interface VirtualColumnProps<T> extends ColumnProps<T> {
  dataIndex: string;
}

interface VirtualTableProps<T> extends TableProps<T> {
  columns: VirtualColumnProps<T>[];
  scroll: {
    x?: string | number | boolean | undefined;
    y: number;
    scrollToFirstRowOnChange?: boolean | undefined;
  };
}

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

  const resetVirtualGrid = () => {
    gridRef.current &&
      gridRef.current.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: false,
      });
  };

  const renderVirtualList = (rawData: any[], { scrollbarSize, ref, onScroll }: any) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={columns.length}
        columnWidth={index => {
          const { width } = columns[index];
          console.log(width);
          if (width) {
            if (typeof width === 'number') {
              return totalHeight > scroll.y && index === columns.length - 1 ? width - scrollbarSize - 1 : width;
            } else {
              console.log(parseInt(width));
            }
          }

          return 108;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={108 * 4}
        onScroll={({ scrollLeft }) => {
          onScroll({ scrollLeft });
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
