import { useState, useEffect } from "react"
import SelectButton from "../SelectButton";
import { FormWrapper } from "../FormWrapper";

type UserData = {
    targetArea: string
}

type Props = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}


export function StepThree({ targetArea, updateFields }: Props) {
    const [selectedValue, setSelectedValue] = useState<string[]>(targetArea.split(", "));
    const [exercises, setExercises] = useState<string>("")

// updates data when selectedValue is changed
    useEffect(() => {
        updateFields({ targetArea: selectedValue.join(", ") });
    }, [selectedValue]);
    
    const onSelect = (info: string) => {
        if (selectedValue.includes(info)) {
            setSelectedValue(((prevlist => prevlist.filter(thing => thing !== info))))
        }
        else {
            setSelectedValue(((prevlist) => [...prevlist, info]))
        }
    }

    return (
        <FormWrapper title="Target Area">
            <p className="desc">
                What areas of your body do you want to target for this workout?
            </p>
            <SelectButton info="Full Body" selected={selectedValue.includes("Full Body")} onSelect={() => onSelect("Full Body")} />
            <SelectButton info="Shoulders" selected={selectedValue.includes("Shoulders")} onSelect={() => onSelect("Shoulders")} />
            <SelectButton info="Chest" selected={selectedValue.includes("Chest")} onSelect={() => onSelect("Chest")} />
            <SelectButton info="Arms" selected={selectedValue.includes("Arms")} onSelect={() => onSelect("Arms")} />
            <SelectButton info="Back" selected={selectedValue.includes("Back")} onSelect={() => onSelect("Back")} />
            <SelectButton info="Legs" selected={selectedValue.includes("Legs")} onSelect={() => onSelect("Legs")} />
            <SelectButton info="Abs" selected={selectedValue.includes("Abs")} onSelect={() => onSelect("Abs")} />
        </FormWrapper>
    )
}