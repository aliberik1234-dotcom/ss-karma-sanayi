import { FinancialSummary } from './privateService';

export class PrintService {
  public static generatePrintableHtml(data: FinancialSummary): string {
    const statusTranslations: Record<string, string> = {
      BEKLIYOR: 'Bekliyor',
      ODENDI: 'Ödendi',
      GECIKMIS: 'Gecikmiş',
      KISMI: 'Kısmi Ödeme'
    };

    const installmentRows = data.activePlan?.installments && data.activePlan.installments.length > 0
      ? data.activePlan.installments.map((inst) => {
          const formattedDate = new Date(inst.dueDate).toLocaleDateString('tr-TR');
          const formattedPayDate = inst.paymentDate ? new Date(inst.paymentDate).toLocaleDateString('tr-TR') : '-';
          const statusText = statusTranslations[inst.status] || inst.status;
          return `
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${inst.installmentNumber}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">₺${Number(inst.amount).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${formattedDate}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${statusText}</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${inst.bankName || '-'}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${inst.receiptNumber || '-'}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${formattedPayDate}</td>
            </tr>
          `;
        }).join('')
      : `<tr><td colspan="7" style="padding: 16px; text-align: center; border: 1px solid #ddd; color: #666;">Aktif taksit planı bulunmamaktadır.</td></tr>`;

    const printDate = new Date().toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
      <!DOCTYPE html>
      <html lang="tr">
      <head>
        <meta charset="UTF-8">
        <title>S.S. Karma Sanayi Sitesi - Üye Ekstresi</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            color: #111;
            margin: 0;
            padding: 24px;
            background: #fff;
            font-size: 13px;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 12px;
            margin-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #0f172a;
          }
          .header p {
            margin: 4px 0 0;
            font-size: 13px;
            color: #475569;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-bottom: 20px;
            background: #f8fafc;
            padding: 12px 16px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
          }
          .meta-item {
            font-size: 13px;
          }
          .meta-item strong {
            color: #334155;
            display: inline-block;
            width: 140px;
          }
          .summary-cards {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 20px;
          }
          .card {
            border: 1px solid #cbd5e1;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
            background: #f8fafc;
          }
          .card .label {
            font-size: 11px;
            text-transform: uppercase;
            color: #64748b;
            margin-bottom: 4px;
          }
          .card .val {
            font-size: 16px;
            font-weight: bold;
            color: #0f172a;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th {
            background: #0f172a;
            color: #fff;
            padding: 8px;
            border: 1px solid #0f172a;
            font-size: 12px;
            text-transform: uppercase;
          }
          .footer-signatures {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            margin-top: 50px;
            text-align: center;
          }
          .sig-box {
            padding-top: 40px;
            border-top: 1px dashed #94a3b8;
            margin: 0 40px;
            font-weight: 600;
          }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>S.S. KARMA SANAYİ SİTESİ KOOPERATİFİ</h1>
          <p>Üye Kişisel Bilgi ve Finansal Hesap Ekstresi</p>
        </div>

        <div class="meta-grid">
          <div class="meta-item"><strong>Sıra Numarası:</strong> ${data.sequenceFormatted}</div>
          <div class="meta-item"><strong>Rapor Tarihi:</strong> ${printDate}</div>
          <div class="meta-item"><strong>Üye Adı Soyadı:</strong> ${data.fullName}</div>
          <div class="meta-item"><strong>Telefon:</strong> ${data.phone || 'Belirtilmedi'}</div>
        </div>

        <div class="summary-cards">
          <div class="card">
            <div class="label">Arsa Büyüklüğü</div>
            <div class="val">${Number(data.plotSize).toLocaleString('tr-TR')} m²</div>
          </div>
          <div class="card">
            <div class="label">Peşinat</div>
            <div class="val">₺${Number(data.downPayment).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
          </div>
          <div class="card">
            <div class="label">Toplam Ödenen</div>
            <div class="val" style="color: #15803d;">₺${Number(data.totalPaid).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
          </div>
          <div class="card">
            <div class="label">Kalan Bakiye</div>
            <div class="val" style="color: #b91c1c;">₺${Number(data.remainingDebt).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 40px;">No</th>
              <th>Taksit Tutarı</th>
              <th>Vade Tarihi</th>
              <th>Durum</th>
              <th>Banka</th>
              <th>Dekont No</th>
              <th>Ödeme Tarihi</th>
            </tr>
          </thead>
          <tbody>
            ${installmentRows}
          </tbody>
        </table>

        <div class="footer-signatures">
          <div class="sig-box">Üye / Hak Sahibi İmzası</div>
          <div class="sig-box">Kooperatif Yönetim Kurulu Kaşe / İmza</div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;
  }
}
