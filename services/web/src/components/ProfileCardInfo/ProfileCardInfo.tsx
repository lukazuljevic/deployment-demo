import visa from "@assets/images/visa.svg";
import type { UserCardResponseDto } from "@cart-app/types";
import styles from "@pages/Profile/ProfilePage.module.scss";

interface ProfileCardInfoProps {
  card: UserCardResponseDto;
}

const ProfileCardInfo = ({ card }: ProfileCardInfoProps) => {
  return (
    <section className={styles.section}>
      <img
        src={visa}
        alt="visa"
        style={{ transform: "translateX(-20%)" }}
        className={styles.sectionImage}
      />
      <div className={styles.infoWrapper}>
        <div className={styles.profileInfo}>
          <span className={styles.label}>IBAN:</span>
          <span className={styles.value}>{card.iban}</span>
        </div>
        <div className={styles.profileInfo}>
          <span className={styles.label}>Expiration Date:</span>
          <span className={styles.value}>
            {card.expiryMonth}/{card.expiryYear}
          </span>
        </div>
        <div className={styles.profileInfo}>
          <span className={styles.label}>CVC:</span>
          <span className={styles.value}>{card.cvc}</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileCardInfo;
