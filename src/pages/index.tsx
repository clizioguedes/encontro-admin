import { GetStaticProps } from "next";
import { api } from "../services/api";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import styles from "./home.module.scss";
import { User } from "../entities/User";

type Props = {
  users: User[];
};

const handleContactWhatsapp = (userId: string, isContacted: boolean): void => {
  api.put(`user/${userId}`, {
    contacted: isContacted,
  });
};

const startWhatsapp = (phone: string) => {
  const url = `https://api.whatsapp.com/send?phone=${phone}`;
  return window.open(url);
};

export default function Home({ users }: Props) {
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
                      readOnly
                      type="checkbox"
                      checked={user.contacted}
                      onChange={(event) => {
                        handleContactWhatsapp(user.id, event.target.checked);
                      }}
                    />
                  </td>
                  <td>{user.createdAt}</td>
                  <td>
                    <button>Editar</button>
                    <button
                      onClick={() => {
                        startWhatsapp(String("+55" + user.phone));
                      }}
                    >
                      Whatsapp
                    </button>
                    {user.contacted ? <p>Sim</p> : <p>Não</p>}
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

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("users", {
    params: {
      _limit: 12,
      _sort: "created_at",
      _order: "desc",
    },
  });
  const users = data.map((user) => ({
    id: user.id,
    name: user.name,
    phone: user.phone,
    contacted: user.contacted,
    createdAt: format(parseISO(user.created_at), "d MMM yy hh:mm", {
      locale: ptBR,
    }),
    updatedAt: format(parseISO(user.updated_at), "d MMM yy hh:mm", {
      locale: ptBR,
    }),
  }));

  return {
    props: {
      users,
    },
    revalidate: 60 * 25,
  };
};
