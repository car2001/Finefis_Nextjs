"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { createDeclaracion, updateDeclaracion } from "@/lib/actions";
import { empresaDeclaracionSchema, EmpresaDeclaracionSchema } from "@/lib/formValidationSchemas";
import { Dispatch, SetStateAction, useActionState, useEffect, useTransition } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EmpresaDeclaracionForm = ({
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
    } = useForm<EmpresaDeclaracionSchema>({
        resolver: zodResolver(empresaDeclaracionSchema)
    });

    const [isPending, startTransition] = useTransition();
    const [state, formAction] = useActionState(
        type === "create" ? createDeclaracion : updateDeclaracion, {
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
            toast(`Empresa Declaracion ha sido ${type === "create" ? "creada" : "actualizada"}!`);
            setOpen(false);
            router.refresh();
        }
    }, [state])

    const { empresas, catalogoDeclaraciones } = relatedData;

    return(
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Crear Empresa Declaración" : "Actualizar Empresa Declaración"}
            </h1>
            <span className="text-xs text-gray-400 font-medium">Informacion de la Empresa Declaración</span>
            <div className="flex justify-between flex-wrap gap-4">
                {data && (
                    <InputField
                        label="id"
                        name="id_declaracion_emp"
                        defaultValue={data?.id_declaracion_emp}
                        register={register}
                        error={errors?.id_declaracion_emp}
                        hidden="hidden"
                    />
                )}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Empresa</label>
                    <select 
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("id_empresa")}
                        defaultValue={data?.id_empresa}>
                        {empresas.map(
                            (empresa: { id_empresa: string; razon_social: string; ruc: string; }) => (
                                <option value={empresa.id_empresa} key={empresa.razon_social}>
                                    {empresa.razon_social}
                                </option>
                            )
                        )}
                    </select>
                    {errors.id_empresa?.message && (
                        <p className="text-xs text-red-400">
                        {errors.id_empresa.message.toString()}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Nro. de Formulario</label>
                    <select 
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("id_formulario")}
                        defaultValue={data?.id_formulario}>
                        {catalogoDeclaraciones.map(
                            (catalogoDeclaracion: { id_formulario: string; descripcion: string; }) => (
                                <option value={catalogoDeclaracion.id_formulario} key={catalogoDeclaracion.descripcion}>
                                    {catalogoDeclaracion.id_formulario}-{catalogoDeclaracion.descripcion}
                                </option>
                            )
                        )}
                    </select>
                    {errors.id_formulario?.message && (
                        <p className="text-xs text-red-400">
                        {errors.id_formulario.message.toString()}
                        </p>
                    )}
                </div>
                <InputField
                    label="Periodo Inicial"
                    type="number"
                    name="per_ini_declaracion"
                    defaultValue={data?.per_ini_declaracion}
                    register={register}
                    error={errors?.per_ini_declaracion}
                />
                <InputField
                    label="Periodo Final"
                    type="number"
                    name="per_fin_declaracion"
                    defaultValue={data?.per_fin_declaracion}
                    register={register}
                    error={errors?.per_fin_declaracion}
                />
                <InputField
                    label="Dias Antes Vencimiento 1"
                    type="number"
                    name="d_a_venci"
                    defaultValue={data?.d_a_venci}
                    register={register}
                    error={errors?.d_a_venci}
                />
                <InputField
                    label="Dias Antes Vencimiento 2"
                    type="number"
                    name="d_a_venci_2"
                    defaultValue={data?.d_a_venci_2}
                    register={register}
                    error={errors?.d_a_venci_2}
                />
                <InputField
                    label="Dias Despúes Vencimiento 1"
                    type="number"
                    name="d_d_venci"
                    defaultValue={data?.d_d_venci}
                    register={register}
                    error={errors?.d_d_venci}
                    inputProps={{ min: 1, step: 1 }}
                />
                <InputField
                    label="Dias de Notificación Despúes de Vencimiento"
                    type="number"
                    name="d_a_v_alerta"
                    defaultValue={data?.d_a_v_alerta}
                    register={register}
                    error={errors?.d_a_v_alerta}
                    inputProps={{ min: 1, step: 1 }}
                />
                <InputField
                    label="Dias de Frecuencia Revision"
                    type="number"
                    name="d_recur_d_venci"
                    defaultValue={data?.d_recur_d_venci}
                    register={register}
                    error={errors?.d_recur_d_venci}
                    inputProps={{ min: 1, step: 1 }}
                />
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Notificación Apagado</label>
                    <input
                    type="checkbox"
                    {...register("ind_notif_apagado")}
                    // defaultValue={data?.ind_notif_apagado === 1}
                    defaultChecked={data?.ind_notif_apagado === "1"} // Si el valor es 1, se marca el checkbox
                    />
                    {errors.ind_notif_apagado?.message && (
                        <p className="text-xs text-red-400">
                            {errors.ind_notif_apagado.message.toString()}
                        </p>
                    )}
                </div>
            </div>
            {state.error && <span className="text-red-500">Ocurrio un error!</span>}
            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Crear": "Actualizar"}
            </button>
        </form>
    )
}

export default EmpresaDeclaracionForm;