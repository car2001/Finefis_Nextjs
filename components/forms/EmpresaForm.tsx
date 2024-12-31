"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { createEmpresa } from "@/lib/actions";
import { empresaSchema, EmpresaSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EmpresaForm = ({
    type, 
    data,
    setOpen,
} : {
    type: "create" | "update";
    data?: any;
    setOpen:Dispatch<SetStateAction<boolean>>;
}) => {
    
    const { 
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm<EmpresaSchema>({
        resolver: zodResolver(empresaSchema)
    });

    const [state, formAction] = useFormState(createEmpresa, {
        success:false, 
        error: false
    });

    const onSubmit = handleSubmit(data => {
        console.log(data)
        formAction(data);
    })

    const router = useRouter();

    useEffect(() =>{
        if(state.success){
            toast(`Empresa ha sido ${type === "create" ? "creada" : "actualizada"}!`);
            setOpen(false);
            router.refresh();
        }
    }, [state])

    return(
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Crear Empresa" : "Actualizar Empresa"}
            </h1>
            <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField 
                    name="ruc" 
                    label="Ruc"
                    defaultValue={data?.ruc}
                    register={register} 
                    error={errors.ruc} 
                />
                <InputField 
                    name="razonSocial" 
                    label="Razón Social"
                    defaultValue={data?.razonSocial}
                    register={register} 
                    error={errors.razonSocial} 
                />
                <InputField 
                    name="usuario" 
                    label="Usuario"
                    defaultValue={data?.usuario}
                    register={register} 
                    error={errors.usuario} 
                />
                <InputField 
                    type="password" 
                    name="clave" 
                    label="Clave"
                    defaultValue={data?.clave}
                    register={register} 
                    error={errors.clave} 
                />
                <InputField 
                    type="email" 
                    name="email" 
                    label="Email"
                    defaultValue={data?.email}
                    register={register} 
                    error={errors.email} 
                />
            </div>
            {state.error && <span className="text-red-500">Ocurrio un error!</span>}
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Crear": "Actualizar"}
            </button>
        </form>
    )
}

export default EmpresaForm;