import React, { useState } from "react"
import "./WorkoutForm.css"

interface Props {
    info: string;
}

const SelectButton = ({ info }: Props) => {
    const [buttonState, setButtonState] = useState("unclicked");

    const changeSelected = () => {
        if (buttonState !== "unclicked") {
            setButtonState("unclicked");
        }
        else {
            setButtonState("clicked");
        }
    }

    return (
        <div className={buttonState} onClick={changeSelected}>
            <h3>
                {info}
            </h3>
        </div>
    )
}

export default SelectButton