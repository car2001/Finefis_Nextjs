"use client"

import { Dispatch, JSX, SetStateAction, useActionState, useEffect, useState, useTransition } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { deleteCliente, deleteEmpresa, deleteDeclaracion } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";

const deleteActionMap: {[key:string]: any} = {
    empresa: deleteEmpresa,
    cliente: deleteCliente,
    empresa_declaracion: deleteDeclaracion
}

const TeacherForm = dynamic(() => import('./forms/TeacherForm'), {
    loading: () => <p>Loading...</p>,
});
const EmpresaForm = dynamic(() => import('./forms/EmpresaForm'), {
    loading: () => <p>Loading...</p>,
})
const ClienteForm = dynamic(() => import('./forms/ClienteForm'), {
    loading: () => <p>Loading...</p>,
})
const EmpresaDeclaracionForm = dynamic(() => import('./forms/EmpresaDeclaracionForm'), {
    loading: () => <p>Loading...</p>,
})

const forms: {
    [key:string] : (
        setOpen:Dispatch<SetStateAction<boolean>>, 
        type: "create" | "update", 
        data?: any,
        relatedData?: any
    ) => JSX.Element
} = {
    teacher: (setOpen,type, data, relatedData) => <TeacherForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />,
    empresa: (setOpen,type, data, relatedData) => <EmpresaForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />,
    cliente: (setOpen,type, data, relatedData) => <ClienteForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />,
    empresa_declaracion: (setOpen,type, data, relatedData) => <EmpresaDeclaracionForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
};

const FormModal = ({
    table,
    type,
    data,
    id, 
    relatedData
} : FormContainerProps & { relatedData?: any }) => {

    const [open, setOpen] = useState(false);

    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = 
        type === "create" 
        ? "bg-lamaYellow" 
        : type === "update" ? "bg-lamaSky" : "bg-lamaPurple";

    const Form = () => {

        const [state, formAction] = useActionState(deleteActionMap[table] ,{
            success:false, 
            error: false
        });

        const router = useRouter();

        useEffect(() =>{
            if(state.success){
                toast(`Registro ha sido eliminado!`);
                setOpen(false);
                router.refresh();
            }
        }, [state])

        return type === "delete" && id ? 
        (
            <form action={formAction} className="p-4 flex flex-col gap-4">
                <input type="text | number " name="id" defaultValue={id ? id.toString() : ""} hidden />
                <span className="text-center font-medium">All data will be lost. Are you sure you want to delete this {table}?</span>
                <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
            </form>
        ) : type === "create" ||  type === "update" ?
        (
            forms[table](setOpen,type,data,relatedData)
        ) : (
        "Form not found"
        );
    }

    return(
        <>
            <button 
                className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
                onClick={() => setOpen(true)}>
                <Image src={`/${type}.png`} alt="" width={16} height={16} />
            </button>
            {open && 
                <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[50%]">
                        <Form/>
                        <div className="absolute top-4 right-4 cursor-pointer" onClick={()=> setOpen(false)}>
                            <Image src="/close.png" alt="" width={14} height={14} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default FormModal;