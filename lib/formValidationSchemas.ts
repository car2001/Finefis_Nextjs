import {z} from "zod"

export const teacherSchema = z.object({
    username: z
        .string()
        .min(3, {message: 'Username must be at least 3 characters long!'})
        .max(20, {message: "Username must be at most 20 characters long!"}),
    email: z.string().email({message: "Invalid email address!"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long!"}),
    firstName: z.string().min(1, {message: "First name is required!"}),
    lastName: z.string().min(1, {message: "Last name is required!"}),
    phone: z.string().min(1, {message: "Phone number is required!"}),
    address: z.string().min(1, {message: "Address is required!"}),
    bloodType: z.string().min(1, {message: "Blood Type is required!"}),
    birthday: z.date({message: "Birthday is required!"}),
    sex: z.enum(["male","female"], {message: "Sex is required"}),
    img: z.instanceof(File, {message: "Image is required"})
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const empresaSchema = z.object({
    id_empresa:z.string().optional(),
    ruc: z.string()
        .min(1,{message: "El RUC debe tener al menos un dígito"})
        .max(11, {message: "El RUC no puede tener más de 11 dígitos"})
        .regex(/^\d+$/, "El Ruc debe contener solo números"),
    razon_social: z.string().min(1, {message: "Razón social es obligatorio!"}),
    usuario: z.string().min(1, {message: "Usuario es obligatorio!"}),
    clave: z.string().min(1, {message: "Clave es obligatorio!"}),
    email: z.string().email({message: "Email inválido!"}),
    id_cliente: z.string().min(1, {message: "Cliente es obligatorio"}),
    inactivo: z.boolean().optional(),
});

export type EmpresaSchema = z.infer<typeof empresaSchema>;

export const clienteSchema = z.object({
    id_cliente:z.coerce.number().optional(),
    nombre: z.string().min(1, {message: "Nombre es obligatorio!"}),
    // dni: z.string().min(1, {message: "DNI es obligatorio!"}),
    email: z.string().email({message: "Email inválido!"}),
    num_cel: z.string()
        .min(9, {message: "Nro Celular es obligatorio"})
        .max(12, {message: "Nro Celular debe tener máximo 12 dígitos!"}),
    ind_actividad: z.boolean().optional(),
});

export type ClienteSchema = z.infer<typeof clienteSchema>;

export const empresaDeclaracionSchema = z.object({
    id_declaracion_emp:z.string().optional(),
    id_empresa: z.string().min(1, {message: "Empresa es obligatorio!"}),
    per_ini_declaracion: z.string()
        .min(4, {message: "Periodo Inicial es obligatorio!"})
        .max(4, {message: "Periodo Inicial debe tener max 4 dígitos!"})
        .regex(/^\d+$/, "Periodo Inicial debe contener solo números"),
    per_fin_declaracion: z.string()
        .min(4, {message: "Periodo Final es obligatorio!"})
        .max(4, {message: "Periodo Final debe tener max 4 dígitos!"})
        .regex(/^\d+$/, "Periodo Final debe contener solo números"),
    d_a_venci: z.string()
        .min(1, {message: "Dias Antes de Vencimiento 1 es obligatorio!"})
        .regex(/^\d+$/, "Dias Antes de Vencimiento 1 debe contener solo números"),
    d_a_venci_2: z.string()
        .min(1, {message: "Dias Antes de Vencimiento 2 es obligatorio!"})
        .regex(/^\d+$/, "Dias Antes de Vencimiento 2 debe contener solo números"),
    d_d_venci: z.string()
        .min(1, {message: "Dias Despúes de Vencimiento es obligatorio!"})
        .regex(/^\d+$/, "Dias Despúes de Vencimiento debe contener solo números"),
    d_a_v_alerta: z.string()
        .min(1, {message: "Dias de Notificación Despúes de Vencimiento obligatorio!"})
        .regex(/^\d+$/, "Dias de Notificación Despúes de Vencimiento debe contener solo números"),
    d_recur_d_venci: z.string()
        .min(1, {message: "Dias de Frecuencia Revision obligatorio!"})
        .regex(/^\d+$/, "Dias de Frecuencia Revision debe contener solo números"),
    ind_notif_apagado: z.boolean().optional(),
    id_formulario: z.string().min(1, {message: "El Nro. de Formulario es obligatorio"})
});

export type EmpresaDeclaracionSchema = z.infer<typeof empresaDeclaracionSchema>;