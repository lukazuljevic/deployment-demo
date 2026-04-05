import { adminOrdersRoute } from "@routes/admin";
import { Link } from "@tanstack/react-router";
import styles from "./AdminDashboard.module.scss";

const AdminDashboard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      <div className={styles.cards}>
        {/* <Link to="/admin/users" className={styles.card}>
          Users
        </Link>
        <Link to="/admin/products" className={styles.card}>
          Products
        </Link> */}
        <Link to={adminOrdersRoute.id} className={styles.card}>
          Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
