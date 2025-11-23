import { Outlet } from "react-router-dom";

import Header from "../../shared/ui/Header/Header";
import Footer from "../../shared/ui/Footer/Footer";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
