import Client from "../core/client";
import ClienteRepositorio from "../core/ClienteRepositorio";
import ColecaoCliente from "../firebase/db/colecaoCliente";
import { error } from "console";
import { useEffect, useState } from "react";
export default function useClients() {
  const repo: ClienteRepositorio = new ColecaoCliente();
  const [client, setClient] = useState<any>();
  const [clientes, setClientes] = useState<Client[]>([]);
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");

  useEffect(() => {
    obterTodos(); // Corrigido para invocar a função obterTodos()
  }, []);
  function obterTodos() {
    repo
      .obterTodos()
      .then((clientes) => {
        if (!clientes) {
          throw new Error("Erro ao buscar clientes");
        }
        setClientes(clientes);
        setVisivel("tabela");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function clientSelecionado(client: Client) {
    setClient(client);
    setVisivel("form");
  }
  async function clientExcluido(client: Client) {
    await repo.excluir(client);
    obterTodos();
  }
  function novoClient() {
    setClient("");
    setVisivel("form");
  }
  async function salvarClient(client: Client) {
    await repo.salvar(client);
    obterTodos();
  }
  return {
    novoClient,
    salvarClient,
    clientExcluido,
    clientSelecionado,
    obterTodos,
    visivel,
    clientes,
    client,
    setVisivel,
  };
}
