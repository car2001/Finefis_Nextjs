import TableSearch from "@/components/TableSearch"
import Pagination from "@/components/Pagination"
import FormModal from "@/components/FormModal"
import Image from "next/image"
import Table from "@/components/Table"
import { cliente } from "@prisma/client"
import prisma from "@/lib/prisma"

type ClientesList = cliente

const columns = [
    {
        header: "Nombre",
        accessor:"nombre", 
    },
    {
        header: "Tipo Plan",
        accessor:"tipoPlan", 
        classname:"hidden md:table-cell",
    },
    {
        header: "DNI",
        accessor:"dni", 
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
            <td className="flex items-center gap-4 p-4">{item.nombre}</td>
            <td className="hidden md:table-cell">{item.tipo_plan}</td>
            <td className="hidden md:table-cell">{item.dni?.toString() || "" }</td>
            <td>
                <div className="flex items-center gap-2">
                    <FormModal type="update" table="teacher" id={item.id_cliente} data={item} />
                    <FormModal type="delete" table="teacher" id={item.id_cliente}/>
                </div>
            </td>
        </tr>
    )
}

const ClientesListPage = async () => {

    const clientesData = await prisma.cliente.findMany({});

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
                        <FormModal type="create" table="teacher"/>
                    </div>
                </div>
            </div>     
            {/* List */}
            <Table columns={columns} renderRow={renderRow} data={clientesData}/>
            {/* Pagination */}
            <Pagination/>
        </div>
    )
}

export default ClientesListPage