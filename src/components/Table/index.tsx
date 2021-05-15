// Entities
import { User } from "../../entities/User";

// Services
import { updateContactWhatsapp } from "../../services/user";

// Styles
import styles from "./styles.module.scss";

type Props = {
  users: User[];
  handleUsers: Function;
};

const Table: React.FC<Props> = ({ users, handleUsers }) => {
  const startWhatsapp = (phone: string) => {
    const url = `https://api.whatsapp.com/send?phone=${phone}`;
    return window.open(url);
  };

  const handleContactWhatsapp = (
    userId: string,
    isContacted: boolean
  ): void => {
    updateContactWhatsapp(userId, isContacted)
      .then(handleUsers())
      .catch((err) => console.log("Erro ao atualizar usuário", err));
  };

  return (
    <section className={styles.allUsers}>
      <h2>Usuários Cadastrados</h2>

      <table cellSpacing={0} id="users">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Whatsapp</th>
            <th>Contatado</th>
            <th>Origem</th>
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
                    alt="Verifica se a encontro já entrou em contato com o cliente cadastrado"
                  />
                </td>
                <td>{user.site ? "Site" : "Cadastro"}</td>
                <td>{user.createdAt}</td>
                <td>
                  <button
                    onClick={() => {
                      startWhatsapp(String("+55" + user.phone));
                    }}
                  >
                    <img
                      src="/images/whatsapp.png"
                      alt="Entrar em contato pelo Whatsapp"
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
