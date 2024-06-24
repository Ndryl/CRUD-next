import { useState } from "react";
import Entrada from "./Entrada";
import Client from "../core/client";
import Botao from "./Botao";

interface FormularioProps {
  cliente: Client;
  cancelado?: () => void;
  clientMudou?: (client: Client) => void;
}

export default function Formulario(props: FormularioProps) {
  const handleCancelar = () => {
    props.cancelado?.();
  };
  const id = props.cliente?.id;
  const [nome, setNome] = useState(props.cliente?.nome ?? "");
  const [idade, setIdade] = useState(props.cliente?.idade ?? 0);
  return (
    <div>
      {id ? (
        <Entrada somenteLeitura texto="Código" valor={id} className="mb-5" />
      ) : (
        false
      )}
      <Entrada
        texto="Nome"
        valor={nome}
        valorMudou={setNome}
        className="mb-5"
      />
      <Entrada
        texto="Idade"
        tipo="number"
        valor={idade}
        valorMudou={setIdade}
      />
      <div className="mt-3 flex justify-end">
        <Botao
          className="bg-gradient-to-r from-blue-400 to-blue-700 mr-2"
          onClick={() => {
            props.clientMudou?.(new Client(nome, +idade, id));
          }}
        >
          {id ? "Alterar" : "Salvar"}
        </Botao>
        <Botao
          className="bg-gradient-to-r from-gray-400 to-gray-700"
          onClick={handleCancelar}
        >
          cancelar
        </Botao>
      </div>
    </div>
  );
}
