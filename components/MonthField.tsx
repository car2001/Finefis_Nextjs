import { FieldError } from "react-hook-form";

const MonthField = ({
    name, 
    error, 
    label, 
    register,
    defaultValue,
}: {
    name: string; 
    error?: FieldError; 
    label: string;
    register:any;
    defaultValue: string;
}) => {
    return (
        <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">{label}</label>
            <select
                defaultValue={defaultValue}
                {...register(name)}
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
            </select>
            {error?.message && (
                <p className="text-xs text-red-400">
                    {error?.message.toString()}
                </p>
            )}
        </div>
    )
}

export default MonthField