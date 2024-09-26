import { Header } from "./header";
import { Sidebar } from "./sidebar";

interface MainLayoutProps {
  chilren: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-full">
      <Header />
      <div className="flex bg-[#BBC2C0] min-h-screen h-full pt-10">
        <Sidebar />
        <main className="w-full">
          { children }
        </main>
      </div>
    </div>
  );
}

export default MainLayout;