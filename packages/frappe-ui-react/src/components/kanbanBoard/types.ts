export interface KanbanCard {
  /**
   * Unique identifier for the card
   */
  id: string;
  /**
   * Title of the card
   */
  title: string;
  /**
   * Description or content of the card
   */
  description?: string;
  /**
   * Additional metadata
   */
  [key: string]: unknown;
}

export interface KanbanColumn {
  /**
   * Unique identifier for the column
   */
  id: string;
  /**
   * Title of the column
   */
  title: string;
  /**
   * Cards in this column
   */
  cards: KanbanCard[];
  /**
   * Maximum number of cards allowed (optional)
   */
  maxCards?: number;
  /**
   * Whether the column is disabled
   */
  disabled?: boolean;
}

export interface KanbanBoardProps {
  /**
   * Columns configuration
   */
  columns: KanbanColumn[];
  /**
   * Callback when a card is moved
   */
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string, newIndex: number) => void;
  /**
   * Callback when a card is clicked
   */
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  /**
   * Callback when a new card is added
   */
  onCardAdd?: (columnId: string, card: KanbanCard) => void;
  /**
   * Custom render function for cards
   */
  renderCard?: (card: KanbanCard, columnId: string) => React.ReactNode;
  /**
   * Custom render function for column headers
   */
  renderColumnHeader?: (column: KanbanColumn) => React.ReactNode;
  /**
   * Whether drag and drop is enabled
   * @default true
   */
  enableDragDrop?: boolean;
  /**
   * Whether to show add card button
   * @default false
   */
  showAddCard?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}


