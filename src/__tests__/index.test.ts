import { AmountToWords, CountryCodes } from '../index';

const atw = new AmountToWords();

// Numbering System
// test('supports Personal test country code', () => {
//   expect(atw.toWords('4450', CountryCodes.GH)).toEqual('Four Thousand Four Hundred Fifty Cedis');
// });

// Indian Numbering System
test('supports Indian country code', () => {
  expect(atw.toWords(123)).toEqual('One Hundred Twenty Three Rupees');
  expect(atw.toWords(1000)).toEqual('One Thousand Rupees');
  expect(atw.toWords(101010)).toEqual('One Lakh One Thousand Ten Rupees');
  expect(atw.toWords('99,91,01,010')).toEqual('Ninety Nine Crore Ninety One Lakh One Thousand Ten Rupees');
  expect(atw.toWords('99,91,01,010.01')).toEqual(
    'Ninety Nine Crore Ninety One Lakh One Thousand Ten Rupees And One Paisa',
  );
  expect(atw.toWords('99,91,01,010.23')).toEqual(
    'Ninety Nine Crore Ninety One Lakh One Thousand Ten Rupees And Twenty Three Paise',
  );
});

// USA Numbering System
test('supports USA country code', () => {
  expect(atw.toWords(1921000, CountryCodes.USA)).toEqual('One Million Nine Hundred Twenty One Thousand Dollars');
  expect(atw.toWords(554272561010, CountryCodes.USA)).toEqual(
    'Five Hundred Fifty Four Billion Two Hundred Seventy Two Million Five Hundred Sixty One Thousand Ten Dollars',
  );
  expect(atw.toWords('0.01', CountryCodes.USA)).toEqual('Zero Dollar And One Cent');
  expect(atw.toWords('001.87', CountryCodes.USA)).toEqual('One Dollar And Eighty Seven Cents');
});

// UK Numbering System
test('supports GBR country code', () => {
  expect(atw.toWords('632,362,999,101,001', CountryCodes.GBR)).toEqual(
    'Six Hundred Thirty Two Trillion Three Hundred Sixty Two Billion Nine Hundred Ninety Nine Million One Hundred One Thousand One Pounds',
  );
  expect(atw.toWords('0.01', CountryCodes.GBR)).toEqual('Zero Pound And One Pence');
  expect(atw.toWords('001.55', CountryCodes.GBR)).toEqual('One Pound And Fifty Five Pence');
  expect(atw.toWords('100,000', CountryCodes.GBR)).toEqual('One Hundred Thousand Pounds');
  expect(atw.toWords('100,000,000', CountryCodes.GBR)).toEqual('One Hundred Million Pounds');
  expect(atw.toWords('10,000,000,000', CountryCodes.GBR)).toEqual('Ten Billion Pounds');
});

// Nigeria Numbering System
test('supports NGR country code', () => {
  expect(atw.toWords(1000, CountryCodes.NGR)).toEqual('One Thousand Naira');
  expect(atw.toWords('001.55', CountryCodes.NGR)).toEqual('One Naira And Fifty Five Kobo');
  expect(atw.toWords('0.01', CountryCodes.NGR)).toEqual('Zero Naira And One Kobo');
  expect(atw.toWords('001.87', CountryCodes.NGR)).toEqual('One Naira And Eighty Seven Kobo');
  expect(atw.toWords('632,362,999,101,001', CountryCodes.NGR)).toEqual(
    'Six Hundred Thirty Two Trillion Three Hundred Sixty Two Billion Nine Hundred Ninety Nine Million One Hundred One Thousand One Naira',
  );
  expect(atw.toWords(554272561010, CountryCodes.NGR)).toEqual(
    'Five Hundred Fifty Four Billion Two Hundred Seventy Two Million Five Hundred Sixty One Thousand Ten Naira',
  );
});

// Ghana Numbering System
test('supports GH country code', () => {
  expect(atw.toWords(1921000, CountryCodes.GH)).toEqual('One Million Nine Hundred Twenty One Thousand Cedis');
  expect(atw.toWords('001.55', CountryCodes.GH)).toEqual('One Cedis And Fifty Five Pesewas');
  expect(atw.toWords('0.01', CountryCodes.GH)).toEqual('Zero Cedis And One Pesewas');
  expect(atw.toWords('001.87', CountryCodes.GH)).toEqual('One Cedis And Eighty Seven Pesewas');
  expect(atw.toWords('4450', CountryCodes.GH)).toEqual('Four Thousand Four Hundred Fifty Cedis');
  expect(atw.toWords('4455', CountryCodes.GH)).toEqual('Four Thousand Four Hundred Fifty Five Cedis');
  expect(atw.toWords('4450.50', CountryCodes.GH)).toEqual('Four Thousand Four Hundred Fifty Cedis And Fifty Pesewas');
  expect(atw.toWords('100,000', CountryCodes.GH)).toEqual('One Hundred Thousand Cedis');
  expect(atw.toWords('632,362,999,101,001', CountryCodes.GH)).toEqual(
    'Six Hundred Thirty Two Trillion Three Hundred Sixty Two Billion Nine Hundred Ninety Nine Million One Hundred One Thousand One Cedis',
  );
  expect(atw.toWords(554272561010, CountryCodes.GH)).toEqual(
    'Five Hundred Fifty Four Billion Two Hundred Seventy Two Million Five Hundred Sixty One Thousand Ten Cedis',
  );
});

// CEDEAO Numbering System
test('supports CFA country code', () => {
  expect(atw.toWords(1921000, CountryCodes.CFA)).toEqual('One Million Nine Hundred Twenty One Thousand FCFA');
  expect(atw.toWords('001.55', CountryCodes.CFA)).toEqual('One FCFA And Fifty Five Franc');
  expect(atw.toWords('0.01', CountryCodes.CFA)).toEqual('Zero FCFA And One Franc');
  expect(atw.toWords('001.87', CountryCodes.CFA)).toEqual('One FCFA And Eighty Seven Franc');
  expect(atw.toWords('100,000', CountryCodes.CFA)).toEqual('One Hundred Thousand FCFA');
  expect(atw.toWords('632,362,999,101,001', CountryCodes.CFA)).toEqual(
    'Six Hundred Thirty Two Trillion Three Hundred Sixty Two Billion Nine Hundred Ninety Nine Million One Hundred One Thousand One FCFA',
  );
  expect(atw.toWords(554272561010, CountryCodes.CFA)).toEqual(
    'Five Hundred Fifty Four Billion Two Hundred Seventy Two Million Five Hundred Sixty One Thousand Ten FCFA',
  );
});

// EURO Numbering System
test('supports EURO country code', () => {
  expect(atw.toWords(1921000, CountryCodes.EURO)).toEqual('One Million Nine Hundred Twenty One Thousand Euros');
  expect(atw.toWords(554272561010, CountryCodes.EURO)).toEqual(
    'Five Hundred Fifty Four Billion Two Hundred Seventy Two Million Five Hundred Sixty One Thousand Ten Euros',
  );
  expect(atw.toWords('0.01', CountryCodes.EURO)).toEqual('Zero Euro And One Cent');
  expect(atw.toWords('001.87', CountryCodes.EURO)).toEqual('One Euro And Eighty Seven Cents');
});
