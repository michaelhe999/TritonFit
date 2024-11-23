import { useState } from "react"
import SelectButton from "../SelectButton";
import { FormWrapper } from "../FormWrapper";

type UserData = {
    level: string
}

type Props = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}


export function StepFour({ level, updateFields }: Props) {
    const [selectedValue, setSelectedValue] = useState(level);
    
    const onSelect = (info: string) => {
        setSelectedValue(info);
        updateFields({ level: info });
    }

    return (
        <FormWrapper title="Activity Level">
            <p className="desc">
                What activity level are you looking for this workout?
            </p>
            <SelectButton info="Beginner" selected={selectedValue === "Beginner"} onSelect={() => onSelect("Beginner")} />
            <SelectButton info="Intermediate" selected={selectedValue === "Intermediate"} onSelect={() => onSelect("Intermediate")} />
            <SelectButton info="Advanced" selected={selectedValue === "Advanced"} onSelect={() => onSelect("Advanced")} />
            <SelectButton info="No Preference" selected={selectedValue === "No Preference"} onSelect={() => onSelect("No Preference")} />
        </FormWrapper>
    )
}