import { FieldError } from "react-hook-form";

type CheckBoxFieldProps = {
    label: string;
    register:any;
    name: string;
    defaultValue: boolean;
    error?: FieldError;
    hidden?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const CheckBoxField = ({
    label,
    register, 
    name, 
    defaultValue, 
    error,
    hidden,
    inputProps 
}: CheckBoxFieldProps) => {
    return (
        <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4 items-start"}>
            <label className="text-xs text-gray-500">{label}</label>
            <input
                className="ms-6 w-auto flex items-start"
                type="checkbox"
                {...register(name)}
                defaultChecked={defaultValue} // Si el valor es 1, se marca el checkbox
                {...inputProps}
            />
            {error?.message && (
                <p className="text-xs text-red-400">
                    {error.message.toString()}
                </p>
            )}
        </div>
    )
}

export default CheckBoxField;