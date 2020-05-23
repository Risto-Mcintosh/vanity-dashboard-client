export type kanbanOrderDetail = {
  orderId: number;
  customerName: string;
  dueOn: Date | string;
  orderStatus: string;
  kanbanColumnId: number;
  priority: number;
};

export type kanbanColumn = {
  columnId: number | string;
  columnName: string;
  wip?: number | null;
  columnLock: boolean;
  columnPosition: number;
  startColumn: boolean;
  endColumn: boolean;
  orderIds: string[];
};
