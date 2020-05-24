export type kanbanOrderDetail = {
  orderId: string;
  customerName: string;
  dueOn: Date | string | null;
  orderStatus: string;
  kanbanColumnId: string;
  priority: number;
};

export type kanbanColumn = {
  columnId: string;
  columnName: string;
  wip?: number | null;
  columnLock: boolean;
  startColumn: boolean;
  endColumn: boolean;
  orderIds: string[];
};
