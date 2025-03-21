import TableSearch from "@/components/TableSearch"
import Pagination from "@/components/Pagination"
import FormModal from "@/components/FormModal"
import Image from "next/image"
import Table from "@/components/Table"
import { cliente, Prisma } from "@prisma/client"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import FormContainer from "@/components/FormContainer"
import { it } from "node:test"

type ClientesList = cliente

const columns = [
    {
        header: "Nombre",
        accessor:"nombre",
        classname:"w-fit" 
    },
    // {
    //     header: "Tipo Plan",
    //     accessor:"tipoPlan", 
    //     classname:"hidden md:table-cell",
    // },
    // {
    //     header: "DNI",
    //     accessor:"dni", 
    //     classname:"hidden md:table-cell",
    // },
    {
        header: "Email",
        accessor:"email", 
        classname:"hidden md:table-cell",
    },
    {
        header: "Nro Celular",
        accessor:"num_cel", 
        classname:"hidden md:table-cell",
    },
    {
        header: "Activo",
        accessor:"activo_cliente", 
        classname:"hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor:"actions",
    }
]

const renderRow = (item: ClientesList) => {
    return(
        <tr key={item.id_cliente} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLite">
            <td className="flex items-center py-4 w-fit">{item.nombre}</td>
            {/* <td className="hidden md:table-cell">{item.tipo_plan}</td> */}
            {/* <td className="hidden md:table-cell">{item.dni?.toString() || "" }</td> */}
            <td className="hidden md:table-cell">{item.email?.toString() || "" }</td>
            <td className="hidden md:table-cell">{item.num_cel?.toString() || "" }</td>
            <td className="hidden md:table-cell">
                {item?.ind_actividad 
                    ? ( <span className="text-green-400 text-xl">✔</span> ) 
                    : ( <span className="text-red-500 text-lg font-bold">✖</span> )
                }
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <FormContainer type="update" table="cliente" id={item.id_cliente} data={item} />
                    <FormContainer type="delete" table="cliente" id={item.id_cliente}/>
                </div>
            </td>
        </tr>
    )
}

const ClientesListPage = async ({ 
    searchParams 
}: { 
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {

    const {page, ...queryParams} = await searchParams;
    const index = page ? parseInt(page) : 1;

    // URL PARAMS CONDITION
    const query: Prisma.clienteWhereInput = {};

    if(queryParams){
        for (const [key,value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch(key){
                    case "search":
                        query.nombre = {contains: value, mode: "insensitive"}
                        break;
                    default:
                        break;
                }
            }
        }
    }
    const [clientesData, count] = await prisma.$transaction([
        prisma.cliente.findMany({
            where: query,
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (index-1),
        }),
        prisma.cliente.count(),
    ])

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* Top */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Clientes</h1>
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
                        <FormContainer type="create" table="cliente"/>
                    </div>
                </div>
            </div>     
            {/* List */}
            <Table columns={columns} renderRow={renderRow} data={clientesData}/>
            {/* Pagination */}
            <Pagination page={index} count={count}/>
        </div>
    )
}

export default ClientesListPage