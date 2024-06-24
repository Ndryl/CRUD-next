import ClienteRepositorio from "@/app/core/ClienteRepositorio";
import Client from "@/app/core/client";
import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";
export default class ColecaoCliente implements ClienteRepositorio {
  private conversor = {
    toFirestore(cliente: Client) {
      return {
        nome: cliente.nome,
        idade: cliente.idade,
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Client {
      const dados = snapshot.data(options);
      return new Client(dados.nome, dados.idade, snapshot.id);
    },
  };

  async salvar(cliente: Client): Promise<any> {
    try {
      if (cliente?.id) {
        await updateDoc(
          doc(db, "clientes", cliente.id).withConverter(this.conversor),
          { nome: cliente.nome, idade: cliente.idade }
        );
        //console.log

        return cliente;
      } else {
        const docRef = await addDoc(collection(db, "clientes"), {
          nome: cliente.nome,
          idade: cliente.idade,
        });
        const doc = await getDoc(docRef);
        const data = doc.data();
        return new Client(data?.nome, data?.idade, data?.id);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async excluir(cliente: Client): Promise<any> {
    await deleteDoc(
      doc(db, "clientes", cliente.id).withConverter(this.conversor)
    );
  }
  async obterTodos(): Promise<Client[]> {
    const querySnapshot = await getDocs(this.colecao());
    const clientes: Client[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      clientes.push(new Client(data.nome, data.idade, doc.id));
    });
    return clientes;
  }
  private colecao() {
    return collection(db, "clientes").withConverter(this.conversor);
  }
}
