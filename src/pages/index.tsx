import { api } from "../services/api";
import styles from "./home.module.scss";
import { User } from "../entities/User";
import { useEffect, useState } from "react";

import { getUsers } from "../services/user";

export default function Home() {
  const [users, setUsers] = useState([] as User[]);

  const handleContactWhatsapp = (
    userId: string,
    isContacted: boolean
  ): void => {
    api
      .put(`user/${userId}`, {
        contacted: isContacted,
      })
      .then(handleUsers)
      .catch((err) => console.log("Erro ao atualizar usuário", err));
  };

  const handleUsers = () => {
    getUsers().then((response) => {
      setUsers(response);
    });
  };

  const startWhatsapp = (phone: string) => {
    const url = `https://api.whatsapp.com/send?phone=${phone}`;
    return window.open(url);
  };

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <div className={styles.homepage}>
      <section className={styles.latestMetrics}>
        <h2>Métricas</h2>
        <ul>
          <li>
            <p className={styles.descriptionMetrics}> Clientes Cadastrados:</p>
            <p className={styles.infoMetrics}> {users.length} </p>
          </li>
          <li>
            <p className={styles.descriptionMetrics}>
              {" "}
              Clientes para entrar em contato:
            </p>
            <p className={styles.infoMetrics}> {users.length} </p>
          </li>
        </ul>
      </section>

      <section className={styles.allUsers}>
        <h2>Usuários Cadastrados</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Whatsapp</th>
              <th>Contatado</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={user.contacted}
                      onChange={(event) => {
                        handleContactWhatsapp(user.id, event.target.checked);
                      }}
                    />
                  </td>
                  <td>{user.createdAt}</td>
                  <td>
                    <button
                      onClick={() => {
                        startWhatsapp(String("+55" + user.phone));
                      }}
                    >
                      <img
                        src="/images/whatsapp.png"
                        alt="Botão para contato no Whatsapp"
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
