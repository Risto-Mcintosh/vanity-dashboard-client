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
  isStartColumn: boolean;
  isCompleteColumn: boolean;
  orderIds: string[];
};

export type kanbanDataMap = {
  columns: { [key: string]: kanbanColumn };
  orders: { [key: string]: kanbanOrderDetail };
  columnOrder: string[];
};
