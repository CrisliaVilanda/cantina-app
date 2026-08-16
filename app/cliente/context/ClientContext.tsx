"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
};

type ClientContextType = {
  nomeCliente: string;
  carrinho: CartItem[];
  quantidadeItensCarrinho: number;
  totalCarrinho: number;
  adicionarAoCarrinho: (item: CartItem) => void;
  removerDoCarrinho: (id: string) => void;
  alterarQuantidade: (id: string, quantidade: number) => void;
  limparCarrinho: () => void;
};

const ClientContext = createContext<ClientContextType | undefined>(
  undefined
);

const STORAGE_CLIENTE = "clienteNome";
const STORAGE_CARRINHO = "clienteCarrinho";

export function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nomeCliente, setNomeCliente] = useState("");
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);

  useEffect(() => {
    const nomeSalvo = sessionStorage.getItem(STORAGE_CLIENTE);

    if (nomeSalvo) {
      setNomeCliente(nomeSalvo);
    }

    const carrinhoSalvo = sessionStorage.getItem(STORAGE_CARRINHO);

    if (carrinhoSalvo) {
      try {
        const carrinhoConvertido: CartItem[] =
          JSON.parse(carrinhoSalvo);

        setCarrinho(carrinhoConvertido);
      } catch {
        sessionStorage.removeItem(STORAGE_CARRINHO);
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_CARRINHO,
      JSON.stringify(carrinho)
    );
  }, [carrinho]);

  function adicionarAoCarrinho(item: CartItem) {
    setCarrinho((carrinhoAtual) => {
      const itemExistente = carrinhoAtual.find(
        (produto) => produto.id === item.id
      );

      if (itemExistente) {
        return carrinhoAtual.map((produto) =>
          produto.id === item.id
            ? {
              ...produto,
              quantidade:
                produto.quantidade + item.quantidade,
            }
            : produto
        );
      }

      return [...carrinhoAtual, item];
    });
  }

  function removerDoCarrinho(id: string) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.filter((item) => item.id !== id)
    );
  }

  function alterarQuantidade(
    id: string,
    quantidade: number
  ) {
    if (quantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }

    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.map((item) =>
        item.id === id
          ? {
            ...item,
            quantidade,
          }
          : item
      )
    );
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  const quantidadeItensCarrinho = useMemo(
    () =>
      carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
      ),
    [carrinho]
  );

  const totalCarrinho = useMemo(
    () =>
      carrinho.reduce(
        (total, item) =>
          total + item.preco * item.quantidade,
        0
      ),
    [carrinho]
  );

  return (
    <ClientContext.Provider
      value={{
        nomeCliente,
        carrinho,
        quantidadeItensCarrinho,
        totalCarrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
        limparCarrinho,
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
      "useClient deve ser utilizado dentro de ClientProvider"
    );
  }

  return context;
}