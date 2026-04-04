import appLogo from "@assets/images/Logo.svg";
import notification from "@assets/images/notification.svg";
import { loginRoute, registerRoute } from "@routes/auth";
import { Link, Outlet } from "@tanstack/react-router";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import styles from "./AuthLayout.module.scss";

const AuthLayout = () => {
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
          <Link to={loginRoute.id}>
            <FaSignInAlt color="black" />
            Login
          </Link>
          <Link to={registerRoute.id} search={{}}>
            <FaUserPlus color="black" />
            Register
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default AuthLayout;
