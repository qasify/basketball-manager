import NavigationBar from "@/components/NavigationBar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Basketball Manager",
  description: "Manage your basketball teams and players",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en" className="overflow-clip">
      <body className={`${inter.className} overflow-clip`}>
        <div className="min-h-screen bg-orange-50 flex flex-col h-full">
          <NavigationBar/>
          <main className="container w-screen mx-auto px-4 py-8 flex overflow-hidden justify-center">{children}</main>
        </div>
      </body>
    </html>
  );
}
