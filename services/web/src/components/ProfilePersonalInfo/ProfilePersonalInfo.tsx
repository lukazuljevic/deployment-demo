import user from "@assets/images/user.svg";
import type { UserAddressResponseDto } from "@cart-app/types";
import styles from "@pages/Profile/ProfilePage.module.scss";

interface ProfilePersonalInfoProps {
  firstName: string;
  lastName: string;
  address?: UserAddressResponseDto;
}

const ProfilePersonalInfo = ({
  firstName,
  lastName,
  address,
}: ProfilePersonalInfoProps) => {
  return (
    <section className={styles.section}>
      <img src={user} alt="user avatar" className={styles.sectionImage}></img>
      <div className={styles.infoWrapper}>
        <div className={styles.profileInfo}>
          <span className={styles.label}>Name:</span>
          <span className={styles.value}>
            {firstName} {lastName}
          </span>
        </div>
        <div className={styles.profileInfo}>
          <span className={styles.label}>Address:</span>
          <span className={styles.value}>
            {address
              ? `${address.street},${address.city}`
              : "No shipping address"}
          </span>
        </div>
        <div className={styles.profileInfo}>
          <span className={styles.label}>County:</span>
          <span className={styles.value}>
            {address
              ? `${address.county},${address.zipcode},${address.country}`
              : "No county info"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProfilePersonalInfo;
