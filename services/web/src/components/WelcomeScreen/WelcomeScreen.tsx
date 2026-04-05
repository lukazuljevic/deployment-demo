import logo from "@assets/images/brand name.svg";
import cartLogo from "@assets/images/cart logo.svg";
import { appLayoutRoute } from "@routes/appLayout";
import { useNavigate } from "@tanstack/react-router";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import styles from "./WelcomeScreen.module.scss";

const TIMEOUT = 1000;

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const startLogoRef = useRef<HTMLImageElement>(null);
  const endLogoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!startLogoRef.current || !endLogoRef.current) return;

    const t1 = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          navigate({ to: appLayoutRoute.id, replace: true });
        }, TIMEOUT);
      },
    });

    t1.to(startLogoRef.current, {
      rotationZ: 360,
      duration: 1,
      ease: "power1.inOut",
    });

    t1.to(startLogoRef.current, {
      x: "-100%",
      duration: 0.5,
      ease: "power1.inOut",
    });
    t1.fromTo(
      endLogoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power1.inOut" },
    );

    return () => {
      t1.kill();
    };
  }, []);
  return (
    <div className={styles.welcomeScreen}>
      <img
        src={cartLogo}
        alt="Start Logo"
        ref={startLogoRef}
        className={styles.startLogo}
      />
      <img
        src={logo}
        alt="End Logo"
        ref={endLogoRef}
        className={styles.endLogo}
      />
    </div>
  );
};

export default WelcomeScreen;
