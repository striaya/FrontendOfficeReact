import { SidebarOpen } from "lucide-react";
import { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';

//Header
//Footer
//Sidebar
export default function AppLayout({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-grey-100">
            {/* Sidebar */}
            <SideBar sidebarOpen={SidebarOpen} setSidebarOpen={setSidebarOpen}/>
            {/* Main Content */}
            <div className="flex-1 flex-col">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                <main className="flex-1 p-4 md:p-6">{children}</main>
                <Footer/>
            </div>
        </div>
    );
}