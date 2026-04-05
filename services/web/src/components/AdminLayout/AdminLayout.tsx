import appLogo from "@assets/images/Logo.svg";
import { Outlet } from "@tanstack/react-router";
import styles from "./AdminLayout.module.scss";

const AdminLayout = () => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <img src={appLogo} alt="logo" className={styles.logo} />
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <nav className={styles.navbar}>
          {/* <Link to={appLayoutRoute.id} search={{}}>
              <img
                src={home}
                alt="home"
                className={`${styles.navImage} ${isHomeActive ? styles.active : ""}`}
              />
            </Link>
            <Link to={productsRoute.id} search={{}}>
              <img
                src={search}
                alt="search"
                className={`${styles.navImage} ${isProductActive ? styles.active : ""}`}
              />
            </Link>
            <Link to={favoritesRoute.id}>
              <img
                src={favorite}
                alt="favorites"
                className={`${styles.navImage} ${isFavoriteActive ? styles.active : ""}`}
              />
            </Link>
            <Link to={cartRoute.id}>
              <img
                src={cart}
                alt="cart"
                className={`${styles.navImage} ${isCartActive ? styles.active : ""}`}
              />
            </Link>
            <Link to={profileRoute.id}>
              <img
                src={profile}
                alt="profile"
                className={`${styles.navImage} ${isProfileActive ? styles.active : ""}`}
              />
            </Link> */}
        </nav>
      </footer>
    </div>
  );
};

export default AdminLayout;
