import SearchBar from "@components/SearchBar/SearchBar";
import { adminOrdersRoute } from "@routes/admin";
import { useNavigate } from "@tanstack/react-router";
import { OrderStatus } from "@tstypes/OrderStatus";
import styles from "./OrdersHeader.module.scss";

const OrdersHeader = () => {
  const search = adminOrdersRoute.useSearch();
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    navigate({
      to: adminOrdersRoute.id,
      search: (prev) => ({
        ...prev,
        search: value || undefined,
      }),
      replace: true,
    });
  };

  const handleOrderStatus = (value: string) => {
    navigate({
      to: adminOrdersRoute.id,
      search: (prev) => ({
        ...prev,
        orderStatus: (value as OrderStatus) || undefined,
      }),
      replace: true,
    });
  };

  return (
    <div className={styles.header}>
      <SearchBar
        value={search.search || ""}
        placeholder="Search for..."
        onSearchChange={handleSearch}
      />

      <div className={styles.statusContainer}>
        {Object.values(OrderStatus).map((status) => (
          <button
            key={status}
            className={`${styles.statusButton} ${search.orderStatus === status ? "active" : ""}`}
            onClick={() => handleOrderStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrdersHeader;
