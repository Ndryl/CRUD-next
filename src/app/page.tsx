"use client";
import { useEffect, useState } from "react";
import Botao from "./components/Botao";
import Formulario from "./components/Formulario";
import Layout from "./components/Layout";
import Tabela from "./components/Tabela";
import Client from "./core/client";
import ClienteRepositorio from "./core/ClienteRepositorio";
import ColecaoCliente from "./firebase/db/colecaoCliente";
import { error } from "console";
import useClients from "./hook/useClients";

export default function Home() {
  const {
    clientExcluido,
    novoClient,
    salvarClient,
    clientSelecionado,
    visivel,
    client,
    clientes,
    setVisivel,
  } = useClients();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-700 text-white">
      <Layout titulo="Cadastro Simples">
        {visivel === "tabela" ? (
          <>
            <div className="flex justify-end mb-4">
              <Botao
                className="bg-gradient-to-r from-green-500 to-green-700"
                onClick={() => novoClient()}
              >
                Novo cliente
              </Botao>
            </div>
            <Tabela
              cliente={clientes}
              clienteSelecionado={clientSelecionado}
              clienteExcluido={clientExcluido}
            />
          </>
        ) : (
          <Formulario
            cliente={client}
            clientMudou={salvarClient}
            cancelado={() => setVisivel("tabela")}
          />
        )}
      </Layout>
    </div>
  );
}
