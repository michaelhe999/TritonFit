import React, { useState } from "react"
import "./WorkoutForm.css"

interface Props {
    info: string;
}

const SelectButton = ({ info }: Props) => {
    const [buttonState, setButtonState] = useState(false);
    const [buttonStyle, setButtonStyle] = useState("unclicked");

    const changeSelected = () => {
        if (buttonStyle !== "unclicked") {
            setButtonStyle("unclicked");
        }
        else {
            setButtonStyle("clicked");
        }
        setButtonState(!buttonState)
    }

    return (
        <div className={buttonStyle} onClick={changeSelected}>
            <h3>
                {info}
            </h3>
        </div>
    )
}

export default SelectButton