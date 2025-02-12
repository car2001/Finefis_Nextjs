import TableSearch from "@/components/TableSearch"
import Pagination from "@/components/Pagination"
import Image from "next/image"
import Table from "@/components/Table"
import { catalogo_declaracion, empresa, empresa_declaracion, Prisma } from "@prisma/client"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import FormContainer from "@/components/FormContainer"
import { headers } from "next/headers"

type EmpresaList = empresa_declaracion & {empresa: empresa} & {catalogo_declaracion: catalogo_declaracion}

const columns = [
    {
        header: "Empresa",
        accessor: "empresa",
        classname: "wrap-text"
    },
    {
        header: "Nro. de Formulario",
        accessor : "nroFormulario",
        classname: "wrap-text hidden md:table-cell"
    },
    {
        header: "P. Inicial",
        accessor: "periodoInicial", 
        classname: "wrap-text hidden md:table-cell",
    },
    {
        header: "P. Final",
        accessor: "periodoFinal", 
        classname: "wrap-text hidden md:table-cell",
    },
    {
        header: "Días Antes V1",
        accessor: "nroDiasAntesVencimiento1", 
        classname: "wrap-text hidden md:table-cell",
    },
    {
        header: "Días Antes V2",
        accessor: "nroDiasAntesVencimiento2", 
        classname: "wrap-text hidden md:table-cell",
    },
    {
        header: "Días Después V1",
        accessor: "nroDiasDespuesVencimiento1", 
        classname: "wrap-text hidden md:table-cell",
    },
    {
        header: "Días Notif. DV",
        accessor: "nroDiasNotifiDespuesVencimiento", 
        classname: "wrap-text hidden md:table-cell",
    },
    {
        header: "Frecuencia Revisión",
        accessor: "nroDiasFrecuenciaRevVencimiento", 
        classname: "wrap-text hidden md:table-cell",
    },
    {
        header: "Notif. Apagado",
        accessor: "indicadorNotiApagado", 
        classname: "wrap-text hidden md:table-cell",
    },
    {
        header: "Ind. Notificación Vencimiento Cambios",
        accessor: "indicadorNotiVencCambios",
        classname: "wrap-text hidden md:table-cell",
    },
    {
        header: "Acciones",
        accessor: "actions"
    }
];

const renderRow = (item: EmpresaList) => {
    return(
        <tr key={`${item.id_declaracion_emp}${item.id_empresa}`} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLite">
            <td className="gap-4 p-4">{item.empresa.razon_social}</td>
            <td className="hidden md:table-cell">
                {item.id_formulario 
                    ? `${item?.id_formulario?.toString()}-${item?.catalogo_declaracion?.descripcion}` 
                    : ""
                }
            </td>
            <td className="hidden md:table-cell">{item.per_ini_declaracion}</td>
            <td className="hidden md:table-cell">{item.per_fin_declaracion}</td>
            <td className="hidden md:table-cell">{item.d_a_venci?.toString()}</td>
            <td className="hidden md:table-cell">{item.d_a_venci_2?.toString()}</td>
            <td className="hidden md:table-cell">{item.d_d_venci?.toString()}</td>
            <td className="hidden md:table-cell">{item.d_a_v_alerta?.toString()}</td>
            <td className="hidden md:table-cell">{item.d_recur_d_venci?.toString()}</td>
            <td className="hidden md:table-cell">{item.ind_notif_apagado}</td>
            <td className="hidden md:table-cell">{item.ind_notif_by_chg}</td>
            <td>
                <div className="flex items-center gap-2">
                    <FormContainer type="update" table="declaraciones" id={`${item.id_declaracion_emp},${item.id_empresa}`} data={item} />
                    <FormContainer type="delete" table="declaraciones" id={`${item.id_declaracion_emp},${item.id_empresa}`}/>
                </div>
            </td>
        </tr>
    )
}

const DeclaracionesListPage = async ({ 
    searchParams 
}: { 
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {

    const {page, ...queryParams} = await searchParams;
    const index = page ? parseInt(page) : 1;

    // URL PARAMS CONDITION
    const query: Prisma.empresa_declaracionWhereInput = {};

    if(queryParams){
        for (const [key,value] of Object.entries(queryParams)){
            if(value !== undefined){
                switch(key){
                    case "search":
                        query.empresa = {
                            razon_social: {contains: value, mode: "insensitive"},
                        };
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [empresasData, count] = await prisma.$transaction([
        prisma.empresa_declaracion.findMany({
            where: query,
            include: {
                empresa: {select: { razon_social:true }},
                catalogo_declaracion: {select: { descripcion: true }},
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (index-1),
        }),
        prisma.empresa.count(),
    ]);

    const sanitizedData = empresasData.map((item) => {
        return {
          ...item,
        };
    }).sort((a, b) => {
        if (a.id_empresa < b.id_empresa) return -1;
        if (a.id_empresa > b.id_empresa) return 1;
        return 0;
    });

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* Top */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">Declaraciones</h1>
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
                        <FormContainer type="create" table="declaraciones"/>
                    </div>
                </div>
            </div>     
            {/* List */}
            <Table columns={columns} renderRow={renderRow} data={sanitizedData}/>
            {/* Pagination */}
            <Pagination page={index} count={count}/>
        </div>
    )
}

export default DeclaracionesListPage