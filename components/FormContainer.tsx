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
        const [empresaDeclaracionEmpresas, empresaDeclaracionCatalogo] = await prisma.$transaction([
          prisma.empresa.findMany({
            select: { id_empresa: true, razon_social: true, ruc: true },
          }),
          prisma.catalogo_declaracion.findMany({
            select: { id_formulario: true, descripcion: true },
          }),
        ]);
        const empresaDeclaracionCatlogoSanitized = empresaDeclaracionCatalogo.map((item) => {
          return {
            ...item,
            id_formulario: item.id_formulario ? item.id_formulario : null
          };
      });
        relatedData = { empresas: empresaDeclaracionEmpresas, catalogoDeclaraciones: empresaDeclaracionCatlogoSanitized };
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