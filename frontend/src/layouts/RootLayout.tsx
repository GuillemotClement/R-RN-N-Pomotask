import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-1'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
