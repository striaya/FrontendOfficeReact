    import {Building, LayoutDashboard }
    from "lucide-react";
    import { NavLink } from "react-router-dom";

export default function SideBar() {
    return (
        <aside className="fixed md-static z-40 x-full w-64 bg-gray-800 text-white transform">
            <div className="p-4 text-xl font-bold border-b border-gray-400"> Menu</div>

            <nav className="p-4 space-y-2">
                <button className="w-full flex justify-between px-4 py-2 rounded hover:bg-gray-700">
                    Office
                </button>
                <button className="w-full flex justify-between px-4 py-2 rounded hover:bg-gray-700">
                    Product
                </button>
                <button className="w-full flex justify-between px-4 py-2 rounded hover:bg-gray-700">
                    Employes
                </button>
            </nav>
        </aside>
    );
}