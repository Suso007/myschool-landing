import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Export timetable to Excel
export const exportToExcel = (slots: any[], className: string, type: 'schedule' | 'class' | 'teacher' = 'schedule') => {
    // Prepare data for Excel
    const data: any[] = [];

    if (type === 'schedule' || type === 'class') {
        // Group by day
        DAYS.forEach((day, dayIdx) => {
            const daySlots = slots
                .filter((s: any) => s.dayOfWeek === dayIdx + 1)
                .sort((a, b) => a.startTime.localeCompare(b.startTime));

            if (daySlots.length > 0) {
                data.push([day.toUpperCase(), '', '', '', '']); // Day header
                daySlots.forEach((slot: any) => {
                    data.push([
                        '',
                        `${slot.startTime} - ${slot.endTime}`,
                        slot.subject?.name || 'N/A',
                        type === 'schedule' ? slot.class?.name || 'N/A' : slot.staff?.firstName + ' ' + slot.staff?.lastName || 'N/A',
                        slot.roomNo || 'N/A'
                    ]);
                });
                data.push([]); // Empty row between days
            }
        });
    } else if (type === 'teacher') {
        // Group by day for teacher
        DAYS.forEach((day, dayIdx) => {
            const daySlots = slots
                .filter((s: any) => s.dayOfWeek === dayIdx + 1)
                .sort((a, b) => a.startTime.localeCompare(b.startTime));

            if (daySlots.length > 0) {
                data.push([day.toUpperCase(), '', '', '', '']); // Day header
                daySlots.forEach((slot: any) => {
                    data.push([
                        '',
                        `${slot.startTime} - ${slot.endTime}`,
                        slot.subject?.name || 'N/A',
                        slot.class?.name || 'N/A',
                        slot.roomNo || 'N/A'
                    ]);
                });
                data.push([]); // Empty row between days
            }
        });
    }

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet([
        [`${className} Timetable`],
        [],
        ['Day', 'Time', 'Subject', type === 'teacher' ? 'Class' : 'Teacher', 'Room'],
        ...data
    ]);

    // Set column widths
    ws['!cols'] = [
        { wch: 15 },
        { wch: 15 },
        { wch: 25 },
        { wch: 25 },
        { wch: 10 }
    ];

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Timetable');

    // Generate file name
    const fileName = `${className.replace(/\s+/g, '_')}_Timetable_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Save file
    XLSX.writeFile(wb, fileName);
};

// Export timetable to PDF
export const exportToPDF = (slots: any[], className: string, type: 'schedule' | 'class' | 'teacher' = 'schedule') => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text(`${className} Timetable`, 14, 20);

    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

    let yPos = 35;

    DAYS.forEach((day, dayIdx) => {
        const daySlots = slots
            .filter((s: any) => s.dayOfWeek === dayIdx + 1)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

        if (daySlots.length > 0) {
            // Check if we need a new page
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            // Day header
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(day, 14, yPos);
            yPos += 5;

            // Table data
            const tableData = daySlots.map((slot: any) => [
                `${slot.startTime} - ${slot.endTime}`,
                slot.subject?.name || 'N/A',
                type === 'schedule'
                    ? (slot.class?.name || 'N/A')
                    : type === 'class'
                        ? (slot.staff?.firstName + ' ' + slot.staff?.lastName || 'N/A')
                        : (slot.class?.name || 'N/A'),
                slot.roomNo || 'N/A'
            ]);

            autoTable(doc, {
                startY: yPos,
                head: [[
                    'Time',
                    'Subject',
                    type === 'schedule' ? 'Class' : type === 'class' ? 'Teacher' : 'Class',
                    'Room'
                ]],
                body: tableData,
                theme: 'striped',
                headStyles: { fillColor: [79, 70, 229] }, // Indigo color
                margin: { left: 14 },
                didDrawPage: function (data) {
                    yPos = data.cursor ? data.cursor.y + 10 : yPos + 10;
                }
            });

            yPos += 5;
        }
    });

    // Generate file name
    const fileName = `${className.replace(/\s+/g, '_')}_Timetable_${new Date().toISOString().split('T')[0]}.pdf`;

    // Save PDF
    doc.save(fileName);
};

// Export substitutions to Excel
export const exportSubstitutionsToExcel = (substitutions: any[]) => {
    const data = substitutions.map((sub: any) => [
        new Date(sub.date).toLocaleDateString(),
        sub.originalStaff?.firstName + ' ' + sub.originalStaff?.lastName,
        sub.substituteStaff?.firstName + ' ' + sub.substituteStaff?.lastName,
        sub.timetableSlot?.subject?.name || 'N/A',
        sub.timetableSlot?.class?.name || 'N/A',
        sub.status,
        sub.reason || 'N/A'
    ]);

    const ws = XLSX.utils.aoa_to_sheet([
        ['Substitution Requests'],
        [],
        ['Date', 'Original Teacher', 'Substitute Teacher', 'Subject', 'Class', 'Status', 'Reason'],
        ...data
    ]);

    ws['!cols'] = [
        { wch: 12 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 15 },
        { wch: 12 },
        { wch: 30 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Substitutions');

    const fileName = `Substitutions_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
};

// Export substitutions to PDF
export const exportSubstitutionsToPDF = (substitutions: any[]) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Substitution Requests', 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

    const tableData = substitutions.map((sub: any) => [
        new Date(sub.date).toLocaleDateString(),
        sub.originalStaff?.firstName + ' ' + sub.originalStaff?.lastName,
        sub.substituteStaff?.firstName + ' ' + sub.substituteStaff?.lastName,
        sub.timetableSlot?.subject?.name || 'N/A',
        sub.status,
    ]);

    autoTable(doc, {
        startY: 35,
        head: [['Date', 'Original Teacher', 'Substitute', 'Subject', 'Status']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [79, 70, 229] },
    });

    const fileName = `Substitutions_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
};
