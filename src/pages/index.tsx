import { useEffect, useState } from "react";

// Entities
import { User } from "../entities/User";

// Services
import { getAllUsers } from "../services/user";

// Components
import Metrics from "../components/Metrics";
import Table from "../components/Table";

// Styles
import styles from "./home.module.scss";

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
