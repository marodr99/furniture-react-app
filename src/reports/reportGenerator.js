import jsPDF from "jspdf";
import "jspdf-autotable"

const generatePDF = (reports, startDate, endDate) => {
    const doc = new jsPDF();
    const tableColumn = ["Description", "Furniture type", "Name", "Total sold", "Profit"];
    const tableRows = [];

    reports.forEach(report => {
        const reportData = [
            report.description,
            report.furnitureType,
            report.name,
            report.totalSold,
            report.profit
        ]
        tableRows.push(reportData)
    });

    doc.autoTable(tableColumn, tableRows, {startY: 20});
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.text(`Sold furniture between ${startDate} and ${endDate}`, 14, 15)
    doc.save(`report_${dateStr}.pdf`);
}

export default generatePDF;