export type Sizes = 'Small' | 'Medium' | 'Large';

export type OrderStatus = 'New' | 'Pending' | 'Paid' | 'Complete';

export type VanityColor = 'White' | 'Black' | 'Pink';

export type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

type VanityComponent = {
  id?: number;
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
  paidOn?: Date;
  dueOn?: Date;
  completedOn?: Date;
};

export type Order = {
  id: number;
  customer: Customer;
  vanity: Vanity;
  total: number;
  orderStatus: OrderStatus;
  orderedOn: Date;
  meta: Meta;
};
