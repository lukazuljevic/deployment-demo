import home from "@assets/images/home.svg";
import appLogo from "@assets/images/Logo.svg";
import notification from "@assets/images/notification.svg";
import { adminRoute } from "@routes/admin";
import { getRouteApi, Link, Outlet } from "@tanstack/react-router";
import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  const adminApi = getRouteApi(adminRoute.id);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <img src={appLogo} alt="logo" className={styles.logo} />
        <img src={notification} alt="notifications" />
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <nav className={styles.navbar}>
          <Link to=".">
            <img src={home} alt="home" />
          </Link>
          <Link to={adminApi.id} search={{}}>
            Admin
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default AppLayout;
