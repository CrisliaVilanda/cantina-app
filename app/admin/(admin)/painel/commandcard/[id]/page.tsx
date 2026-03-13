import CommandDetail from "@/app/components/commandDetail";

type CommanDetailPageParams = {
  params : Promise<{
    id: string;
    statusPayment: string[];
  }>;
}

export default async function CommanDetailPage({ params,}: CommanDetailPageParams) {
  const { id } = await params;
  
  return <CommandDetail id={id} />
}