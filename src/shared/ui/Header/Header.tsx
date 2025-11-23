import { useLocation } from "react-router-dom";

import styles from "./Header.module.css";

type HeaderProps = {
  itemTitle?: string;
};

function Header({ itemTitle }: HeaderProps) {
  const location = useLocation();

  let title = "Система управления объявлениями";

  if (location.pathname.startsWith("/list") || location.pathname === "/") {
    title = "Список объявлений";
  } else if (location.pathname.startsWith("/item/")) {
    title = itemTitle || "Карточка объявления";
  } else if (location.pathname.startsWith("/stats")) {
    title = "Статистика";
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}

export default Header;
