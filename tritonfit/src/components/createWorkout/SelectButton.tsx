import "./WorkoutForm.css"

interface Props {
    info: string;
    selected: boolean
    onSelect: () => void
}

const SelectButton = ({ info, selected, onSelect }: Props) => {

    return (
        <div className={selected ? "clicked" : "unclicked"} onClick={onSelect}>
            <h3>
                {info}
            </h3>
        </div>
    )
}

export default SelectButton