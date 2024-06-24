import React from "react";

interface BotaoProps {
  cor?: "green" | "blue" | "gray";
  className?: string; // Corrigido para className com 'C' maiúsculo
  children: React.ReactNode; // Melhor prática para o tipo de children
  onClick?: () => void;
}

export default function Botao(props: BotaoProps) {
  const cor = props.cor ?? "gray"; // Define 'gray' como padrão se props.cor não estiver definido

  // Constrói a string de classes CSS usando template literals
  const buttonClasses = ` text-white px-4 py-2 rounded-md ${props.className}`;

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
