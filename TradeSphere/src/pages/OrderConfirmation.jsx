import { useParams } from 'react-router-dom';
import { CircleCheck, PackageX } from 'lucide-react';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import { TableSkeleton } from '../components/common/Skeleton';
import CheckoutSteps from '../components/forms/CheckoutSteps';
import OrderDetails from '../components/forms/OrderDetails';
import useOrders from '../hooks/useOrders';
import useAuth from '../hooks/useAuth';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { getPaymentMethod, getPaymentStatus } from '../utils/payments';

export default function OrderConfirmation() {
  const { id } = useParams();
  const { getOrder, loading } = useOrders();
  const { user } = useAuth();
  const order = getOrder(id);
  useDocumentTitle('Order confirmation');

  if (loading) return <div className="ts-container py-10"><div className="ts-card"><TableSkeleton rows={6} /></div></div>;
  if (!order || (user.role === 'buyer' && order.buyerId !== user.id)) {
    return (
      <div className="ts-container py-12">
        <div className="ts-card"><EmptyState icon={PackageX} headingLevel={1} title="Order not found" text="We could not find this order." action={<Button to="/buyer/orders" variant="navy">View my orders</Button>} /></div>
      </div>
    );
  }

  return (
    <div className="ts-container py-8 sm:py-10">
      <div className="mx-auto max-w-3xl"><CheckoutSteps current={6} /></div>
      <section className="mx-auto mt-8 max-w-3xl rounded-2xl border border-green-200 bg-success-50 p-6 text-center sm:p-8" role="status">
        <CircleCheck className="mx-auto size-12 text-success" aria-hidden="true" />
        <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">Order placed</h1>
        <p className="mt-2 text-ink">Thank you, {order.contact.name}. Your order reference is <span className="font-bold">{order.id}</span>.</p>
        <p className="mt-2 text-sm font-semibold text-ink">{getPaymentMethod(order.paymentMethod)?.label}: {getPaymentStatus(order)}</p>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted">Your order has been recorded. Online payment processing is not yet available on TradeSphere, so no money has been taken; the supplier will confirm payment and shipping details with you.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button to="/buyer/orders" variant="navy">View my orders</Button>
          <Button to="/products" variant="outline">Continue browsing</Button>
        </div>
      </section>
      <div className="mx-auto mt-8 max-w-3xl"><OrderDetails order={order} /></div>
    </div>
  );
}
