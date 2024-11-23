import { ReactNode } from "react";
import "./WorkoutForm.css"

type FormWrapperProps = {
    title: string
    children: ReactNode
}

export function FormWrapper({ title, children }: FormWrapperProps) {
    return (
        <div>
            <h2 className="subSections">{title}</h2>
            <div className="options">{children}</div>
        </div>
    )
}