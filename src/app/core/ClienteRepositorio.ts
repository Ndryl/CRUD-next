import Client from "./client";

export default interface ClienteRepositorio {
  salvar(cliente: Client): Promise<Client | null>;
  excluir(cliente: Client): Promise<void | null>;
  obterTodos(): Promise<Client[] | null>;
}
