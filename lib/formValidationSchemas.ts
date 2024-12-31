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
    ruc: z.string()
        .min(1,{message: "El RUC debe tener al menos un dígito"})
        .max(11, {message: "El RUC no puede tener más de 11 dígitos"})
        .regex(/^\d+$/, "El Ruc debe contener solo números"),
    razonSocial: z.string().min(1, {message: "Razón social es obligatorio!"}),
    usuario: z.string().min(1, {message: "Usuario es obligatorio!"}),
    clave: z.string().min(1, {message: "Clave es obligatorio!"}),
    email: z.string().email({message: "Email inválido!"}),
});

export type EmpresaSchema = z.infer<typeof empresaSchema>;