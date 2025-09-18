import React, { useContext, useMemo, useCallback } from 'react';
import { Link } from 'react-router';

import { ListContext } from './listContext';
import { Checkbox } from '../checkbox';
import ListRowItem from './listRowItem';
import { alignmentMap, getGridTemplateColumns } from './utils';

interface ListRowProps {
  row: any;
  isLastRow?: boolean;
  children?: React.ReactNode;
}

const ListRow: React.FC<ListRowProps> = ({ row, isLastRow = false, children}) => {
  const { options: list } = useContext(ListContext);

  if (!list) {
    throw new Error('ListRow must be used within a ListProvider');
  }

  const isSelected = useMemo(() => list.selections.has(row[list.rowKey]), [list.selections, row, list.rowKey]);

  const isActive = useMemo(
    () => list.options.enableActive && list.activeRow.value === row.name,
    [list.options.enableActive, list.activeRow, row.name]
  );

  const isHoverable = useMemo(
    () => !!list.options.getRowRoute || !!list.options.onRowClick,
    [list.options.getRowRoute, list.options.onRowClick]
  );

  const rowHeight = useMemo(() => {
    if (typeof list.options.rowHeight === 'number') {
      return `${list.options.rowHeight}px`;
    }

    return list.options.rowHeight;
  }, [list.options.rowHeight]);

  const roundedClass = useMemo(() => {
    if (!isSelected) {
        return 'rounded';
    }

    const selections = [...list.selections];
    const rows = list.rows.some(k => k.group) ? list.rows.flatMap(k => k.rows) : list.rows;
    const currentIndex = rows.findIndex(k => k === row);
    
    if (currentIndex === -1){
        return '';
    }

    const atBottom = !selections.includes(rows[currentIndex + 1]?.[list.rowKey]);
    const atTop = !selections.includes(rows[currentIndex - 1]?.[list.rowKey]);

    return (atBottom ? 'rounded-b' : '') + (atTop ? 'rounded-t' : '');
  }, [isSelected, list.selections, list.rows, row, list.rowKey]);

  const onRowClick = useCallback(
    (e: React.MouseEvent) => {
      if (list.options.onRowClick) {
        list.options.onRowClick(row, e);
      }
      if (list.activeRow?.value === row.name) {
        list.activeRow.value = null;
      } else {
        list.activeRow.value = row.name;
      }
    },
    [list, row]
  );

  const Tag = list.options.getRowRoute ? Link : 'div';
  const toProp = list.options.getRowRoute ? { to: list.options.getRowRoute(row) } : { to: '' };
  const clickableProps = isHoverable ? { onClick: onRowClick } : {};

  const ChildTag = list.options.getRowRoute ? 'template' : 'button';

  return (
    <Tag
      className={`flex flex-col transition-all duration-300 ease-in-out ${roundedClass} ${
        isSelected || isActive ? 'bg-surface-gray-2' : ''
      } ${isHoverable ? 'cursor-pointer' : ''} ${
        isHoverable
          ? isSelected || isActive
            ? 'hover:bg-surface-gray-3'
            : 'hover:bg-surface-menu-bar'
          : ''
      }`}
      {...toProp}
      {...clickableProps}
    >
      <ChildTag className='[all:unset] hover:[all:unset]'>
      <div
        className="grid items-center px-2"
        style={{
          height: rowHeight,
          gridTemplateColumns: getGridTemplateColumns(list.columns, list.options.selectable),
        }}
      >
        {list.options.selectable && (
          <div
            className="w-fit pr-2 py-3 flex"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onDoubleClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              value={isSelected}
              onChange={() => list.toggleRow(row[list.rowKey])}
            />
          </div>
        )}
        {children ? children : list.columns.map((column: any, i: number) => (
          <div
            key={column.key}
            className={`${alignmentMap[column.align as keyof typeof alignmentMap]} ${i === 0 ? 'ml-4 text-ink-gray-9' : 'text-ink-gray-7'}`}
          >
            {list.slots?.cell ? (
              <list.slots.cell column={column} row={row} item={row[column.key]} align={column.align} />
            ) : (
              <ListRowItem column={column} row={row} item={row[column.key]} align={column.align} />
            )}
          </div>
        ))}
      </div>
      {!isLastRow && (
        <div
          className={`h-px border-t ${
            roundedClass === 'rounded' || roundedClass.includes('rounded-b')
              ? 'mx-2 border-outline-gray-1'
              : 'border-t-[--surface-gray-2]'
          }`}
        />
      )}
      </ChildTag>
    </Tag>
  );
};

export default ListRow;