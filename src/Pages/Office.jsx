import AppLayout from "../layout/AppLayout";

import { useEffect, useState, useCollback } from "react";
import { getOffice, storeOffice, updateOffice, deleteOffice } from "../services/officeService";
import OfficeTable from "../components/OfficeTable";
import OfficeModal from "../components/OfficeModal";
import ImportExcel from "../components/ImportExcel";
import { exportExcel, exportPDF } from "../utils/export";


export default function Office() {
    const [ data, setData ] = useState([])
    const [ open, setOpen ] = useState(false);
    const [ edit, setEdit ] = useState(null);

    const load = useCollback(async() => {
        try {
            const res = await getOffice();
            setData(res.data?.data || res.data || []);
        } catch (err) {
            console.error("Api Error:", err);
            setData([]);
        }
    }, []);

    const [ page, setPage ] = useState(1);
    const [ meta, setMeta ] = useState({});
    useEffect(() => {
        const load = async () => {
            try {
                const res = await getOffice(page);
                setData(res.data.data);
                setMeta(res.data);
            } catch (err) {
                console.error(err);
            }
        }
        load();
    }), [page];

    const save = async(form)=> {
        console.log("Saving Data:", form);
        console.log("Edit Data:", edit);
        try {
            if(edit) {
                console.log("Update ID:", edit.officeCode)
                await updateOffice(edit.officeCode, form);
            } else {
                await storeOffice(form);
            }
            setOpen(false);
            setEdit(null);
            load();
        } catch (err) {
            console.error("Save Error: ", err);
        }
    };
    
    const remove = async(id) => {
        if(!confirm("Apakah kamu yakin ingin delete ini?")) {
            await deleteOffice(id);
            load();
        }
    };

    return(
        <AppLayout>
            <main className="p-6 w-full space-y-6">
                <h1 className="text-2xl font-bold">Office Management</h1>

                <div className="flex flex-wrap gap-4">
                    <button onClick={() => setOpen(true)} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
                    <button onClick={() => exportExcel(data)} className="bg-green-600 text-white px-3 py-1 rounded">Export Excel</button>
                    <button onClick={() => exportPDF(data)} className="bg-yellow-600 text-white px-3 py-1 rounded">Export PDF</button>
                    <ImportExcel onImport={d => console.log(d)} />
                </div>

                <OfficeTable data={data}
                onEdit={(row) => { setEdit(row); setOpen(true); }}
                onDelete={remove}
                onView={(row) => alert(JSON.stringify(row, null, 2))}
                onExport={(rows) => exportExcel(rows)} />

                <OfficeModal open={open}
                onClose={() => setOpen(false)}
                onSave={save}
                defaultValues={edit} />

                <div className="flex gap-2 mt-4">
                    <button disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-gray-200 rounded">
                        Prev
                    </button>

                    <span> Page {meta.currrent_page} of {meta.last_page} </span>

                    <button disabled={page === meta.last_page}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-gray-200 rounded">
                        Next
                    </button>
                </div>
            </main>
        </AppLayout>
    );
}