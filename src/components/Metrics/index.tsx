import React from "react";
import { User } from "../../entities/User";

import ReactHTMLTableToExcel from "react-html-table-to-excel";

import styles from "./styles.module.scss";

type Props = {
  users: User[];
};

const Metrics: React.FC<Props> = ({ users }) => {
  return (
    <section className={styles.latestMetrics}>
      <h2>Métricas</h2>
      <ul>
        <li>
          <p className={styles.descriptionMetrics}> Clientes Cadastrados:</p>
          <p className={styles.infoMetrics}> {users.length} </p>
        </li>
        <li>
          <p className={styles.descriptionMetrics}>
            Clientes para entrar em contato:
          </p>
          <p className={styles.infoMetrics}>
            {users.filter((user) => !user.contacted).length}
          </p>
        </li>
        <li>
          <p className={styles.descriptionMetrics}>Exportar dados:</p>
          <button>
            <ReactHTMLTableToExcel
              table="users"
              filename="Encontro_Clientes"
              sheet="Encontro_Clientes"
              buttonText={
                <img src="/images/xlsx.png" alt="Exportar dados em Excel" />
              }
            ></ReactHTMLTableToExcel>
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Metrics;
