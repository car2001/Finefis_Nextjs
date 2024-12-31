"use server"

import { randomUUID } from "crypto"
import {  ClienteSchema, EmpresaSchema } from "./formValidationSchemas"
import prisma from "./prisma"

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