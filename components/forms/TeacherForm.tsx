"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchemas";
import { Dispatch, SetStateAction } from "react";

const TeacherForm = ({
    type, 
    data,
    setOpen,
} : {
    type: "create" | "update";
    data?: any;
    setOpen:Dispatch<SetStateAction<boolean>>;

}) => {
    
    const { 
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm<TeacherSchema>({
        resolver: zodResolver(teacherSchema)
    });

    const onSubmit = handleSubmit(data => {
        console.log(data)
    })

    return(
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">Create a new teacher</h1>
            <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField 
                    type="text" 
                    name="username" 
                    label="Username"
                    defaultValue={data?.username}
                    register={register} 
                    error={errors.username} 
                />
                <InputField 
                    type="email" 
                    name="email" 
                    label="Email"
                    defaultValue={data?.email}
                    register={register} 
                    error={errors.email} 
                />
                <InputField 
                    type="password" 
                    name="password" 
                    label="Password"
                    defaultValue={data?.password}
                    register={register} 
                    error={errors.password} 
                />
            </div>
            <span className="text-xs text-gray-400 font-medium">
                Personal Information
            </span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField 
                    type="text" 
                    name="firstName" 
                    label="First Name"
                    defaultValue={data?.firstName}
                    register={register} 
                    error={errors.firstName} 
                />
                <InputField 
                    type="text" 
                    name="lastName" 
                    label="Last Name"
                    defaultValue={data?.lastName}
                    register={register} 
                    error={errors.lastName} 
                />
                <InputField 
                    type="text" 
                    name="phone" 
                    label="Phone"
                    defaultValue={data?.phone}
                    register={register} 
                    error={errors.phone} 
                />
                <InputField 
                    type="text" 
                    name="address" 
                    label="Address"
                    defaultValue={data?.address}
                    register={register} 
                    error={errors.address} 
                />
                <InputField 
                    type="text" 
                    name="bloodType" 
                    label="Blood Type"
                    defaultValue={data?.bloodType}
                    register={register} 
                    error={errors.bloodType} 
                />
                <InputField 
                    type="date" 
                    name="birthday" 
                    label="Birthday"
                    defaultValue={data?.birthday}
                    register={register} 
                    error={errors.birthday} 
                />
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Sex</label>
                    <select
                        defaultValue={data?.sex}
                        {...register("sex")}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {errors.sex?.message && (
                        <p className="text-xs text-red-400">
                            {errors.sex?.message.toString()}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
                    <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
                        <Image src="/upload.png" width={28} height={28} alt="" />
                        <span>Upload a photo</span>
                    </label>
                    <input id="img" type="file" {...register("img")} className="hidden"/>
                    {errors.img?.message && (
                        <p className="text-xs text-red-400">
                            {errors.img?.message.toString()}
                        </p>
                    )}
                </div>
            </div>

            <button className="bg-blue-400 text-white p-2 rounded-md">
                {type === "create" ? "Create": "Update"}
            </button>
        </form>
    )
}

export default TeacherForm;