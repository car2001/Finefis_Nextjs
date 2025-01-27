"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { createEmpresa, updateEmpresa } from "@/lib/actions";
import { empresaSchema, EmpresaSchema } from "@/lib/formValidationSchemas";
import { Dispatch, SetStateAction, useActionState, useEffect, useTransition } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CheckBoxField from "../CheckBoxField";
import Encrypt from "@/lib/encrypt";

const EmpresaForm = ({
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
    } = useForm<EmpresaSchema>({
        resolver: zodResolver(empresaSchema)
    });

    const [isPending, startTransition] = useTransition();
    const [state, formAction] = useActionState(
        type === "create" ? createEmpresa : updateEmpresa, {
        success:false, 
        error: false,
        message: ""
    });

    const onSubmit = handleSubmit(data => {
        startTransition(async () => {
            formAction(data);
        })
    })

    const router = useRouter();

    useEffect(() =>{
        if(state.success){
            toast(`Empresa ha sido ${type === "create" ? "creada" : "actualizada"}!`);
            setOpen(false);
            router.refresh();
        }
    }, [state])

    const { clientes } = relatedData;

    return(
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Crear Empresa" : "Actualizar Empresa"}
            </h1>
            <span className="text-xs text-gray-400 font-medium">Informacion de la Empresa</span>
            <div className="flex justify-between flex-wrap gap-4">
                {data && (
                    <InputField
                        label="id"
                        name="id_empresa"
                        defaultValue={data?.id_empresa}
                        register={register}
                        error={errors?.id_empresa}
                        hidden="hidden"
                    />
                )}
                <InputField
                    name="ruc" 
                    label="Ruc"
                    defaultValue={data?.ruc}
                    register={register} 
                    error={errors.ruc} 
                />
                <InputField 
                    name="razon_social" 
                    label="Razón Social"
                    defaultValue={data?.razon_social}
                    register={register} 
                    error={errors.razon_social} 
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
                    defaultValue={
                        data?.clave 
                        ? Encrypt.decrypt(data?.clave)
                        : data?.clave
                    }
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
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Cliente</label>
                    <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("id_cliente")}
                        defaultValue={data?.id_cliente}
                    >
                        <option value="">Seleccione un cliente</option>
                        {clientes.map(
                            (cliente: { id_cliente: string; nombre: string; }) => (
                                <option value={cliente.id_cliente} key={cliente.id_cliente}>
                                    {cliente.nombre}
                                </option>
                            )
                        )}
                    </select>
                    {errors.id_cliente?.message && (
                        <p className="text-xs text-red-400">
                        {errors.id_cliente.message.toString()}
                        </p>
                    )}
                </div>
            </div>
            <CheckBoxField
                name="inactivo"
                label="¿Está inactivo?"
                defaultValue={data?.inactivo === "1"}
                register={register}
                error={errors?.inactivo}
            />
            {state.error && <span className="text-red-500">{state.message}</span>}
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Crear": "Actualizar"}
            </button>
        </form>
    )
}

export default EmpresaForm;