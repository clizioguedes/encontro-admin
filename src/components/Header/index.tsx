import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

// Styles
import styles from "./styles.module.scss";

export function Header() {
  const currentDate = format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  });
  return (
    <header className={styles.headerContainer}>
      <img src="/images/logo.png" alt="" />
      <p>Administração</p>
      <span>{currentDate}</span>
    </header>
  );
}
