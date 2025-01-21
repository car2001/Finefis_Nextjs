"use server"

import { randomUUID } from "crypto"
import {  ClienteSchema, EmpresaDeclaracionSchema, EmpresaSchema } from "./formValidationSchemas"
import prisma from "./prisma"
import { Decimal } from "@prisma/client/runtime/library"

type CurrentState = {success:boolean, error:boolean}

// Empresa
export const createEmpresa = async(
    currentState: CurrentState,
    data:EmpresaSchema
) => {
    try
    {
        await prisma.empresa.create({
            data: {
                id_empresa: randomUUID(),
                ruc: data.ruc,
                razon_social: data.razon_social,
                usuario: data.usuario,
                clave: data.clave,
                email: data.email,
                id_cliente: parseInt(data.id_cliente)
            }
        });

        // revalidatePath("/list/empresas");
        return {success:true, error:false}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true}
    }
}

export const updateEmpresa = async(
    currentState: CurrentState,
    data:EmpresaSchema
) => {
    try
    {
        await prisma.empresa.update({
            where:{
                id_empresa: data.id_empresa
            },
            data: {
                ruc: data.ruc,
                razon_social: data.razon_social,
                usuario: data.usuario,
                clave: data.clave,
                email: data.email
            }
        });

        return {success:true, error:false}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true}
    }
}

export const deleteEmpresa = async(
    currentState: CurrentState,
    data:FormData
) => {
    try
    {
        const id = data.get("id") as string;
        await prisma.empresa.delete({
            where:{
                id_empresa: id
            },
        });

        return {success:true, error:false}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true}
    }
}

// Cliente

export const createCliente = async(
    currentState: CurrentState,
    data: ClienteSchema
) => {
    try {

        await prisma.cliente.create({
            data: {
                nombre: data.nombre,
                dni: data.dni
            }
        })

        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
};

export const updateCliente = async(
    currentState: CurrentState,
    data:ClienteSchema
) => {
    try
    {
        await prisma.cliente.update({
            where:{
                id_cliente: data.id_cliente
            },
            data: {
                nombre: data.nombre,
                dni: data.dni
            }
        });

        return {success:true, error:false}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true}
    }
}

export const deleteCliente = async(
    currentState: CurrentState,
    data:FormData
) => {
    try
    {
        const id = data.get("id") as string;
        await prisma.cliente.delete({
            where:{
                id_cliente: parseInt(id)
            },
        });

        return {success:true, error:false}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true}
    }
}

// Declaracion

export const createDeclaracion = async(
    currentState: CurrentState,
    data: EmpresaDeclaracionSchema
) => {
    try {
        await prisma.empresa_declaracion.create({
            data:{
                id_declaracion_emp: randomUUID(),
                id_empresa: data.id_empresa,
                per_ini_declaracion: data.per_ini_declaracion,
                per_fin_declaracion: data.per_fin_declaracion,
                d_a_venci: Number.parseInt(data.d_a_venci),
                d_a_venci_2: Number.parseInt(data.d_a_venci_2),
                d_d_venci: Number.parseInt(data.d_d_venci),
                d_a_v_alerta: Number.parseInt(data.d_a_v_alerta),
                d_recur_d_venci: Number.parseInt(data.d_recur_d_venci),
                ind_notif_apagado: data.ind_notif_apagado ? "1" : "0",
                id_formulario: parseInt(data.id_formulario)
            }
        })
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
};

export const updateDeclaracion = async(
    currentState: CurrentState,
    data: EmpresaDeclaracionSchema
) => {
    try
    {   
        const id_declaracion_emp = data.id_declaracion_emp || "";
        const id_empresa = data.id_empresa || "";

        if (!id_declaracion_emp || !id_empresa) {
            throw new Error("Faltan valores de id_declaracion_emp o id_empresa.");
        }

        await prisma.empresa_declaracion.update({
            where: {
                id_declaracion_emp_id_empresa: {
                    id_declaracion_emp: id_declaracion_emp,
                    id_empresa: id_empresa,
                }
            },
            data: {
                per_ini_declaracion: data.per_ini_declaracion,
                per_fin_declaracion: data.per_fin_declaracion,
                d_a_venci: Number.parseInt(data.d_a_venci),
                d_a_venci_2: Number.parseInt(data.d_a_venci_2),
                d_d_venci: Number.parseInt(data.d_d_venci),
                d_a_v_alerta: Number.parseInt(data.d_a_v_alerta),
                d_recur_d_venci: Number.parseInt(data.d_recur_d_venci),
                ind_notif_apagado: data.ind_notif_apagado ? "1" : "0",
                id_formulario: parseInt(data.id_formulario)
            }
        });

        return {success:true, error:false}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true}
    }
}

export const deleteDeclaracion = async(
    currentState: CurrentState,
    data:FormData
) => {
    try
    {
        const id = data.get("id") as string;
        
        const idDeclaracionEmp = id.split(",")[0];
        const idEmpresa = id.split(",")[1];

        await prisma.empresa_declaracion.delete({
            where:{
                id_declaracion_emp_id_empresa: {
                    id_declaracion_emp: idDeclaracionEmp,
                    id_empresa: idEmpresa,
                }
            },
        });

        return {success:true, error:false}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true}
    }
}