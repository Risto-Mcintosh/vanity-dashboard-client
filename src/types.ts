export type Sizes = 'Small' | 'Medium' | 'Large';

export type OrderStatus = 'New' | 'Pending' | 'Paid' | 'Complete';

export type VanityColor = 'White' | 'Black' | 'Pink';

export type Customer = {
  id: number | string;
  name: string;
  phone: string;
  email: string;
};

export type VanityComponent = {
  id?: number | string;
  type: string;
  size: Sizes | string;
  price: number;
};

export type Vanity = {
  color: VanityColor;
  mirror: VanityComponent;
  table: VanityComponent;
  baseMaterial: VanityComponent;
};

export type Meta = {
  paidOn?: Date | null;
  dueOn?: Date | null;
  completedOn?: Date | null;
};

export type Order = {
  id: number | string;
  customer: Customer;
  vanity: Vanity;
  total: number;
  orderStatus: OrderStatus;
  orderedOn: Date;
  meta: Meta;
};

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
  color: string | null;
};

export type kanbanDataMap = {
  columns: { [key: string]: kanbanColumn };
  orders: { [key: string]: kanbanOrderDetail };
  columnOrder: string[];
};
