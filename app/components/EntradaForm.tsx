"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NumericFormat } from "react-number-format"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"


const formSchema = z.object({
  ProductName: z.string().min(3, "Descrição deve conter no mínimo 3 caracteres."),
  mensurement: z.string().min(1, "A unidade de medida pode ser até 2 digitos"),
  productPrice: z.string().min(1, "Informe o preço")
  // quantity: z.string().min(5, "A quantidade deve ser no mínimo até 3 digitos."),
})

type FormValues = z.infer<typeof formSchema>

export default function EntradaForm() {



  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ProductName: "",
      mensurement: "",
      productPrice: "",
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
                <Controller
                  name="ProductName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="productName">Produto</FieldLabel>
                      <Input {...field} id="productName" placeholder="Coca Cola, Copos descartáveis" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      <FieldDescription>Informe o nome do produto adquirido</FieldDescription>
                    </Field>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="mensurement"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Unidade de medida</FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Selecione a unidade de medida " />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Unidade de medida</SelectLabel>
                            <SelectItem value="Kg">Quilograma</SelectItem>
                            <SelectItem value="g">Gramas</SelectItem>
                            <SelectItem value="l">Litros</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      <FieldDescription>Informe a unidade de medida deste produto</FieldDescription>
                    </Field>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="productPrice"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="productPrice">Preço de compra</FieldLabel>
                      <NumericFormat
                        value={field.value}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$"
                        decimalScale={2}
                        fixedDecimalScale
                        customInput={Input}
                        onValueChange={(values) => (
                          field.onChange(values.value)
                        )}
                        id="productPrice"
                        placeholder="R$ 10,00"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      {/* <Input {...field} id="productPrice" placeholder="R$ 10,00" /> */}

                      <FieldDescription>Informe o preço de compra deste produto</FieldDescription>
                    </Field>
                  )}
                />
              </div>
            </div>
          </FieldGroup>
          <FieldGroup>
            <div>
              <Field orientation="horizontal">
                <Button type="submit">Registrar</Button>
                <Button asChild variant="outline" type="button">
                  <Link href="/admin/entradas/">Cancelar</Link>
                </Button>
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>

  );
}
