import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import userIcon from "../assets/userIcon.png"
import backIcon from "../assets/backIcon.svg"
import deleteIcon from "../assets/deleteIcon.svg"

export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
	const [firstName, setFirstName] = useState("Michael");
	const [lastName, setLastName] = useState("He");
	const [email, setEmail] = useState("mih024@ucsd.edu");
	const [major, setMajor] = useState("Computer Science Sophomore");
	const [experience, setExperience] = useState("Running, Sports");
	const [about, setAbout] = useState("Hi! I'm Michael.");
	const [imgSrc, setImgSrc] = useState(userIcon);

	const updateFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(event.target.value)
	}

	const updateLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(event.target.value)
	}

	const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}

	const updateMajor = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMajor(event.target.value)
	}

	const updateExperience = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExperience(event.target.value)
	}

	const updateAbout = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setAbout(event.target.value)
	}

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
        alert(
            "Save changes.\n\n" +
            "First name: " + firstName + "\n" +
            "Last name: " + lastName + "\n" +
            "Email: " + email + "\n" +
            "Major: " + major + "\n" +
            "Experience: " + experience + "\n" +
            "About: " + about
        );
	};

    const editIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImgSrc(e.target?.result as string);
            };
        reader.readAsDataURL(file);
        }
    };

    const deleteAccount = () => {
        alert("Delete TritonFit account.");
    };

    return (
        <div>
            <h2 className={styles.profileText}>Profile</h2>
            <img className={styles.icon} src={imgSrc} alt="icon"/>
            <input className={styles.backButton} type="image" src={backIcon} onClick={() => navigate("/profile")}/>
            <label className={styles.editIconLabel} htmlFor="iconEdit">Tap to edit</label>
            <input className={styles.editIconButton} id="iconEdit" type="file" onChange={editIcon}/>
            <form className={styles.inputForm} onSubmit={(event) => onSubmit(event)}>
                <label className={styles.inputFormLabel} htmlFor="firstNameInput">First name</label>
                <input
                    className={styles.inputFormField}
                    type="text"
                    id="firstNameInput"
					value={firstName}
					onChange={updateFirstName}
                />
                <label className={styles.inputFormLabel} htmlFor="lastNameInput">Last name</label>
                <input
                    className={styles.inputFormField}
                    type="text"
                    id="lastNameInput"
					value={lastName}
					onChange={updateLastName}
                />
                <label className={styles.inputFormLabel} htmlFor="emailInput">Email address</label>
                <input
                    className={styles.inputFormField}
                    type="text"
                    id="emailInput"
					value={email}
					onChange={updateEmail}
                />
                <label className={styles.inputFormLabel} htmlFor="majorInput">Major and year</label>
                <input
                    className={styles.inputFormField}
                    type="text"
                    id="majorInput"
					value={major}
					onChange={updateMajor}
                />
                <label className={styles.inputFormLabel} htmlFor="experienceInput">Experience in Working Out</label>
                <input
                    className={styles.inputFormField}
                    type="text"
                    id="experienceInput"
					value={experience}
					onChange={updateExperience}
                />
                <label className={styles.inputFormLabel} htmlFor="aboutInput">About me</label>
                <textarea
                    className={styles.inputAbout}
                    id="aboutInput"
                    rows={5}
					value={about}
					onChange={updateAbout}
                />
                <button className={styles.submit} type="submit">Save Changes</button>
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