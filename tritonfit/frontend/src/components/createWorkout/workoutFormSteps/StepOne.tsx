import { useState } from "react"
import SelectButton from "../SelectButton";
import { FormWrapper } from "../FormWrapper";

type UserData = {
    gender: string
}

type Props = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

export function StepOne({ gender, updateFields }: Props) {
    const [selectedValue, setSelectedValue] = useState(gender);

    const onSelect = (info: string) => {
        setSelectedValue(info);
        updateFields({ gender: info });
    }

    return (
        <FormWrapper title="Gender">
            <p className="desc">
                Tell us your gender to better personalize your workout
            </p>
            <SelectButton info="Female" selected={selectedValue === "Female"} onSelect={() => onSelect("Female")} />
            <SelectButton info="Male" selected={selectedValue === "Male"} onSelect={() => onSelect("Male")} />
            <SelectButton info="Neither" selected={selectedValue === "Neither"} onSelect={() => onSelect("Neither")} />
            <SelectButton info="Prefer not to say" selected={selectedValue === "Prefer not to say"} onSelect={() => onSelect("Prefer not to say")} />
        </FormWrapper>
    )
}