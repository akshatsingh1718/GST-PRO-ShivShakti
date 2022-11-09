import fs from 'fs';

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name?.split(' ')?.[0]?.[0]?.toUpperCase()}${
      name?.split(' ')?.[1]?.[0]?.toUpperCase() || ''
    }`,
  };
}

const states = {
  'Andhra Pradesh': { code: 'AP' },
  'Arunachal Pradesh': { code: 'AR' },
  Assam: { code: 'AS' },
  Bihar: { code: 'BR' },
  Chhattisgarh: { code: 'CT' },
  Gujarat: { code: 'GA' },
  Haryana: { code: 'HR' },
  'Himachal Pradesh': { code: 'HP' },
  'Jammu and Kashmir': { code: 'JK' },
  Goa: { code: 'GA' },
  Jharkhand: { code: 'JH' },
  Karnataka: { code: 'KA' },
  Kerala: { code: 'KL' },
  'Madhya Pradesh': { code: 'MP' },
  Maharashtra: { code: 'MH' },
  Manipur: { code: 'MN' },
  Meghalaya: { code: 'ML' },
  Mizoram: { code: 'MZ' },
  Nagaland: { code: 'NL' },
  Odisha: { code: 'OR' },
  Punjab: { code: 'PB' },
  Rajasthan: { code: 'RJ' },
  Sikkim: { code: 'SK' },
  'Tamil Nadu': { code: 'TN' },
  Telangana: { code: 'TG' },
  Tripura: { code: 'TR' },
  Uttarakhand: { code: 'UT' },
  'Uttar Pradesh': { code: 'UP' },
  'West Bengal': { code: 'WB' },
  'Andaman and Nicobar Islands': { code: 'AN' },
  Chandigarh: { code: 'CH' },
  'Dadra and Nagar Haveli': { code: 'DN' },
  'Daman and Diu': { code: 'DD' },
  Delhi: { code: 'DL' },
  Lakshadweep: { code: 'LD' },
  Puducherry: { code: 'PY' },
};

export function getStates() {
  return Object.keys(states);
}

export function getStateCode(state: string) {
  return states?.[state]?.code || '';
}

export function toSummaryInvoice(invoice) {
  invoice.billTo = {
    company: invoice?.company?.name,
    address: invoice?.company?.address,
    email: invoice?.company?.email,
    phone: invoice?.company?.phone,
  };

  const employees = new Map();
  invoice?.bills?.forEach((e) => {
    console.log(e);
    console.log(parseFloat(e.amount));
    if (!employees.hasOwnProperty(e.employee.name)) {
      employees[e.employee.name] = {};
      employees[e.employee.name]['name'] = e.employee.name;
      employees[e.employee.name]['amount'] = 0;
    }
    employees[e.employee.name]['amount'] += parseFloat(e.amount);
  });
  invoice.employeeTotal = Object.values(employees);

  return invoice;
}

export function numberToWords(num) {
  var a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen ',
  ];
  var b = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  if ((num = num.toString()).length > 9) return 'overflow';
  const n = ('000000000' + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = '';
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore '
      : '';
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh '
      : '';
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand '
      : '';
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred '
      : '';
  str += n[5] != 0 ? a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]] : '';
  return str;
}

export function percentage(percent, total) {
  return Number(((percent / 100) * total).toFixed(4));
}

export function numberToWordRupees(num: number) {
  const rupees = num.toString().split('.')[0];
  const paise = num.toString().split('.')?.[1];
  const word = `${numberToWords(rupees)} ${
    paise ? 'and ' + numberToWords(paise) + ' paise ' : ''
  }only`;

  return word;
}

export function saveImage(fromPath: string, savePath: string) {
  console.log('---> saveImage');
  return window.electron.fs.copy(fromPath, savePath);
}

export function isEmptyObject(obj: object) {
  return Object.keys(obj).length === 0;
}
