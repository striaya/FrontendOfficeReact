import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Offices");
    XLSX.writeFile(wb, "offices.xlsx");
}

export const exportPDF = (data) => {
    const doc = new jsPDF();
    autoTable(doc, {
        head: [["Code", "City", "Phone"]],
        body: data.map(o => [o.officeCode, o.city, o.phone])
    });
    doc.save("offices.pdf");
};