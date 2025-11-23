import { Outlet } from "react-router-dom";

import Header from "../../shared/ui/Header/Header";
import Footer from "../../shared/ui/Footer/Footer";

import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
