// Country code
export enum CountryCodes {
  IND = 'IND',
  USA = 'USA',
  GBR = 'GBR',
  NGR = 'NGR',
  GH = 'GH',
  CFA = 'CFA',
  EURO = 'EURO',
}

export class AmountToWords {
  private first = [
    '',
    'One ',
    'Two ',
    'Three ',
    'Four ',
    'Five ',
    'Six ',
    'Seven ',
    'Eight ',
    'Nine ',
    'Ten ',
    'Eleven ',
    'Twelve ',
    'Thirteen ',
    'Fourteen ',
    'Fifteen ',
    'Sixteen ',
    'Seventeen ',
    'Eighteen ',
    'Nineteen ',
  ];
  private tens = ['', '', 'Twenty ', 'Thirty ', 'Forty ', 'Fifty ', 'Sixty ', 'Seventy ', 'Eighty ', 'Ninety '];
  private numSys: { [currencyCode: string]: string[] } = {
    usNumSys: ['', 'Hundred ', 'Thousand ', 'Million ', 'Billion ', 'Trillion '],
    inNumSys: ['', 'Hundred ', 'Thousand ', 'Lakh ', 'Crore '],
  };

  /**
   * Ifelere: Naira does not not have an 's' for plural therefore this map is adjusted to have currencies declare plural form
   */
  private curCodes: { [countryCode: string]: string[] } = {
    IND: ['Rupee', 'Paisa', 'Paise', '₹', 'inNumSys', 'Rupees'],
    USA: ['Dollar', 'Cent', 'Cents', '$', 'usNumSys', 'Dollars'],
    EURO: ['Euro', 'Cent', 'Cents', '€', 'usNumSys', 'Euros'],
    GBR: ['Pound', 'Pence', 'Pence', '£', 'usNumSys', 'Pounds'],
    NGR: ['Naira', 'Kobo', 'Kobo', '₦', 'usNumSys', 'Naira'],
    GH: ['Cedis', 'Pesewas', 'Pesewas', '₵', 'usNumSys', 'Cedis'],
    CFA: ['FCFA', 'Franc', 'Franc', 'XOF', 'usNumSys', 'FCFA'],
  };

  public toWords = (amount: string | number, countryCode = 'IND') => {
    // console.log(num);
    const numSys = this.numSys[this.getNumSys(countryCode)];
    const nStr = amount.toString().split('.');
    // Remove any other characters than numbers
    const wholeStr = Number(nStr[0].replace(/[^a-z\d\s]+/gi, ''));
    const decimalStr = nStr.length > 1 ? Number(nStr[1]) : 0;
    const wholeStrPart =
      this.getNumSys(countryCode) === 'inNumSys'
        ? this.convert(wholeStr, numSys).trim()
        : this.convertInUS(wholeStr, numSys).trim();
    const decimalPart = this.convert(decimalStr, numSys).trim();
    let valueInStr =
      wholeStrPart.length > 0
        ? `${wholeStrPart} ${this.getCurrencyWhole(countryCode, wholeStr)}`
        : `Zero ${this.getCurrencyWhole(countryCode, wholeStr)}`;
    valueInStr =
      decimalPart.length > 0
        ? `${valueInStr} And ${decimalPart} ${this.getCurrencyChange(countryCode, decimalStr)}`
        : valueInStr;
    // Return
    return valueInStr;
  };

  private getCurrencyWhole = (countryCode = 'IND', amount = 0) => {
    // Ifelere: If the amount is more than one use index 5 of curCodes map
    const index = amount > 1 ? 5 : 0;

    const cur = this.curCodes[countryCode] ? this.curCodes[countryCode][index] : this.curCodes['IND'][index];

    // if (amount > 1) return cur + "s";
    // else return cur;
    return cur;
  };

  private getCurrencyChange = (countryCode: string, amount = 0) => {
    if (amount > 1) return this.curCodes[countryCode] ? this.curCodes[countryCode][2] : this.curCodes['IND'][2];
    else return this.curCodes[countryCode] ? this.curCodes[countryCode][1] : this.curCodes['IND'][1];
  };

  private getCurrencySymbol = (countryCode: string) => {
    return this.curCodes[countryCode] ? this.curCodes[countryCode][2] : this.curCodes['IND'][2];
  };

  private getNumSys = (countryCode: string) => {
    return this.curCodes[countryCode] ? this.curCodes[countryCode][4] : this.curCodes['IND'][4];
  };

  private convert = (num: number | string, numSys: string[]) => {
    const numStr = num.toString().split('');
    const finalStr = [];
    while (numStr.length > 0) {
      for (let i = 0; i < numSys.length - 1; ++i) {
        if (i === 1) finalStr.unshift(this.getUnits(numStr.splice(-1), numSys, i));
        else finalStr.unshift(this.getUnits(numStr.splice(-2), numSys, i));
      }
      if (numStr.length > 0) finalStr.unshift(...numSys.slice(-1));
    }
    return finalStr.join('');
  };

  private convertInUS = (num: number | string, numSys: string[]) => {
    const numStr = num.toString().split('');
    const finalStr = [];
    while (numStr.length > 0) {
      // console.log('🚀 ~ numStr:', numStr);
      // console.log(numSys.length);
      for (let i = 0, l = numSys.length * 2 - 1; i < l; ++i) {
        // console.log(numStr, i, (i/2)+1);
        let strValue = '';
        let curNum = [];
        if (i === 0) {
          // console.log('🚀 ~ before numStr:', numStr);
          curNum = numStr.splice(-2);
          strValue = this.getUnits(curNum, numSys, 0);
          // if str is not empty add random value
          if (strValue) curNum = ['9'];
        } else if (i % 2 === 1) {
          curNum = numStr.splice(-1);
          strValue = this.getUnits(curNum, numSys, 1);
        } else {
          curNum = numStr.splice(-2);
          strValue = this.getUnits(curNum, numSys, i / 2 + 1);
        }
        if (Number(curNum.join('')) !== 0 || numStr.length < 2) finalStr.unshift(strValue);
      }
      if (numStr.length > 0) finalStr.unshift(...numSys.slice(-1));
      else break;
    }
    // return
    return finalStr.join('');
  };

  private getUnits = (lastTwo: string[], numSys: string[], place?: number): string => {
    if (!lastTwo || lastTwo.length === 0) return '';
    let numInStr = '';
    if (this.first[Number(lastTwo.join(''))]) numInStr = this.first[Number(lastTwo.join(''))];
    else numInStr = `${this.tens[Number(lastTwo.shift())]}${this.getUnits(lastTwo.slice(-1), numSys)}`;
    if ((numInStr && place) || (place && place >= 2)) numInStr = `${numInStr}${numSys[place] ?? ''}`;
    return numInStr;
  };
}
