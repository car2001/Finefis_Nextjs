"use server"

import { randomUUID } from "crypto"
import {  ClienteSchema, EmpresaDeclaracionSchema, EmpresaSchema } from "./formValidationSchemas"
import prisma from "./prisma"
import Encrypt from "./encrypt"

type CurrentState = {success:boolean, error:boolean, message:string}

// Empresa
export const createEmpresa = async(
    currentState: CurrentState,
    data:EmpresaSchema
) => {
    try
    {
        const empresaExistente = await prisma.empresa.findFirst ({
            where: {
                ruc: data.ruc,
            },
        });

        if (empresaExistente) {
            return { success: false, error: true, message: 'Ya existe una empresa con este RUC.' };
        }

        const encryptClave = Encrypt.encrypt(data.clave);

        await prisma.empresa.create({
            data: {
                id_empresa: randomUUID(),
                ruc: data.ruc,
                razon_social: data.razon_social,
                usuario: data.usuario,
                clave: encryptClave,
                email: data.email,
                id_cliente: parseInt(data.id_cliente),
                inactivo: data.inactivo ? "1" : "0"
            }
        });

        // revalidatePath("/list/empresas");
        return {success:true, error:false, message:""}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true, message:"Ocurrio un error"}
    }
}

export const updateEmpresa = async(
    currentState: CurrentState,
    data:EmpresaSchema
) => {
    try
    {
        const empresaExistente = await prisma.empresa.findFirst ({
            where: {
                ruc: data.ruc,
                id_empresa: {
                    not: data.id_empresa
                }
            },
        });

        if (empresaExistente) {
            return { success: false, error: true, message: 'Ya existe una empresa con este RUC.' };
        }

        const encryptClave = Encrypt.encrypt(data.clave);

        await prisma.empresa.update({
            where:{
                id_empresa: data.id_empresa
            },
            data: {
                ruc: data.ruc,
                razon_social: data.razon_social,
                usuario: data.usuario,
                clave: encryptClave,
                email: data.email,
                inactivo: data.inactivo ? "1" : "0"
            }
        });

        return {success:true, error:false, message: ""}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true, message: ""}
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

        return {success:true, error:false, message: ""}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true, message: ""}
    }
}

// Cliente

export const createCliente = async(
    currentState: CurrentState,
    data: ClienteSchema
) => {
    try {

        const clienteExistente = await prisma.cliente.findFirst ({
            where: {
                nombre: data.nombre,
            },
        });

        if (clienteExistente) {
            return { success: false, error: true, message: 'Ya existe un cliente con este nombre.' };
        }

        await prisma.cliente.create({
            data: {
                nombre: data.nombre,
                num_cel: data.num_cel,
                email: data.email,
                ind_actividad: data.ind_actividad ? "1" : "0"
            }
        })

        return { success: true, error: false, message: "" };
    } catch (error) {
        console.log(error);
        return { success: false, error: true, message: "" };
    }
};

export const updateCliente = async(
    currentState: CurrentState,
    data:ClienteSchema
) => {
    try
    {
        const clienteExistente = await prisma.cliente.findFirst({
            where: {
                nombre: data.nombre,
                id_cliente: {
                    not: data.id_cliente,
                },
            },
        });

        if (clienteExistente) {
            return { success: false, error: true, message: 'Ya existe un cliente con este nombre.' };
        }

        await prisma.cliente.update({
            where:{
                id_cliente: data.id_cliente
            },
            data: {
                nombre: data.nombre,
                num_cel: data.num_cel,
                email: data.email,
                ind_actividad: data.ind_actividad ? "1" : "0"
            }
        });

        return {success:true, error:false, message: ""}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true, message: ""}
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

        return {success:true, error:false, message: ""}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true, message: ""}
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
        return { success: true, error: false, message:"" };
    } catch (error) {
        console.log(error);
        return { success: false, error: true, message:"" };
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

        return {success:true, error:false, message:""}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true, message:""}
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

        return {success:true, error:false, message:""}
    }
    catch(error)
    {
        console.log(error)
        return {success:false, error:true, message:""}
    }
}