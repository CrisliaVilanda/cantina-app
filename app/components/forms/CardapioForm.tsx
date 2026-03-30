"use client"
import { Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSet, } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NumericFormat } from "react-number-format"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"


const formSchema = z.object({
  itemName: z.string().min(3, "Descrição deve conter no mínimo 3 caracteres."),
  itemDescription: z.string().min(10, "Descrição deve conter no mínimo 10 caracteres."),
  itemPriceSele: z.string().min(1, "Informe o preço deste item."),
  itemAvailableMenu: z.string().min(1, "Informe a disponibilidade deste item."),
})

type FormValues = z.infer<typeof formSchema>


export default function CardapioForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      itemDescription: "",
      itemPriceSele: "",
      itemAvailableMenu: "",
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Café" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>tem</SelectLabel>
                            <SelectItem value="id1">Coca-cola</SelectItem>
                            <SelectItem value="id2">Empada</SelectItem>
                            <SelectItem value="id3">Água mineral</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      <FieldDescription>Selecione o item em estoque</FieldDescription>
                    </Field>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="itemName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="itemCategory">Categoria</FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Bebidas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categorias</SelectLabel>
                            <SelectItem value="id1">Bebidas</SelectItem>
                            <SelectItem value="id2">Lanches e salgadosa</SelectItem>
                            <SelectItem value="id3">Porções</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      <FieldDescription>Selecione a categoria deste item</FieldDescription>
                    </Field>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="itemPriceSele"
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
                        id="itemPriceSele"
                        placeholder="R$ 10,00"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      <FieldDescription>Informe o preço de venda deste item</FieldDescription>
                    </Field>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="itemAvailableMenu"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="itemAnableMenu">Disponível no cardápio?</FieldLabel>
                      <RadioGroup
                        className="flex flex-row gap-6"
                        value={field.value}
                        onValueChange={field.onChange}
                        aria-invalid={fieldState.invalid}>
                        <div>
                          <Field orientation="responsive">
                            <RadioGroupItem value="sim" id="itemEnableMenu" />
                            <FieldLabel htmlFor="itemEnableMenu">Sim</FieldLabel>
                          </Field>
                        </div>
                        <div>
                          <Field orientation="responsive">
                            <RadioGroupItem value="nao" id="itemDisanableMenu" />
                            <FieldLabel htmlFor="itemDisanableMenu">Não</FieldLabel>
                          </Field>
                        </div>
                      </RadioGroup>
                    </Field>
                  )}
                />
              </div>
            </div>
            <div>
              <Controller
                name="itemDescription"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="itemDescription">Descrição deste item</FieldLabel>
                    <Textarea {...field} aria-invalid={fieldState.invalid} id="itemDescription" placeholder="Servido em copo de 200ml" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    <FieldDescription>Informe os ingredientes desse item ou  como ele é servido</FieldDescription>
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
          <FieldGroup>
            <div>
              <Field orientation="horizontal">
                <Button type="submit">Salvar</Button>
                <Button asChild variant="outline" type="button">
                  <Link href="/admin/cardapio/">Cancelar</Link>
                </Button>
              </Field>
            </div>
          </FieldGroup>

        </FieldSet>
      </form>
    </div>
  )


};
