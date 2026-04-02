import loadingJson from "@assets/animations/loader.json";
import { Player } from "@lottiefiles/react-lottie-player";
import styles from "./LoadingState.module.scss";

const LoadingState = () => {
  return (
    <div className={styles.loader}>
      <Player
        autoplay
        loop
        src={loadingJson}
        style={{ height: "150px", width: "150px" }}
      />
    </div>
  );
};

export default LoadingState;
