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

import { useEffect, useState } from "react";
import { criarItemCardapio } from "@/app/actions/cardapio.actions";

// COMPONENTES PADRÃO
import { CurrencyInput } from "./CurrencyInput";
import { NumberInput } from "./NumberInput";
import { SelectForm } from "./SelectInput";
import { TextareaForm } from "./TextareaForm";

const formSchema = z.object({
  estoqueId: z.string().min(1, "Selecione um produto"),
  categoria: z.string().min(1, "Selecione a categoria"),
  itemDescription: z.string().min(10, "Descrição mínima de 10 caracteres"),
  precoVenda: z.string().min(1, "Informe o preço"),
  quantidadeVenda: z
    .string()
    .refine((val) => Number(val) > 0, "Quantidade deve ser maior que 0"),
  ativo: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

type EstoqueItem = {
  id: string;
  nome: string;
  restante: number;
};

export default function CardapioForm() {
  const [estoque, setEstoque] = useState<EstoqueItem[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      estoqueId: "",
      categoria: "",
      itemDescription: "",
      precoVenda: "",
      quantidadeVenda: "",
      ativo: "sim",
    },
  });

  useEffect(() => {
    async function carregarEstoque() {
      try {
        const res = await fetch("/api/estoque-disponivel");
        const data: EstoqueItem[] = await res.json();
        setEstoque(data);
      } catch {
        setEstoque([]);
      }
    }

    carregarEstoque();
  }, []);

  async function onSubmit(data: FormValues) {
    await criarItemCardapio(data);
  }

  return (
    <div className="flex flex-col px-4 py-8">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldLegend>Informações do item</FieldLegend>

          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

              {/* PRODUTO (ESTOQUE) */}
              <SelectForm<FormValues>
                name="estoqueId"
                control={form.control}
                label="Produto (Estoque)"
                placeholder="Selecione um produto"
                options={estoque.map((item) => ({
                  label: `${item.nome} (${item.restante})`,
                  value: item.id,
                }))}
              />

              {/* CATEGORIA */}
              <SelectForm<FormValues>
                name="categoria"
                control={form.control}
                label="Categoria"
                placeholder="Selecione uma categoria"
                options={[
                  { label: "Bebidas", value: "bebida" },
                  { label: "Lanches", value: "lanche" },
                  { label: "Porções", value: "porcao" },
                ]}
              />

              {/* PREÇO */}
              <CurrencyInput<FormValues>
                name="precoVenda"
                control={form.control}
                label="Preço de venda"
              />

              {/* QUANTIDADE */}
              <NumberInput<FormValues>
                name="quantidadeVenda"
                control={form.control}
                label="Quantidade disponível"
              />
              {/* ATIVO */}
              <Field>
                <label className="font-medium ">Disponível?</label>
                <SelectForm<FormValues>
                  name="ativo"
                  control={form.control}
                  label="ativo"
                  options={[
                    { label: "sim", value: "sim" },
                    { label: "não", value: "não" },
                  ]}
                />
              </Field>
            </div>
            <div>
              {/* DESCRIÇÃO */}
              <TextareaForm<FormValues>
                name="itemDescription"
                control={form.control}
                label="Descrição"
                placeholder="Ex: Servido em copo de 200ml"
              />
            </div>
          </FieldGroup>

          <FieldGroup>
            <Field orientation="horizontal">
              <Button type="submit">Salvar</Button>

              <Button asChild variant="outline">
                <Link href="/admin/cardapio">Cancelar</Link>
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}