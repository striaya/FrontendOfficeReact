import * as XLSX from "xlsx";

export default function ImportExcel({ onImport }) {
    const handleFile = e => {
        const reader = new FileReader();
        reader.onload = evt => {
            const wb = XLSX.read(evt.target.result, {type: "binary"});
            const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetName[0]]);
            onImport(data);
        };
    };
    return <input type="file" accept=".xlsx" onChange={handleFile} />;
}