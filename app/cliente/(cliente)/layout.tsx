import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function ClientLayout({
   children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
         <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-6">
            {children}
          </main>
           <Footer />
          </div>
        </div>
  )
}


    //       <Header />  
    //       <div className="flex min-h-screen">  
    //         <Sidebar />     
    //         <main className="flex-1 p-6">
    //           {children}
    //         </main>            
    //       </div>
    //         <Footer />
    //   </body>       
    // </html>