import prisma from "@/lib/prisma";
import FormModal from "./FormModal";

export type FormContainerProps = {
  table:
    | "teacher"
    | "empresa"
    | "cliente";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string | bigint;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  if (type !== "delete") {
    switch (table) {
      case "empresa":
        const empresaClientes = await prisma.cliente.findMany({
          select: { id_cliente: true, nombre: true },
        });
        relatedData = { clientes: empresaClientes };
        break;
      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;