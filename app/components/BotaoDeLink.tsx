import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

type BotaoDeAcaoProps = {
  textoBotao: string;
  linkBotao: string;
};


export default function BotaoDeLink({ textoBotao, linkBotao }: BotaoDeAcaoProps) {
  return (
    <div>
      <Button asChild>
        <Link href={linkBotao}>
          <PlusCircle className="mr-2 h-5 w-5" />{textoBotao}
        </Link>
      </Button>
    </div>
  )
};
