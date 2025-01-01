import TableSearch from "@/components/TableSearch"
import Pagination from "@/components/Pagination"
import FormModal from "@/components/FormModal"
import Image from "next/image"
import Table from "@/components/Table"
import { cliente, empresa, Prisma } from "@prisma/client"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import FormContainer from "@/components/FormContainer"

type EmpresaList = empresa & {cliente: cliente}

const columns = [
    {
        header: "Ruc",
        accessor:"ruc", 
    },
    {
        header: "Razon Social",
        accessor:"razonSocial", 
        classname:"hidden md:table-cell",
    },
    {
        header: "Cliente",
        accessor:"cliente", 
        classname:"hidden md:table-cell",
    },
    {
        header: "Usuario SUNAT",
        accessor:"usuario", 
        classname:"hidden lg:table-cell",
    },
    {
        header: "Clave SUNAT",
        accessor:"clave", 
        classname:"hidden lg:table-cell",
    },
    {
        header: "Email de Notificaciones",
        accessor:"email", 
        classname:"hidden lg:table-cell",
    },
    {
        header: "Acciones",
        accessor:"actions",
    }
]

const renderRow = (item: EmpresaList) => {
    return(
        <tr key={item.id_empresa} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLite">
            <td className="flex items-center gap-4 p-4">{item.ruc}</td>
            <td className="hidden md:table-cell">{item.razon_social}</td>
            <td className="hidden md:table-cell">{item.cliente?.nombre}</td>
            <td className="hidden md:table-cell">{item.usuario}</td>
            <td className="hidden md:table-cell">{item.clave}</td>
            <td className="hidden md:table-cell">{item.email}</td>
            <td>
                <div className="flex items-center gap-2">
                    <FormContainer type="update" table="empresa" id={item.id_empresa} data={item} />
                    <FormContainer type="delete" table="empresa" id={item.id_empresa}/>
                </div>
            </td>
        </tr>
    )
}

const EmpresasListPage = async ({ 
    searchParams 
}: { 
    searchParams: { [key: string]: string | undefined };
}) => {

    const {page, ...queryParams} = await searchParams;
    const index = page ? parseInt(page) : 1;

    // URL PARAMS CONDITION
    const query: Prisma.empresaWhereInput = {};

    if(queryParams){
        for (const [key,value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch(key){
                    case "search":
                        query.ruc = {contains: value, mode: "insensitive"}
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [empresasData, count] = await prisma.$transaction([
        prisma.empresa.findMany({
            where: query,
            include: {
                cliente: {select: {nombre:true}}
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (index-1),
        }),
        prisma.empresa.count(),
    ])

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* Top */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Empresas</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch/>
                    {/* Buttons */}
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        <FormContainer type="create" table="empresa"/>
                    </div>
                </div>
            </div>     
            {/* List */}
            <Table columns={columns} renderRow={renderRow} data={empresasData}/>
            {/* Pagination */}
            <Pagination page={index} count={count}/>
        </div>
    )
}

export default EmpresasListPage