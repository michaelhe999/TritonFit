import styles from './ProfileTab.module.css';
import border from "../assets/border.svg"
import userIcon from "../assets/userIcon.png"
import editIcon from "../assets/editIcon.svg"
import aboutIcon from "../assets/aboutIcon.svg"
import signoutIcon from "../assets/signoutIcon.svg"
import arrowIcon from "../assets/arrowIcon.svg"
import aboutIcon2 from "../assets/aboutIcon2.svg"

export const ProfileTab = () => {
    const editProfile = () => {
        alert("Open profile edit page.");
    };

    const openAbout = () => {
        alert("Open about page.");
    };

    const signOut = () => {
        alert("Open signout page.");
    };

    return (
        <div>
            <img className={styles.border} src={border} alt = "border"/>
            <img className={styles.icon} src={userIcon} alt = "icon"/>
            <h1 className={styles.name}>Jane Doe</h1>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={editProfile}>
                    <img className={styles.buttonIcon} src={editIcon} alt = "icon"/>
                    <div className={styles.buttonText}>
                        <h2 className={styles.buttonHeader}>Profile</h2>
                        <p className={styles.buttonSub}>Tap to edit profile</p>
                    </div>
                    <img className={styles.arrowIcon} src={arrowIcon} alt = "icon"/>
                </button>
                <button className={styles.button} onClick={openAbout}>
                    <img className={styles.buttonIcon} src={aboutIcon} alt = "icon"/>
                    <div className={styles.buttonText}>
                        <h2 className={styles.buttonHeader}>About TritonFit</h2>
                        <p className={styles.buttonSub}>Know more about TritonFit</p>
                    </div>
                    <img className={styles.aboutIcon} src={aboutIcon2} alt = "icon"/>
                </button>
                <button type="button" className={styles.button} onClick={signOut}>
                    <img className={styles.buttonIcon} src={signoutIcon} alt = "icon"/>
                    <div className={styles.buttonText}>
                        <h2 className={styles.buttonHeader}>Sign out</h2>
                        <p className={styles.buttonSub}>Sign out of your account</p>
                    </div>
                </button>
            </div>
        </div>
    )
}