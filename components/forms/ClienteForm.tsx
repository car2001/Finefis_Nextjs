"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { createCliente, updateCliente } from "@/lib/actions";
import { clienteSchema, ClienteSchema } from "@/lib/formValidationSchemas";
import { Dispatch, SetStateAction, useActionState, useEffect, useTransition } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ClienteForm = ({
    type, 
    data,
    setOpen,
    relatedData,
} : {
    type: "create" | "update";
    data?: any;
    setOpen:Dispatch<SetStateAction<boolean>>;
    relatedData?: any;
}) => {
    
    const { 
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm<ClienteSchema>({
        resolver: zodResolver(clienteSchema)
    });

    const [isPending, startTransition] = useTransition();
    const [state, formAction] = useActionState(
        type === "create" ? createCliente : updateCliente, {
        success:false, 
        error: false
    });

    const onSubmit = handleSubmit(data => {
        startTransition(async () => {
            formAction(data);
        })
    })

    const router = useRouter();

    useEffect(() =>{
        if(state.success){
            toast(`Cliente ha sido ${type === "create" ? "creadao" : "actualizado"}!`);
            setOpen(false);
            router.refresh();
        }
    }, [state])


    return(
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Crear Cliente" : "Actualizar Cliente"}
            </h1>
            <span className="text-xs text-gray-400 font-medium">Informacion del Cliente</span>
            <div className="flex justify-between flex-wrap gap-4">
                {data && (
                    <InputField
                        label="id_cliente"
                        name="id_cliente"
                        defaultValue={data?.id_cliente}
                        register={register}
                        error={errors?.id_cliente}
                        hidden="hidden"
                    />
                )}
                <InputField
                    name="nombre" 
                    label="Nombre"
                    defaultValue={data?.nombre}
                    register={register} 
                    error={errors.nombre}
                />
                <InputField 
                    name="dni" 
                    label="Dni"
                    defaultValue={data?.dni}
                    register={register} 
                    error={errors?.dni} 
                />
            </div>
            {state.error && <span className="text-red-500">Ocurrio un error!</span>}
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Crear": "Actualizar"}
            </button>
        </form>
    )
}

export default ClienteForm;