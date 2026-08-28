import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

export interface ReceiptData {
  memberName: string;
  memberNumber: string;
  memberPhone: string;
  installmentNumber: number;
  dueDate: string;
  amount: string;
  paymentDate: string;
  bankName: string;
  receiptNumber: string;
  notes?: string;
}

export class ReceiptService {
  public static async generateReceiptPDF(data: ReceiptData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const stream = new PassThrough();
        const chunks: Buffer[] = [];

        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);

        doc.on('data', (chunk: Buffer) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        this.drawReceipt(doc, data);
        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  }

  private static drawReceipt(doc: any, data: ReceiptData): void {
    const primaryColor = '#1e40af';

    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f8fafc');
    doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50).fill('#ffffff').stroke('#e2e8f0').lineWidth(1);

    doc.font('Helvetica-Bold')
      .fontSize(20)
      .fillColor(primaryColor)
      .text('S.S. KARMA SANAYİ SİTESİ', 50, 55, { align: 'center' });

    doc.addVerticalSpace(5);

    doc.font('Helvetica')
      .fontSize(11)
      .fillColor('#475569')
      .text('TAHSİLAT MAKBURU', 50, 90, { align: 'center' });

    doc.moveTo(50, 110).lineTo(doc.page.width - 50, 110).strokeColor('#cbd5e1').lineWidth(1.5);

    const leftStartY = 130;
    doc.font('Helvetica-Bold')
      .fontSize(10)
      .fillColor('#1e293b')
      .text('ÜYE', 50, leftStartY);
    doc.font('Helvetica')
      .fontSize(10)
      .fillColor('#334155')
      .text(data.memberName, 70, leftStartY);
    doc.font('Helvetica')
      .fontSize(9)
      .fillColor('#64748b')
      .text(`No: ${data.memberNumber}`, 70, leftStartY + 14);
    doc.font('Helvetica')
      .fontSize(9)
      .fillColor('#64748b')
      .text(`Tel: ${data.memberPhone}`, 70, leftStartY + 28);

    doc.font('Helvetica-Bold')
      .fontSize(10)
      .fillColor('#1e293b')
      .text('TAKSİT', doc.page.width / 2 + 10, leftStartY);
    doc.font('Helvetica')
      .fontSize(10)
      .fillColor('#334155')
      .text(`${data.installmentNumber}. Taksit`, doc.page.width / 2 + 30, leftStartY);

    doc.font('Helvetica-Bold')
      .fontSize(10)
      .fillColor('#1e293b')
      .text('ÖDEME TARİHİ', 50, leftStartY + 50);
    doc.font('Helvetica')
      .fontSize(10)
      .fillColor('#334155')
      .text(data.paymentDate, 110, leftStartY + 50);

    doc.font('Helvetica-Bold')
      .fontSize(10)
      .fillColor('#1e293b')
      .text('ÖDEME TUTARI', doc.page.width / 2 + 10, leftStartY + 50);
    doc.font('Helvetica')
      .fontSize(14)
      .fillColor('#059669')
      .text(`₺${Number(data.amount).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, doc.page.width / 2 + 70, leftStartY + 49);

    doc.font('Helvetica-Bold')
      .fontSize(10)
      .fillColor('#1e293b')
      .text('BANKA', 50, leftStartY + 75);
    doc.font('Helvetica')
      .fontSize(10)
      .fillColor('#334155')
      .text(data.bankName || 'N/A', 90, leftStartY + 75);

    doc.font('Helvetica-Bold')
      .fontSize(10)
      .fillColor('#1e293b')
      .text('VADE TARİHİ', doc.page.width / 2 + 10, leftStartY + 75);
    doc.font('Helvetica')
      .fontSize(10)
      .fillColor('#334155')
      .text(data.dueDate, doc.page.width / 2 + 70, leftStartY + 75);

    if (data.notes) {
      doc.font('Helvetica-Bold')
        .fontSize(10)
        .fillColor('#1e293b')
        .text('NOTLAR', 50, leftStartY + 105);
      doc.font('Helvetica')
        .fontSize(9)
        .fillColor('#475569')
        .text(data.notes, 90, leftStartY + 105, { width: doc.page.width - 120 });
    }

    const boxBottom = data.notes ? leftStartY + 145 : leftStartY + 125;

    doc.moveTo(50, boxBottom + 5).lineTo(doc.page.width - 50, boxBottom + 5).strokeColor('#cbd5e1').lineWidth(1);

    doc.font('Helvetica-Bold')
      .fontSize(10)
      .fillColor('#1e293b')
      .text('MAKBUP NO', 50, boxBottom + 20);
    doc.font('Helvetica')
      .fontSize(12)
      .fillColor(primaryColor)
      .text(data.receiptNumber, 120, boxBottom + 19);

    doc.font('Helvetica')
      .fontSize(9)
      .fillColor('#94a3b8')
      .text('S.S. Karma Sanayi Sitesi Yönetim Sistemi', 50, doc.page.height - 80, { align: 'center' })
      .text('Bu elektronik makbuptur.', doc.page.width / 2 - 40, doc.page.height - 70, { align: 'center' });
  }
}
