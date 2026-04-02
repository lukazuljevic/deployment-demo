import appLogo from "@assets/images/Logo.svg";
import notification from "@assets/images/notification.svg";
import { loginRoute, registerRoute } from "@routes/auth";
import { getRouteApi, Link, Outlet } from "@tanstack/react-router";
import styles from "./AuthLayout.module.scss";

const AuthLayout = () => {
  const loginApi = getRouteApi(loginRoute.id);
  const registerApi = getRouteApi(registerRoute.id);

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
          <Link to={registerApi.id} search={{}}>
            Register
          </Link>
          <Link to={loginApi.id} search={{}}>
            Login
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default AuthLayout;
