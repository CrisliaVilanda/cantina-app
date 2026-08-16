import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { ClientProvider } from "./context/ClientContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <div className="flex min-h-screen">
        <div className="flex flex-1 flex-col">
          <Header />

          <main className="flex-1 p-6">
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </ClientProvider>
  );
}