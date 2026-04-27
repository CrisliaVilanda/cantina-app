"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"

import { CurrencyInput } from "./CurrencyInput"
import { SelectForm } from "./SelectInput"
import { NumberInput } from "./NumberInput"
import { InputForm } from "./InputForm"


const formSchema = z.object({
  ProductName: z.string().min(3, "Descrição deve conter no mínimo 3 caracteres."),
  mensurement: z.string().min(1, "A unidade de medida pode ser até 2 digitos"),
  productPrice: z.string().min(1, "Informe o preço"),
  quantity: z.string().min(5, "A quantidade deve ser no mínimo até 3 digitos."),
})

type FormValues = z.infer<typeof formSchema>

export default function EstoqueForm() {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ProductName: "",
      mensurement: "",
      productPrice: "",
      quantity: "",
    },
  })

  function onSubmit(data: FormValues) {
    // Do something with the form values.
    console.log("OK", data)
  }

  return (
    <div className=" flex flex-col px-4 py-8 items-center-center">
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => { console.log("Erros do formulário:", errors) })}>
        <FieldSet>
          <FieldLegend>Informações do produto</FieldLegend>
          <FieldGroup>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 justify-between space-x-5 space-y-6">
              <div>
                <InputForm<FormValues>
                  name="ProductName"
                  control={form.control}
                  label="Produto"
                  placeholder="Ex: Coca-Cola"
                  description="Informe o nome do produto"
                />
              </div>
              <div>
                <CurrencyInput<FormValues>
                  name="productPrice"
                  control={form.control}
                  label="Preço"
                  placeholder="R$ 10,00"
                />
              </div>
              <div>
                <NumberInput<FormValues>
                  name="quantity"
                  control={form.control}
                  label="Quantidade"
                  placeholder="10"
                />
              </div>
              <div>
                <SelectForm<FormValues>
                  name="mensurement"
                  control={form.control}
                  label="Unidade"
                  placeholder="Selecione uma unidade"
                  options={[
                    { label: "Kg", value: "Kg" },
                    { label: "Gramas", value: "g" },
                    { label: "Litros", value: "l" },
                  ]}
                />
              </div>
            </div>
          </FieldGroup>
          <FieldGroup>
            <div>
              <Field orientation="horizontal">
                <Button type="submit">Registrar</Button>
                <Button asChild variant="outline" type="button">
                  <Link href="/admin/estoque/">Cancelar</Link>
                </Button>
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>

  );
}
