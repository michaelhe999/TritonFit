import { useState } from "react"
import SelectButton from "../SelectButton";
import { FormWrapper } from "../FormWrapper";

type UserData = {
    targetArea: string
}

type Props = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}


export function StepThree({ targetArea, updateFields }: Props) {
    const [selectedValue, setSelectedValue] = useState(targetArea);
    
    const onSelect = (info: string) => {
        setSelectedValue(info);
        updateFields({ targetArea: info });
    }

    return (
        <FormWrapper title="Target Area">
            <p className="desc">
                What areas of your body do you want to target for this workout?
            </p>
            <SelectButton info="Full Body" selected={selectedValue === "Full Body"} onSelect={() => onSelect("Full Body")} />
            <SelectButton info="Shoulders" selected={selectedValue === "Shoulders"} onSelect={() => onSelect("Shoulders")} />
            <SelectButton info="Chest" selected={selectedValue === "Chest"} onSelect={() => onSelect("Chest")} />
            <SelectButton info="Arms" selected={selectedValue === "Arms"} onSelect={() => onSelect("Arms")} />
            <SelectButton info="Back" selected={selectedValue === "Back"} onSelect={() => onSelect("Back")} />
            <SelectButton info="Legs" selected={selectedValue === "Legs"} onSelect={() => onSelect("Legs")} />
            <SelectButton info="Abs" selected={selectedValue === "Abs"} onSelect={() => onSelect("Abs")} />
        </FormWrapper>
    )
}