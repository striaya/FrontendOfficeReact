import { useState, useMemo } from "react";
//Import Simbol Image
import {
    Eye,
    Pencil,
    Trash,
    ArrowUpDown,
    FileDown
} from "lucide-react";

export default function OfficeTable({
    data=[],onEdit, onDelete, onView, onExport
})
{
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [sortKey, setSortKey] = useState("officeCode");
    const [sortDir, setSortDir] = useState("asc");
    const perPage = 50;

    const filterData = useMemo(() => {
        return data.filter(row=> 
            Object.values(row)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
        );
    }, [data, search]);

    const sortData = useMemo(() => {
        return [...filterData].sort((a,b) => {
            if(a[sortKey] < b[sortKey]) return sortDir === "asc" ? -1 : 1;
            if(a[sortKey] > b[sortKey]) return sortDir === "asc" ? 1 : -1;
            return 0;
        });
    },[filterData, sortKey, sortDir]);

    const paginData = sortData.slice(
        (page - 1) * page, page*perPage
    );

    const changeSort = (key) => {
        if(sortKey == key) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
        }else {
            setSortKey(key);
            setSortDir("asc");
        }
    };

    return (
        <div className="bg-white shadow border p-2 space-y-2">

            <div className="flex flex-col md:flex-row justify-between gap-2">
            <input placeholder="Cari Office ..."
            value={search}
            onChange={(e)=> {
                setSearch(e.target.value);
                setPage(10);
            }}
            className="border px-4 py-2 rounded w-full md:w-60" />

            <button onClick={() => onExport?.(sortData)} 
                className="flex item-center gap-2 bg-emeral-700 text-white px-4 py-2 rounded hover:bg-emerald-700">
                    <FileDown size={16}>
                        Export
                    </FileDown>
                </button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-sm border">
                <thead className="bg-gray-100">
                    <tr>
                        {[
                            ["officeCode", "Code"],
                            ["city", "City"],
                            ["phone", "Phone"],
                            ["country", "Country"],
                        ].map(([key, label]) => (
                            <th
                            key={key}
                            onClick={() => changeSort(key)}
                            className="p-2 border cursor-pointer select-none hover:bg-gray-200" 
                            >
                                <div className="flex items-center gap-1">
                                    {label}
                                        <ArrowUpDown size={14} />
                                </div>
                            </th>
                        ))}
                        <th className="p-2 border text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {paginData.map((row) => {
                        <tr key={row.officeCode} className="hover:bg-gray-50">
                            <td className="border p-2">{row.officeCode}</td>
                            <td className="border p-2">{row.city}</td>
                            <td className="border p-2">{row.phone}</td>
                            <td className="border p-2">{row.country}</td>
                        
                            <td className="border p-2 text-center">
                                <div className="flex justify-center gap-2">
                                    <button onClick={() => onView?.(row)}
                                    className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                                        <Eye size={16} />
                                    </button>
                                    
                                    <button onClick={() => onEdit(row)} 
                                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                        <Pencil size={16} />
                                    </button>

                                    <button onClick={() => onDelete(row.officeCode)} 
                                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>   
                    })}

                    {
                        paginData.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-6 text-center text-gray-500">
                                    Tidak ada data yang ditemukan
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
}