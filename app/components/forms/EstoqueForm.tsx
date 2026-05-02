"use client";

import {
  FieldGroup,
  FieldLegend,
  FieldSet,
  Field,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { criarItemEstoque } from "@/app/actions/estoque.actions";

//  COMPONENTES PADRÃO
import { InputForm } from "./InputForm";
import { CurrencyInput } from "./CurrencyInput";
import { NumberInput } from "./NumberInput";
import { SelectForm } from "./SelectInput";

const formSchema = z.object({
  ProductName: z.string().min(3),
  mensurement: z.string().min(1),
  productPrice: z.string().min(1),
  quantity: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

export default function EstoqueForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ProductName: "",
      mensurement: "",
      productPrice: "",
      quantity: "",
    },
  });

  async function onSubmit(data: FormValues) {
    await criarItemEstoque(data);
  }

  return (
    <div className="flex flex-col px-4 py-8 items-center-center">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldSet>
          <FieldLegend>Informações do produto</FieldLegend>

          <FieldGroup>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 space-x-5 space-y-6">
              <InputForm<FormValues>
                name="ProductName"
                control={form.control}
                label="Produto"
                placeholder="Ex: Coca-Cola"
              />

              <CurrencyInput<FormValues>
                name="productPrice"
                control={form.control}
                label="Preço"
              />

              <NumberInput<FormValues>
                name="quantity"
                control={form.control}
                label="Quantidade"
              />

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
          </FieldGroup>

          <FieldGroup>
            <Field orientation="horizontal">
              <Button type="submit">Registrar</Button>

              <Button asChild variant="outline" type="button">
                <Link href="/admin/estoque/">Cancelar</Link>
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}