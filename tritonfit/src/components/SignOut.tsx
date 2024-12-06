import React from "react";
import styles from "./SignOut.module.css"
import icon from "../assets/signOut.svg"

interface SignOutProps {
  onClose: () => void;
}

const signOut = () => {
    alert("Sign out confirmed.");
};

export const SignOut: React.FC<SignOutProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.backround}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        <img className={styles.icon} src={icon} alt="Are you sure you want to log out of TritonFit"/>
        <button onClick={onClose} className={styles.noButton}>No</button>
        <button onClick={signOut} className={styles.yesButton}>Yes</button>
      </div>
    </div>
  );
};