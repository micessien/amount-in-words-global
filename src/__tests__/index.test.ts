import { AmountToWords, CountryCodes } from '../index';

const atw = new AmountToWords();

// Numbering System
// test('supports Personal test country code', () => {
//   expect(atw.toWords('123.45')).toEqual('one hundred and one cedis and twenty pesewas');
//   expect(atw.toWords('1010101010.01', CountryCodes.USA)).toEqual('zero cedis and one pesewas');
// });

// Indian Numbering System
test('supports Indian country code', () => {
  expect(atw.toWords(123, CountryCodes.IND)).toEqual('one hundred and twenty three rupee(s)');
  expect(atw.toWords(1000, CountryCodes.IND)).toEqual('one thousand rupee(s)');
  expect(atw.toWords(101010, CountryCodes.IND)).toEqual('one hundred and one thousand and ten rupee(s)');
  expect(atw.toWords('99,91,01,010', CountryCodes.IND)).toEqual(
    'nine hundred and ninety nine million one hundred and one thousand and ten rupee(s)',
  );
  expect(atw.toWords('99,91,01,010.01', CountryCodes.IND)).toEqual(
    'nine hundred and ninety nine million one hundred and one thousand and ten rupee(s) and one paise',
  );
  expect(atw.toWords('99,91,01,010.23', CountryCodes.IND)).toEqual(
    'nine hundred and ninety nine million one hundred and one thousand and ten rupee(s) and twenty three paise',
  );
});

// USA Numbering System
test('supports USA country code', () => {
  expect(atw.toWords(1921000, CountryCodes.USA)).toEqual('one million nine hundred and twenty one thousand dollar(s)');
  expect(atw.toWords(554272561010, CountryCodes.USA)).toEqual(
    'five hundred and fifty four billion two hundred and seventy two million five hundred and sixty one thousand and ten dollar(s)',
  );
  expect(atw.toWords('0.1', CountryCodes.USA)).toEqual('zero dollar(s) and ten cent(s)');
  expect(atw.toWords('001.87', CountryCodes.USA)).toEqual('one dollar(s) and eighty seven cent(s)');
});

// UK Numbering System
test('supports GBR country code', () => {
  expect(atw.toWords('632,362,999,101,001', CountryCodes.GBR)).toEqual(
    'six hundred and thirty two trillion three hundred and sixty two billion nine hundred and ninety nine million one hundred and one thousand and one pound(s)',
  );
  expect(atw.toWords('0.01', CountryCodes.GBR)).toEqual('zero pound(s) and one pence');
  expect(atw.toWords('001.55', CountryCodes.GBR)).toEqual('one pound(s) and fifty five pence');
  expect(atw.toWords('100,000', CountryCodes.GBR)).toEqual('one hundred thousand pound(s)');
  expect(atw.toWords('100,000,000', CountryCodes.GBR)).toEqual('one hundred million pound(s)');
  expect(atw.toWords('10,000,000,000', CountryCodes.GBR)).toEqual('ten billion pound(s)');
});

// // Nigeria Numbering System
test('supports NGR country code', () => {
  expect(atw.toWords(1000, CountryCodes.NGR)).toEqual('one thousand naira');
  expect(atw.toWords('001.55', CountryCodes.NGR)).toEqual('one naira and fifty five kobo');
  expect(atw.toWords('0.01', CountryCodes.NGR)).toEqual('zero naira and one kobo');
  expect(atw.toWords('001.87', CountryCodes.NGR)).toEqual('one naira and eighty seven kobo');
  expect(atw.toWords('632,362,999,101,001', CountryCodes.NGR)).toEqual(
    'six hundred and thirty two trillion three hundred and sixty two billion nine hundred and ninety nine million one hundred and one thousand and one naira',
  );
  expect(atw.toWords(554272561010, CountryCodes.NGR)).toEqual(
    'five hundred and fifty four billion two hundred and seventy two million five hundred and sixty one thousand and ten naira',
  );
});

// Ghana Numbering System
test('supports GH country code', () => {
  expect(atw.toWords(1921000, CountryCodes.GH)).toEqual('one million nine hundred and twenty one thousand cedis');
  expect(atw.toWords('001.5')).toEqual('one cedis and fifty pesewas');
  expect(atw.toWords('0.01')).toEqual('zero cedis and one pesewas');
  expect(atw.toWords('001.87', CountryCodes.GH)).toEqual('one cedis and eighty seven pesewas');
  expect(atw.toWords('4450', CountryCodes.GH)).toEqual('four thousand four hundred and fifty cedis');
  expect(atw.toWords('4455', CountryCodes.GH)).toEqual('four thousand four hundred and fifty five cedis');
  expect(atw.toWords('4450.50', CountryCodes.GH)).toEqual(
    'four thousand four hundred and fifty cedis and fifty pesewas',
  );
  expect(atw.toWords('100,000', CountryCodes.GH)).toEqual('one hundred thousand cedis');
  expect(atw.toWords('632,362,999,101,001', CountryCodes.GH)).toEqual(
    'six hundred and thirty two trillion three hundred and sixty two billion nine hundred and ninety nine million one hundred and one thousand and one cedis',
  );
  expect(atw.toWords(554272561010, CountryCodes.GH)).toEqual(
    'five hundred and fifty four billion two hundred and seventy two million five hundred and sixty one thousand and ten cedis',
  );
});

// CEDEAO Numbering System
test('supports CFA country code', () => {
  expect(atw.toWords(1921000, CountryCodes.CFA)).toEqual('one million nine hundred and twenty one thousand fcfa');
  expect(atw.toWords('001.55', CountryCodes.CFA)).toEqual('one fcfa and fifty five franc');
  expect(atw.toWords('0.01', CountryCodes.CFA)).toEqual('zero fcfa and one franc');
  expect(atw.toWords('001.87', CountryCodes.CFA)).toEqual('one fcfa and eighty seven franc');
  expect(atw.toWords('100,000', CountryCodes.CFA)).toEqual('one hundred thousand fcfa');
  expect(atw.toWords('632,362,999,101,001', CountryCodes.CFA)).toEqual(
    'six hundred and thirty two trillion three hundred and sixty two billion nine hundred and ninety nine million one hundred and one thousand and one fcfa',
  );
  expect(atw.toWords(554272561010, CountryCodes.CFA)).toEqual(
    'five hundred and fifty four billion two hundred and seventy two million five hundred and sixty one thousand and ten fcfa',
  );
});

// EURO Numbering System
test('supports EURO country code', () => {
  expect(atw.toWords(1921000, CountryCodes.EURO)).toEqual('one million nine hundred and twenty one thousand euro(s)');
  expect(atw.toWords(554272561010, CountryCodes.EURO)).toEqual(
    'five hundred and fifty four billion two hundred and seventy two million five hundred and sixty one thousand and ten euro(s)',
  );
  expect(atw.toWords('0.01', CountryCodes.EURO)).toEqual('zero euro(s) and one cent(s)');
  expect(atw.toWords('001.87', CountryCodes.EURO)).toEqual('one euro(s) and eighty seven cent(s)');
});
