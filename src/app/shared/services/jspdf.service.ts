import { Injectable } from "@angular/core";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Vacation } from "../../models/vacations";

@Injectable({
  providedIn: 'root'
})
export class JsPDFService {

  constructor() {}

  generateVacationPDF(vacation: Vacation): void {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Vacation Summary', 14, 15);

    doc.setFontSize(12);
    const generalInfo = [
      `Starting Date: ${vacation.startingDate}`,
      `Ending Date: ${vacation.endingDate}`,
      `Budget: ${vacation.budget}`,
      `Country: ${vacation.country}`,
      `Days: ${vacation.days}`,
      `Companion: ${vacation.travelCompanion}`
    ];

    generalInfo.forEach((line, i) => {
      doc.text(line, 14, 25 + i * 7);
    });

    let currentY = 25 + generalInfo.length * 7 + 10;

    if (vacation.activityList.length > 0) {
      autoTable(doc, {
        startY: currentY,
        head: [['Activities']],
        body: vacation.activityList.map((a) => [a.activityType]),
      });
      currentY = (doc as any).lastAutoTable.finalY + 10;
    }

    if (vacation.itineraryDayList.length > 0) {
      autoTable(doc, {
        startY: currentY,
        head: [['Day', 'Morning', 'Afternoon', 'Evening']],
        body: vacation.itineraryDayList.map((day) => [
          `Day ${day.dayNumber}`,
          day.morning,
          day.afternoon,
          day.evening,
        ]),
      });
    }

    doc.save('vacation-summary.pdf');
  }
}
