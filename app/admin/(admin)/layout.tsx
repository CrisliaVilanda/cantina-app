import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

export default function ClientLayout({
   children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

     <Sidebar />
     <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-6">
       
            {children}
          </main>
          <Footer />
     </div>
    </div>


    // <div>
    // <div className="flex flex-col min-h-screen">
    //       <Header />
    //       <main className="flex-1 p-6">
       
    //         {children}
    //       </main>
    //     </div>
    //     <Footer />
    //     </div>
  )
}

