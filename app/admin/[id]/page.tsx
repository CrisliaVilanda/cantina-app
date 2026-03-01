type CommanDetailPageParams = {
  params : Promise<{
    id: string;
  }>;
}

export default async function CommanDetailPage({ params,}: CommanDetailPageParams) {
  const { id } = await params;

  return <h2>Detalhes do pedido {id}</h2>;
}