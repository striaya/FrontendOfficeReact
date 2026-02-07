import AppLayout from "../layout/AppLayout";

import { useEffect, useState, useCollback } from "react";
import { getOffice, storeOffice, updateOffice, deleteOffice } from "../services/officeService";

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
                await updateOffice(edit.officeCode, form);
            } else {
                await storeOffice(form);
            }
        } catch (err) {
            console.error("Save Error: ", err);
        }
    };
    
    const remove = async(id) => {
        if(!confirm("Apakah kamu yakin ingin delete ini?")) {
            await deleteOffice(id);
        }
    };

    return(
        <AppLayout>

        </AppLayout>
    );
}