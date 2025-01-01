import prisma from "@/lib/prisma";
import FormModal from "./FormModal";

export type FormContainerProps = {
  table:
    | "teacher"
    | "empresa"
    | "cliente"
    | "empresa_declaracion";
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
      case "empresa_declaracion":
        const empresasSinDeclaracion = await prisma.empresa.findMany({
          where: {
            empresa_declaracion: {
              none: {},
            },
          },
          select: {
            id_empresa: true,
            razon_social: true,
            ruc: true,
          },
        });
        const empresaDeclaracionEmpresas= await prisma.empresa.findMany({
          select: { id_empresa: true, razon_social: true, ruc: true },
        });
        const empresas = type === "create" ? empresasSinDeclaracion : empresaDeclaracionEmpresas;
        relatedData = { empresas: empresas };
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