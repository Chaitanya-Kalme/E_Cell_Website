import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";



export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}