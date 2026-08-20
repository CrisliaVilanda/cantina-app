"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ItemCarrinho = {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
};

type ClientContextType = {
  nomeCliente: string;
  setNomeCliente: (nome: string) => void;

  carrinho: ItemCarrinho[];

  adicionarAoCarrinho: (item: ItemCarrinho) => void;
  alterarQuantidade: (id: string, quantidade: number) => void;
  removerDoCarrinho: (id: string) => void;
  limparCarrinho: () => void;

  totalCarrinho: number;

  sessaoCarregada: boolean;

  pedidoEmProcessamento: boolean;
  setPedidoEmProcessamento: (valor: boolean) => void;
};

const ClientContext = createContext<ClientContextType | undefined>(
  undefined
);

export function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nomeCliente, setNomeCliente] = useState("");
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  const [sessaoCarregada, setSessaoCarregada] = useState(false);

  const [pedidoEmProcessamento, setPedidoEmProcessamento] =
    useState(false);

  useEffect(() => {
    try {
      const nomeSalvo = localStorage.getItem("nomeCliente");

      if (nomeSalvo) {
        setNomeCliente(nomeSalvo);
      }

      const carrinhoSalvo = localStorage.getItem("carrinho");

      if (carrinhoSalvo) {
        try {
          const carrinhoConvertido = JSON.parse(carrinhoSalvo);

          if (Array.isArray(carrinhoConvertido)) {
            setCarrinho(carrinhoConvertido);
          }
        } catch {
          localStorage.removeItem("carrinho");
        }
      }
    } finally {
      setSessaoCarregada(true);
    }
  }, []);

  useEffect(() => {
    if (!sessaoCarregada) {
      return;
    }

    localStorage.setItem(
      "nomeCliente",
      nomeCliente
    );
  }, [nomeCliente, sessaoCarregada]);

  useEffect(() => {
    if (!sessaoCarregada) {
      return;
    }

    localStorage.setItem(
      "carrinho",
      JSON.stringify(carrinho)
    );
  }, [carrinho, sessaoCarregada]);

  function adicionarAoCarrinho(item: ItemCarrinho) {
    setCarrinho((atual) => {
      const existente = atual.find(
        (produto) => produto.id === item.id
      );

      if (existente) {
        return atual.map((produto) =>
          produto.id === item.id
            ? {
              ...produto,
              quantidade:
                produto.quantidade + item.quantidade,
            }
            : produto
        );
      }

      return [...atual, item];
    });
  }

  function alterarQuantidade(
    id: string,
    quantidade: number
  ) {
    if (quantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }

    setCarrinho((atual) =>
      atual.map((item) =>
        item.id === id
          ? {
            ...item,
            quantidade,
          }
          : item
      )
    );
  }

  function removerDoCarrinho(id: string) {
    setCarrinho((atual) =>
      atual.filter((item) => item.id !== id)
    );
  }

  function limparCarrinho() {
    setCarrinho([]);
    localStorage.removeItem("carrinho");
  }

  const totalCarrinho = useMemo(() => {
    return carrinho.reduce(
      (total, item) =>
        total + item.preco * item.quantidade,
      0
    );
  }, [carrinho]);

  return (
    <ClientContext.Provider
      value={{
        nomeCliente,
        setNomeCliente,

        carrinho,

        adicionarAoCarrinho,
        alterarQuantidade,
        removerDoCarrinho,
        limparCarrinho,

        totalCarrinho,

        sessaoCarregada,

        pedidoEmProcessamento,
        setPedidoEmProcessamento,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error(
      "useClient deve ser usado dentro de ClientProvider"
    );
  }

  return context;
}