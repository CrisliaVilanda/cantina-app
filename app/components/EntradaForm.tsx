import { useState } from "react";
import { Field } from "@/components/ui/field"
import { Form, useForm } from "react-hook-form"

type FormData = {
  description: "",
  quantity: "",
  mensurement: "",
};


export default function EntradaForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form className="space-y-8" action="">
      <Field>
        Controler
      </Field>
    </form>
  );
}
