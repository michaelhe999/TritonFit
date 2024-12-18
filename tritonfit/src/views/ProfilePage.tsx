import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import userIcon from "../assets/userIcon.png"
import backIcon from "../assets/backIcon.svg"
import deleteIcon from "../assets/deleteIcon.svg"

export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
	const [firstName, setFirstName] = useState(() => localStorage.getItem("firstName") || "Jane");
	const [lastName, setLastName] = useState(() => localStorage.getItem("lastName") || "Doe");
	const [email, setEmail] = useState(() => localStorage.getItem("email") || "janedoe@gmail.com");
	const [major, setMajor] = useState(() => localStorage.getItem("major") || "Bioengineering Junior");
	const [experience, setExperience] = useState(() => localStorage.getItem("experience") || "Running, Aerobics");
	const [about, setAbout] = useState(() => localStorage.getItem("about") || "Hi! I'm just a regular Jane Doe.");
	const [imgSrc, setImgSrc] = useState(() => localStorage.getItem("imgSrc") || userIcon);

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
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("major", major);
        localStorage.setItem("experience", experience);
        localStorage.setItem("about", about);
        localStorage.setItem("imgSrc", imgSrc);
        navigate("/profile");
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
        localStorage.clear();
        navigate("/");
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