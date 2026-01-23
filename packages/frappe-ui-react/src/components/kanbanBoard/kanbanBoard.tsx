import React, { useState, useCallback } from "react";
import FeatherIcon from "../featherIcon";
import { Button } from "../button";
import type { KanbanBoardProps, KanbanCard, KanbanColumn } from "./types";

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns: initialColumns,
  onCardMove,
  onCardClick,
  onCardAdd,
  renderCard,
  renderColumnHeader,
  enableDragDrop = true,
  showAddCard = false,
  className = "",
}) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [draggedCard, setDraggedCard] = useState<{ card: KanbanCard; columnId: string } | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent, card: KanbanCard, columnId: string) => {
      if (!enableDragDrop) return;
      setDraggedCard({ card, columnId });
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", "");
    },
    [enableDragDrop]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, columnId: string) => {
      if (!enableDragDrop || !draggedCard) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverColumn(columnId);
    },
    [enableDragDrop, draggedCard]
  );

  const handleDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetColumnId: string) => {
      if (!enableDragDrop || !draggedCard) return;
      e.preventDefault();

      const { card, columnId: sourceColumnId } = draggedCard;

      if (sourceColumnId === targetColumnId) {
        setDraggedCard(null);
        setDragOverColumn(null);
        return;
      }

      const newColumns = columns.map((col) => {
        if (col.id === sourceColumnId) {
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== card.id),
          };
        }
        if (col.id === targetColumnId) {
          return {
            ...col,
            cards: [...col.cards, card],
          };
        }
        return col;
      });

      setColumns(newColumns);
      setDraggedCard(null);
      setDragOverColumn(null);

      if (onCardMove) {
        const targetColumn = newColumns.find((col) => col.id === targetColumnId);
        const newIndex = targetColumn?.cards.length ? targetColumn.cards.length - 1 : 0;
        onCardMove(card.id, sourceColumnId, targetColumnId, newIndex);
      }
    },
    [enableDragDrop, draggedCard, columns, onCardMove]
  );

  const handleCardClick = useCallback(
    (card: KanbanCard, columnId: string) => {
      onCardClick?.(card, columnId);
    },
    [onCardClick]
  );

  const handleAddCard = useCallback(
    (columnId: string) => {
      const newCard: KanbanCard = {
        id: `card-${Date.now()}`,
        title: "New Card",
        description: "Click to edit",
      };
      const newColumns = columns.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      );
      setColumns(newColumns);
      onCardAdd?.(columnId, newCard);
    },
    [columns, onCardAdd]
  );

  const defaultRenderCard = (card: KanbanCard, columnId: string) => (
    <div
      className="bg-surface-white border border-outline-gray-2 rounded p-3 mb-2 cursor-pointer hover:shadow-sm transition-shadow"
      onClick={() => handleCardClick(card, columnId)}
    >
      <div className="font-medium text-ink-gray-8 mb-1">{card.title}</div>
      {card.description && (
        <div className="text-sm text-ink-gray-6">{card.description}</div>
      )}
    </div>
  );

  const defaultRenderColumnHeader = (column: KanbanColumn) => (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-ink-gray-8">{column.title}</span>
        <span className="text-sm text-ink-gray-5 bg-surface-gray-2 px-2 py-0.5 rounded">
          {column.cards.length}
        </span>
      </div>
    </div>
  );

  return (
    <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`}>
      {columns.map((column) => (
        <div
          key={column.id}
          className={`flex-shrink-0 w-80 ${
            dragOverColumn === column.id ? "bg-surface-blue-1 rounded-lg p-2" : ""
          }`}
          onDragOver={(e) => handleDragOver(e, column.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className="bg-surface-gray-1 rounded-lg p-4 h-full">
            {renderColumnHeader ? renderColumnHeader(column) : defaultRenderColumnHeader(column)}
            <div className="space-y-2 min-h-[200px]">
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  draggable={enableDragDrop && !column.disabled}
                  onDragStart={(e) => handleDragStart(e, card, column.id)}
                  className={enableDragDrop ? "cursor-move" : ""}
                >
                  {renderCard ? renderCard(card, column.id) : defaultRenderCard(card, column.id)}
                </div>
              ))}
              {showAddCard && !column.disabled && (
                <Button
                  label="Add Card"
                  theme="gray"
                  variant="ghost"
                  size="sm"
                  iconLeft="plus"
                  onClick={() => handleAddCard(column.id)}
                  className="w-full"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


