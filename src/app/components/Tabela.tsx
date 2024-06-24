"use client";
import Client from "../core/client";
import { iconeEdicao, iconeLixo } from "./Icons";

interface TabelaProps {
  cliente: Client[];
  clienteSelecionado?: (cliente: Client) => void;
  clienteExcluido?: (cliente: Client) => void;
}

export default function Tabela(props: TabelaProps) {
  console.log(props.cliente);
  const exibiAcoes = props.clienteExcluido || props.clienteSelecionado;
  function renderizarDados() {
    return props.cliente?.map((client, i) => {
      return (
        <tr
          key={client.id}
          className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}
        >
          <td className="text-left p-4">{client.id}</td>
          <td className="text-left p-4">{client.nome}</td>
          <td className="text-left p-4">{client.idade}</td>
          {exibiAcoes ? renderizarBotoes(client) : false}
        </tr>
      );
    });
  }
  function renderizarBotoes(cliente: Client) {
    return (
      <td className="flex justify-center">
        {props.clienteSelecionado ? (
          <button
            onClick={() => props.clienteSelecionado?.(cliente)}
            className="m-1 flex items-center justify-center rounded-full p-2 text-green-600 hover:bg-purple-50"
          >
            {iconeEdicao}
          </button>
        ) : (
          false
        )}
        {props.clienteExcluido ? (
          <button
            onClick={() => props.clienteExcluido?.(cliente)}
            className="m-1 flex items-center justify-center rounded-full p-2 text-red-500 hover:bg-purple-50"
          >
            {iconeLixo}
          </button>
        ) : (
          false
        )}
      </td>
    );
  }
  function renderizarCabecalho() {
    return (
      <table className="w-full rounded-xl overflow-hidden   ">
        <thead className="bg-gradient-to-r from-purple-500 to-purple-800 text-gray-100 ">
          <tr>
            <th className="text-left p-4">Código</th>
            <th className="text-left p-4">Nome</th>
            <th className="text-left p-4">Idade</th>
            {exibiAcoes ? <th className=" p-4">Ações</th> : false}
          </tr>
        </thead>
        <tbody>{renderizarDados()}</tbody>
      </table>
    );
  }
  return renderizarCabecalho();
}
