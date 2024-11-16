import styles from './ProfilePage.module.css';
import userIcon from "../assets/userIcon.png"
import backIcon from "../assets/backIcon.svg"
import deleteIcon from "../assets/deleteIcon.svg"

interface ProfileEditProps {
    onBackButton: () => void;
}

export const ProfilePage: React.FC<ProfileEditProps> = ({onBackButton}: ProfileEditProps) => {
    const editIcon = () => {
        alert("Edit profile icon.");
    };

    const saveChanges = () => {
        alert("Save changes.");
    };

    const deleteAccount = () => {
        alert("Delete TritonFit account.");
    };

    return (
        <div>
            <h2 className={styles.profileText}>Profile</h2>
            <img className={styles.icon} src={userIcon} alt="icon"/>
            <input className={styles.backButton} type="image" src={backIcon} onClick={onBackButton}/>
            <input className={styles.editIconButton} type="button" value="Tap to edit" onClick={editIcon}/>
            <form className={styles.inputForm}>
                <label className={styles.inputFormLabel} htmlFor="firstNameInput">First name</label>
                <input className={styles.inputFormField} type="text" name="firstNameInput"/>
                <label className={styles.inputFormLabel} htmlFor="lastNameInput">Last name</label>
                <input className={styles.inputFormField} type="text" name="lastNameInput"/>
                <label className={styles.inputFormLabel} htmlFor="emailInput">Email address</label>
                <input className={styles.inputFormField} type="text" name="emailInput"/>
                <label className={styles.inputFormLabel} htmlFor="majorInput">Major and year</label>
                <input className={styles.inputFormField} type="text" name="majorInput"/>
                <label className={styles.inputFormLabel} htmlFor="experienceInput">Experience in Working Out</label>
                <input className={styles.inputFormField} type="text" name="experienceInput"/>
                <label className={styles.inputFormLabel} htmlFor="aboutInput">About me</label>
                <textarea className={styles.inputAbout} name="aboutInput" rows={5}/>
                <button className={styles.submit} type="submit" onClick={saveChanges}>Save Changes</button>
            </form>
            <button className={styles.delete} onClick={deleteAccount}>
                <img className={styles.deleteIcon} src={deleteIcon} alt="icon"/>
                <div className={styles.deleteText}>
                    <h2 className={styles.deleteHeader}>Delete account</h2>
                    <p className={styles.deleteSub}>Delete your TritonFit account</p>
                </div>
            </button>
        </div>
    )
}