import seedOrders, { toOrderItem } from '../data/orders';
import { STORAGE_KEYS } from '../utils/constants';
import { createCollection, wait } from './localCollection';
import makeId from '../utils/ids';

const orders = createCollection(STORAGE_KEYS.orders, seedOrders);

const orderService = {
  listOrders: (options) => orders.list(options),
  saveOrders: (records) => orders.saveAll(records),

  /** Builds an order record from the selected lines. It is stored in this browser. */
  async createOrder({ lines, totals, shippingMethod, paymentMethod, paymentStatus, source = 'cart', contact, address, buyer }) {
    await wait(700);
    return {
      id: makeId('TS-O'),
      buyerId: buyer.id,
      buyerName: buyer.name,
      buyerCompany: buyer.company ?? '',
      items: lines.map((line) => toOrderItem(line.product, line.quantity, line.variant ?? null)),
      shippingMethod,
      paymentMethod,
      paymentStatus,
      source, // 'cart' or 'buy-now'
      totals: { subtotal: totals.subtotal, shipping: totals.shipping, tax: totals.tax, total: totals.total },
      contact,
      address,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
  },
};

export default orderService;
