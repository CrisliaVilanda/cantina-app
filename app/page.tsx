import { redirect } from "next/navigation";


export default function Home() {
  return (  
   redirect("/cliente/boas-vindas")
  );
}
