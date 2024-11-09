import { useState } from "react"
import SelectButton from "../SelectButton";
import { FormWrapper } from "../FormWrapper";

type UserData = {
    duration: string
}

type Props = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}


export function StepFive({ duration, updateFields }: Props) {
    const [selectedValue, setSelectedValue] = useState(duration);
    
    const onSelect = (info: string) => {
        setSelectedValue(info);
        updateFields({ duration: info });
    }

    return (
        <FormWrapper title="Workout Length">
            <p className="desc">
                How long are you looking to workout for?
            </p>
            <SelectButton info="20-30 min" selected={selectedValue === "20-30 min"} onSelect={() => onSelect("20-30 min")} />
            <SelectButton info="30-50 min" selected={selectedValue === "30-50 min"} onSelect={() => onSelect("30-50 min")} />
            <SelectButton info="60 min +" selected={selectedValue === "60 min +"} onSelect={() => onSelect("60 min +")} />
            <SelectButton info="No Preference" selected={selectedValue === "No Preference"} onSelect={() => onSelect("No Preference")} />
        </FormWrapper>
    )
}