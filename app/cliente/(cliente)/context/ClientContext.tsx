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

  definirNomeCliente: (nome: string) => void;

  carrinho: ItemCarrinho[];

  adicionarAoCarrinho: (item: {
    id: string;
    nome: string;
    preco: number;
  }) => void;

  alterarQuantidade: (
    id: string,
    quantidade: number
  ) => void;

  removerDoCarrinho: (id: string) => void;

  limparCarrinho: () => void;

  totalCarrinho: number;
};

const ClientContext = createContext<
  ClientContextType | undefined
>(undefined);

const NOME_STORAGE = "cliente_nome";
const CARRINHO_STORAGE = "cliente_carrinho";

export function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nomeCliente, setNomeCliente] =
    useState<string>("");

  const [carrinho, setCarrinho] =
    useState<ItemCarrinho[]>([]);

  // Recupera os dados armazenados na sessão
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const nomeSalvo =
      window.sessionStorage.getItem(NOME_STORAGE);

    const carrinhoSalvo =
      window.sessionStorage.getItem(
        CARRINHO_STORAGE
      );

    if (nomeSalvo !== null) {
      setNomeCliente(nomeSalvo);
    }

    if (carrinhoSalvo !== null) {
      try {
        const dados: unknown =
          JSON.parse(carrinhoSalvo);

        if (Array.isArray(dados)) {
          setCarrinho(
            dados as ItemCarrinho[]
          );
        }
      } catch {
        window.sessionStorage.removeItem(
          CARRINHO_STORAGE
        );
      }
    }
  }, []);

  // Salva o nome na sessão
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (nomeCliente.trim()) {
      window.sessionStorage.setItem(
        NOME_STORAGE,
        nomeCliente
      );
    }
  }, [nomeCliente]);

  // Salva o carrinho na sessão
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(
      CARRINHO_STORAGE,
      JSON.stringify(carrinho)
    );
  }, [carrinho]);

  function definirNomeCliente(nome: string) {
    const nomeLimpo = nome.trim();

    setNomeCliente(nomeLimpo);

    if (
      typeof window !== "undefined"
    ) {
      if (nomeLimpo) {
        window.sessionStorage.setItem(
          NOME_STORAGE,
          nomeLimpo
        );
      } else {
        window.sessionStorage.removeItem(
          NOME_STORAGE
        );
      }
    }
  }

  function adicionarAoCarrinho(item: {
    id: string;
    nome: string;
    preco: number;
  }) {
    setCarrinho((atual) => {
      const existente = atual.find(
        (produto) =>
          produto.id === item.id
      );

      if (existente) {
        return atual.map((produto) =>
          produto.id === item.id
            ? {
              ...produto,
              quantidade:
                produto.quantidade + 1,
            }
            : produto
        );
      }

      return [
        ...atual,
        {
          id: item.id,
          nome: item.nome,
          preco: item.preco,
          quantidade: 1,
        },
      ];
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
      atual.filter(
        (item) => item.id !== id
      )
    );
  }

  function limparCarrinho() {
    setCarrinho([]);

    if (
      typeof window !== "undefined"
    ) {
      window.sessionStorage.removeItem(
        CARRINHO_STORAGE
      );
    }
  }

  const totalCarrinho = useMemo(() => {
    return carrinho.reduce(
      (total, item) =>
        total +
        item.preco * item.quantidade,
      0
    );
  }, [carrinho]);

  const value: ClientContextType = {
    nomeCliente,
    definirNomeCliente,
    carrinho,
    adicionarAoCarrinho,
    alterarQuantidade,
    removerDoCarrinho,
    limparCarrinho,
    totalCarrinho,
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context =
    useContext(ClientContext);

  if (!context) {
    throw new Error(
      "useClient deve ser utilizado dentro de ClientProvider"
    );
  }

  return context;
}