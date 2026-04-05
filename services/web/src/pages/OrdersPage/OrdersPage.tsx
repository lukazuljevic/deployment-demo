import OrdersHeader from "@components/OrdersHeader/OrdersHeader";
import styles from "./OrdersPage.module.scss";

const OrdersPage = () => {
  return (
    <div className={styles.ordersContainer}>
      <OrdersHeader />
    </div>
  );
};

export default OrdersPage;
