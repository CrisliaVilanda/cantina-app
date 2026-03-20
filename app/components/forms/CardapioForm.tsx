"use client"
import { Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"


const formSchema = z.object({
  itemName: z.string().min(3, "Descrição deve conter no mínimo 3 caracteres."),
  itemDescription: z.string().min(10, "Descrição deve conter no mínimo 10 caracteres."),
  itemPriceSele: z.string().min(1, "Informe o preço"),
})

type FormValues = z.infer<typeof formSchema>


export default function CardapioForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      itemDescription: "",
      itemPriceSele: "",
    },
  })

  function onSubmit(data: FormValues) {
    console.log("OK", data)
  }


  return (
    <div className=" flex flex-col px-4 py-8 items-center-center">
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => { console.log("Erros do formulário:", errors) })}>
        <FieldSet>
          <FieldLegend>Informações do item</FieldLegend>
          {/* nome, breve descrição da composição, categoria,disponível para venda, preço  */}
          <FieldGroup>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 justify-between space-x-5 space-y-6">
              <div>
            <Controller
            name="itemName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="itemName">Nome do item</FieldLabel>
                <Input {...field} id="itemName" placeholder="sanduiche, suco de acerola..." aria-invalid={fieldState.invalid} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>Informe o nome do item para a venda</FieldDescription>
              </Field>
            )}
            />
              </div>
            </div>
          </FieldGroup>
        </FieldSet>


      </form>
    </div>
  )


};
