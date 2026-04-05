import cart from "@assets/images/cart.svg";
import favorite from "@assets/images/favorite.svg";
import home from "@assets/images/home.svg";
import appLogo from "@assets/images/Logo.svg";
import profile from "@assets/images/profile.svg";
import search from "@assets/images/search.svg";
import NotificationsPopup from "@components/NotificationsPopup/NotificationsPopup";
import { NotificationsProvider } from "@context/NotificationsContext";
import { appLayoutRoute } from "@routes/appLayout";
import cartRoute from "@routes/cartRoute";
import favoritesRoute from "@routes/favoritesRoute";
import { productsRoute } from "@routes/productRoute";
import profileRoute from "@routes/profileRoute";
import { Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  const matchRoute = useMatchRoute();

  const isHomeActive = !!matchRoute({ to: appLayoutRoute.id });
  const isProductActive = !!matchRoute({ to: productsRoute.id });
  const isFavoriteActive = !!matchRoute({ to: favoritesRoute.id });
  const isProfileActive = !!matchRoute({ to: profileRoute.id });
  const isCartActive = !!matchRoute({ to: cartRoute.id });

  return (
    <NotificationsProvider>
      <div className={styles.root}>
        <header className={styles.header}>
          <img src={appLogo} alt="logo" className={styles.logo} />
          <NotificationsPopup />
        </header>

        <main className={styles.main}>
          <Outlet />
        </main>

        <footer className={styles.footer}>
          <nav className={styles.navbar}>
            <Link to={appLayoutRoute.id} search={{}}>
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
            </Link>
          </nav>
        </footer>
      </div>
    </NotificationsProvider>
  );
};

export default AppLayout;
