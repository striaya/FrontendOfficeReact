import { useState, useMemo } from "react";
//Import Simbol Image
import {
    Eye,
    Pencil,
    Trash,
    ArrowUpDown,
    FileDown
} from "lucide-react";

export default function officeTable({
    data=[],onEdit, onDelete, onView
})
{
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [sortKey, setSortKey] = useState("officeCode");
    const [sortDir, setSortDir] = useState("asc");

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
}