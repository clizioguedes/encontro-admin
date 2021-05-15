import { api } from "../services/api";
import styles from "./home.module.scss";
import { User } from "../entities/User";
import { useEffect, useState } from "react";

import { getAllUsers } from "../services/user";

import Metrics from "../components/Metrics";
import Table from "../components/Table";

export default function Home() {
  const [users, setUsers] = useState([] as User[]);

  const handleUsers = () => {
    getAllUsers().then((response) => {
      setUsers(response);
    });
  };

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <div className={styles.homepage}>
      <div>
        <Metrics users={users} />

        <Table users={users} handleUsers={handleUsers} />
      </div>
    </div>
  );
}
