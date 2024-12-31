import { FieldError } from "react-hook-form";

type InputFieldProps = {
    label: string;
    type?: string;
    register:any;
    name: string;
    defaultValue: string;
    error?: FieldError;
    hidden?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputField = ({
    label, 
    type, 
    register, 
    name, 
    defaultValue, 
    error,
    hidden,
    inputProps 
}: InputFieldProps) => {
    return (
        <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
            <label className="text-xs text-gray-500">{label}</label>
            <input
                autoComplete="new-password"
                type={type} 
                {...register(name)} 
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                {...inputProps}
                defaultValue={defaultValue}
            />
            {error?.message && (
                <p className="text-xs text-red-400">
                    {error?.message.toString()}
                </p>
            )}
        </div>
    )
}

export default InputField;