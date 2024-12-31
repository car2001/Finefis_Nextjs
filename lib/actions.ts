"use server"

import { randomUUID } from "crypto"
import { EmpresaSchema } from "./formValidationSchemas"
import prisma from "./prisma"
import { revalidatePath } from "next/cache"

type CurrentState = {success:boolean, error:boolean}

export const createEmpresa = async(
    currentState: CurrentState,
    data:EmpresaSchema
) => {
    try
    {
        await prisma.empresa.create({
            data: {
                id_empresa: randomUUID(),
                ruc: data.ruc
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