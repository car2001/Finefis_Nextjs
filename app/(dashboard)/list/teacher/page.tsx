import TableSearch from "@/components/TableSearch"
import Pagination from "@/components/Pagination"
import FormModal from "@/components/FormModal"
import Image from "next/image"
import Table from "@/components/Table"
import Link from "next/link"
import { teachersData } from "@/lib/data"

type Teacher = {
    id: number;
    teacherId: string;
    name:string;
    email?:string;
    photo:string;
    phone:string;
    subjects:string [];
    classes:string [];
    address:string;
}

const columns = [
    {
        header: "Info", 
        accessor:"info"
    },
    {
        header: "Teacher ID",
        accessor:"teacherId", 
        classname:"hidden md:table-cell",
    },
    {
        header: "Subjects",
        accessor:"subjects", 
        classname:"hidden md:table-cell",
    },
    {
        header: "Classes",
        accessor:"classes", 
        classname:"hidden md:table-cell",
    },
    {
        header: "Phone",
        accessor:"phone", 
        classname:"hidden lg:table-cell",
    },
    {
        header: "Address",
        accessor:"address", 
        classname:"hidden lg:table-cell",
    },
    {
        header: "Actions",
        accessor:"actions",
    }
]

const TeacherListPage = () => {

    const renderRow = (item: Teacher) => {
        return(
            <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLite">
                <td className="flex items-center gap-4 p-4">
                    <Image 
                        src={item.photo} 
                        alt="" 
                        width={40}
                        height={40} 
                        className="md:hidden xl:block w-10 h-10 rounded-full object-cover" 
                    />
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item?.email}</p>
                    </div>
                </td>
                <td className="hidden md:table-cell">{item.teacherId}</td>
                <td className="hidden md:table-cell">{item.subjects.join(",")}</td>
                <td className="hidden md:table-cell">{item.classes.join(",")}</td>
                <td className="hidden md:table-cell">{item.phone}</td>
                <td className="hidden md:table-cell">{item.address}</td>
                <td>
                    <div className="flex items-center gap-2">
                        <Link href={`/list/teacher/${item.id}`}>
                            {/* <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                                <Image src="/view.png" alt="" width={16} height={16} />
                            </button> */}
                            <FormModal type="update" table="teacher" id={item.id} />
                        </Link>
                        {/* <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
                                <Image src="/delete.png" alt="" width={16} height={16} />
                        </button> */}
                        <FormModal type="delete" table="teacher" id={item.id}/>
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* Top */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
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
                        {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/plus.png" alt="" width={14} height={14} />
                        </button> */}
                        <FormModal type="create" table="teacher"/>
                    </div>
                </div>
            </div>     
            {/* List */}
            <Table columns={columns} renderRow={renderRow} data={teachersData}/>
            {/* Pagination */}
            <Pagination/>
        </div>
    )
}

export default TeacherListPage