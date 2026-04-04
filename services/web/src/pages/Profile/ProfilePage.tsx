import { useProfile } from "@api/profile";
import { AddressType } from "@cart-app/types";
import FetchError from "@components/FetchError";
import EditProfileForm from "@components/Forms/EditProfileForm/EditProfileForm";
import LoadingState from "@components/LoadingState";
import ProfileCardInfo from "@components/ProfileCardInfo";
import ProfilePersonalInfo from "@components/ProfilePersonalInfo";
import useAuth from "@hooks/useAuth";
import usePopup from "@hooks/usePopup";
import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const { data: profile, isError, isLoading, refetch } = useProfile();

  const { isOpen, handleOpen, handleClose } = usePopup();

  const { logout } = useAuth();

  if (isError)
    return <FetchError message="Error loading profile" onRetry={refetch} />;

  if (isLoading) return <LoadingState />;
  if (!profile) return null;

  const shippingAddress = profile.addresses.find(
    (addr) => addr.type === AddressType.SHIPPING,
  );

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.innerContainer}>
          <ProfilePersonalInfo
            firstName={profile.firstName}
            lastName={profile.lastName}
            address={shippingAddress}
          />
          <ProfileCardInfo card={profile.card} />
        </div>
      </div>
      <EditProfileForm
        isOpen={isOpen}
        onClose={handleClose}
        profile={profile}
        shippingAddress={shippingAddress}
      />
      <div className={styles.buttonGroup}>
        <button className={styles.editButton} onClick={handleOpen}>
          Edit Profile
        </button>
        <button className={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfilePage;
