"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"


const formSchema = z.object({
  description: z
    .string()
    .min(20, "Descrição deve conter no mínimo 20 caracteres."),
    quantity: z
    .string()
    .min(3, "A quantidade deve ser no mínimo até 3 digitos."),
    mensurement: z
    .string()
    .min(2, "A unidade de medida pode ser até 2 digitos")
})

type FormValues = z.infer<typeof formSchema>

export default function EntradaForm() {
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        description: "",
        quantity: "",
        mensurement: "",
    },
  })

  function onSubmit (data: FormValues) {
    // Do something with the form values.
    console.log(data)
  }
 
  return (
  <div className=" flex flex-col px-4 py-8 items-center-center">
    <form action="">
          <FieldGroup>
          <FieldSet>
            <FieldLegend>Informações do alimento ou material</FieldLegend>
            <FieldGroup>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 justify-between space-x-5 space-y-6">
                <div>
                    <Field>
                    <FieldLabel htmlFor="nameDescription">
                      Nome descritivo
                    </FieldLabel>
                    <Input id="nameDescription" placeholder="Coca-cola" required />
                  </Field>
                </div>
                <div>
                  <Field>
                  <FieldLabel htmlFor="nameDescription">
                    Nome descritivo
                  </FieldLabel>
                  <Input id="nameDescription" placeholder="Coca-cola" required />
                </Field>
                </div>
                <div>
                  <Field>
                    <FieldLabel htmlFor="nameDescription">
                      Nome descritivo
                    </FieldLabel>
                    <Input id="nameDescription" placeholder="Coca-cola" required />
                  </Field>
                </div>
                <div>
                  <Field>
                    <FieldLabel htmlFor="nameDescription">
                      Nome descritivo
                    </FieldLabel>
                    <Input id="nameDescription" placeholder="Coca-cola" required />
                  </Field>
                </div>
            </div>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Registrar</Button>
            <Button variant="outline" type="button">Cancelar</Button>
          </Field>
        </FieldGroup>
        
      </form>
  </div>
    
  );
}
