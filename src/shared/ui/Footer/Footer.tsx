import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Тестовый проект выполнил: Ткачук Артём (github:{" "}
        <a
          className={styles.link}
          href="https://github.com/artishokq/avito-manager-system/tree/main"
          target="_blank"
          rel="noreferrer"
        >
          @artishokq
        </a>
        )
      </p>
    </footer>
  );
}

export default Footer;
