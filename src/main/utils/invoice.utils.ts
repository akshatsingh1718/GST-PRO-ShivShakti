var excel = require('excel4node');
import { getUserChosenPath } from './common.utils';

const invoiceColumns = [
  'Name',
  'Entry No',
  'Entry Date',
  'Docket No',
  'Destination',
  'Destination Party',
  'Description',
  'Weight',
  'Amount',
];
function createInvoiceExcel(masterDetails, invoice) {
  // Create a new instance of a Workbook class
  var workbook = new excel.Workbook();

  // Add Worksheets to the workbook
  var worksheet = workbook.addWorksheet('Sheet 1');

  // Create a reusable style
  var style = workbook.createStyle({
    font: {
      color: '#FF0800',
      size: 12,
    },
  });

  worksheet
    .cell(1, Math.floor(invoiceColumns.length / 2))
    .string(masterDetails.name)
    .style(style);
  worksheet
    .cell(2, Math.floor(invoiceColumns.length / 2))
    .string(masterDetails.service)
    .style(style);
  worksheet
    .cell(3, Math.floor(invoiceColumns.length / 2))
    .string(masterDetails.address)
    .style(style);

  worksheet
    .cell(4, Math.floor(invoiceColumns.length / 3))
    .string(`MOB: ${masterDetails.phone}`)
    .style(style);
  worksheet
    .cell(4, Math.floor(invoiceColumns.length / 3))
    .string(`Email: ${masterDetails.email}`)
    .style(style);

  // worksheet.cell(5,1).string(`Bill No: ${bill.id}`).style(style);
  // worksheet.cell(5,2).string(`Bill date: ${bill.createdAt}`).style(style);
  console.log("--------->><><><> createbill");
  console.log(invoice);
  worksheet
    .cell(5, 3)
    .string(`Department: ${invoice?.bills?.[0]?.employee.department}`)
    .style(style);

  worksheet.cell(6, 1).string(invoiceColumns[0]).style(style);
  worksheet.cell(6, 2).string(invoiceColumns[1]).style(style);
  worksheet.cell(6, 3).string(invoiceColumns[2]).style(style);
  worksheet.cell(6, 4).string(invoiceColumns[3]).style(style);
  worksheet.cell(6, 5).string(invoiceColumns[4]).style(style);
  worksheet.cell(6, 6).string(invoiceColumns[5]).style(style);
  worksheet.cell(6, 7).string(invoiceColumns[6]).style(style);
  worksheet.cell(6, 8).string(invoiceColumns[7]).style(style);
  worksheet.cell(6, 9).string(invoiceColumns[8]).style(style);

  let currentTotal = 0.0;
  let grandTotal = 0.0;

  let cellNo = 7;
  let prvName = '';
  for (const i in invoice?.bills) {
    let bill = invoice?.bills[i];
    if (bill.employee.name !== prvName) {
      if (i != 0) {
        console.log('INSIDE I');
        worksheet.cell(cellNo, 2).string(`total: ${currentTotal}`).style(style);
        currentTotal = 0.0;
        cellNo++;
      }

      worksheet.cell(cellNo, 1).string(bill.employee.name).style(style);
      prvName = bill.employee.name;
    }
    worksheet.cell(cellNo, 2).string(bill?.id).style(style);
    worksheet
      .cell(cellNo, 3)
      .string(bill?.createdAt?.toLocaleDateString('en-US'))
      .style(style);
    worksheet.cell(cellNo, 4).string(bill?.docketNo).style(style);
    worksheet.cell(cellNo, 5).string(bill?.destination).style(style);
    worksheet.cell(cellNo, 6).string(bill?.partyName).style(style);
    worksheet.cell(cellNo, 7).string(bill?.description).style(style);
    worksheet.cell(cellNo, 8).string(bill?.weight).style(style);
    worksheet.cell(cellNo, 9).string(bill?.amount).style(style);

    grandTotal += parseFloat(bill?.amount);
    currentTotal += parseFloat(bill?.amount);
    cellNo++;
  }
  worksheet.cell(cellNo, 2).string(`total: ${currentTotal}`).style(style);
  worksheet.cell(cellNo+2, 2).string(`Grand Total: ${grandTotal}`).style(style);
  return workbook;
}

export async function saveExcelInvoice(masterDetails, invoice) {
  const workbook = await createInvoiceExcel(masterDetails, invoice);
  const dialogSavePath = await getUserChosenPath('invoice.xlsx');
  if (!dialogSavePath.canceled) {
    workbook.write(dialogSavePath.filePath);
  }
}
