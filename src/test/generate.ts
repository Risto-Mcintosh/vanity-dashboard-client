import faker from 'faker';
import moment from 'moment';
import { Order, Vanity, VanityColor, OrderStatus, Sizes } from '../types';

const sizes: Sizes[] = ['Small', 'Medium', 'Large'];
const orderStatues: OrderStatus[] = ['New', 'Pending', 'Paid', 'Complete'];
const vanityColors: VanityColor[] = ['White', 'Black', 'Pink'];

const prices: {
  [Small: string]: number;
} = {
  Small: 150,
  Medium: 200,
  Large: 250
};

function generateDates() {
  const dateNow = new Date();
  const datePast = faker.date.past(1, dateNow);
  const orderedOn = faker.date.between(datePast, dateNow);
  const paidOn = moment(orderedOn).add(1, 'd').toDate();
  const completedOn = moment(paidOn).add(7, 'd').toDate();
  const dueOn = completedOn;
  return {
    orderedOn,
    paidOn,
    completedOn,
    dueOn
  };
}

function generateVanity(): Vanity {
  const mirrorSize = faker.random.arrayElement(sizes);
  const tableSize = faker.random.arrayElement(sizes);
  const color = faker.random.arrayElement(vanityColors);
  const mirror = {
    id: faker.random.uuid(),
    type: 'Mirror',
    size: mirrorSize,
    price: prices[mirrorSize]
  };
  const table = {
    id: faker.random.uuid(),
    type: 'Table',
    size: tableSize,
    price: prices[tableSize]
  };
  const baseMaterial = {
    ...mirror,
    type: 'Base Material',
    id: faker.random.uuid()
  };
  return {
    color,
    mirror,
    table,
    baseMaterial
  };
}

function generateCustomer() {
  const customerName = {
    first: faker.name.firstName(),
    last: faker.name.lastName()
  };
  const id = faker.random.uuid();
  const email = faker.internet.email(customerName.first, customerName.last);
  const name = `${customerName.first} ${customerName.last}`;
  const phone = faker.phone.phoneNumber();

  return {
    id,
    email,
    name,
    phone
  };
}

const orders: Order[] = Array.from({ length: 10 }, (_, i) => {
  const customer = generateCustomer();
  const { orderedOn, paidOn, completedOn, dueOn } = generateDates();
  const vanity = generateVanity();
  const total =
    vanity.baseMaterial.price + vanity.mirror.price + vanity.table.price;
  const orderStatus = faker.random.arrayElement(orderStatues);

  const hasDueDate = orderStatus !== 'New' && orderStatus !== 'Paid';
  //faker.random.alphaNumeric(100)
  return {
    id: 1,
    customer,
    orderedOn,
    orderStatus,
    vanity,
    total,
    meta: {
      paidOn: orderStatus === 'New' ? null : paidOn,
      dueOn: hasDueDate ? dueOn : null,
      completedOn: orderStatus === 'Complete' ? completedOn : null
    }
  };
});

console.log(orders);
