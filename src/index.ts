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
  private words1To19: string[] = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  private wordsTens: string[] = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  private wordsBig: string[] = [
    '',
    'thousand',
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'quintillion',
    'sextillion',
    'septillion',
    'octillion',
    'nonillion',
    'decillion',
  ];

  /**
   * Ifelere: Naira does not not have an 's' for plural therefore this map is adjusted to have currencies declare plural form
   */
  private curCodes: { [countryCode: string]: string[] } = {
    IND: ['rupee', 'paisa', 'paise', '₹', 'HINDI', 'rupee(s)'],
    USA: ['dollar', 'cent', 'cent(s)', '$', 'EN', 'dollar(s)'],
    EURO: ['euro', 'cent', 'cent(s)', '€', 'EN', 'euro(s)'],
    GBR: ['pound', 'pence', 'pence', '£', 'EN', 'pound(s)'],
    NGR: ['naira', 'kobo', 'kobo', '₦', 'EN', 'naira'],
    GH: ['cedis', 'pesewas', 'pesewas', '₵', 'EN', 'cedis'],
    CFA: ['fcfa', 'franc', 'franc', 'XOF', 'EN', 'fcfa'],
  };

  public toWords = (amount: string | number, countryCode = 'GH') => {
    let val: number;
    const currencySys = this.curCodes[countryCode];
    // Clean value if it is number or string
    if (typeof amount === 'string') {
      val = Number(amount.replace(/,/g, ''));
    } else {
      val = amount;
    }
    // console.log('Val-----', val);

    // Separate integer to decimal part
    const integerPart = parseInt(val.toString()); // Extracts the integer part
    const decimalPartMatch = val.toString().match(/\.\d*$/); // Extracts the decimal part
    const decimalPartStartByZero = decimalPartMatch ? decimalPartMatch[0].substring(1).startsWith('0') : false; // Return true if decimal start by 0
    const decimalPart = decimalPartMatch ? parseInt(decimalPartMatch[0].substring(1)) : 0; // Assign the decimal value
    // console.log('🚀 ~ decimalPart:', decimalPart);

    if (integerPart === 0 && decimalPart === 0) {
      return this.words1To19[0];
    }

    let numWords: string = this.convertToWords(integerPart) + ` ${currencySys[5]}`;
    numWords =
      numWords +
      (decimalPart !== 0
        ? ' and ' + this.convertDecimalToWords(decimalPart, decimalPartStartByZero) + ` ${currencySys[2]}`
        : '');
    return numWords;
  };

  private getNumSys = (countryCode: string) => {
    return this.curCodes[countryCode] ? this.curCodes[countryCode][4] : this.curCodes['IND'][4];
  };

  // Function convertor number
  private convertToWords = (n: number): string => {
    let convertedWords;
    if (n < 20) {
      convertedWords = this.words1To19[n];
    } else if (n < 100) {
      convertedWords = this.wordsTens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + this.words1To19[n % 10] : '');
    } else if (n < 1000) {
      convertedWords =
        this.words1To19[Math.floor(n / 100)] +
        ' hundred' +
        (n % 100 !== 0 ? ' and ' + this.convertToWords(n % 100) : '');
    } else {
      let words = '';
      // const numLength = n.toString().length;
      // console.log(`numLength----`, numLength);
      for (let i = 0; n > 0; i++) {
        const part = n % 1000;
        const partLength = part.toString().length;
        let localLengthHundred = false;
        if (i === 0 && partLength <= 2) {
          localLengthHundred = true;
        }
        // console.log(`n---- ${i}`, n);
        // console.log(`n % 1000---- ${i}`, part.toString().length);
        // console.log(`n % 1000 val---- ${i}`, part);
        if (part !== 0) {
          words =
            `${localLengthHundred ? 'and ' : ''}` +
            this.convertToWords(part) +
            (this.wordsBig[i] ? ' ' + this.wordsBig[i] : ' ') +
            ' ' +
            words;
        }
        n = Math.floor(n / 1000);
      }
      convertedWords = words.trim();
    }

    return convertedWords;
  };

  // Function convertor decimal
  private convertDecimalToWords = (n: number, decimalPartStartByZero = false): string => {
    let convertedWords;
    const numberLength = n.toString().length;
    // console.log('🚀~ numberLength:', numberLength);
    // Check if length is one
    if (numberLength === 1 && !decimalPartStartByZero) {
      switch (n) {
        case 1:
          convertedWords = this.words1To19[10];
          break;
        case 2:
          convertedWords = this.wordsTens[2];
          break;
        case 3:
          convertedWords = this.wordsTens[3];
          break;
        case 4:
          convertedWords = this.wordsTens[4];
          break;
        case 5:
          convertedWords = this.wordsTens[5];
          break;
        case 6:
          convertedWords = this.wordsTens[6];
          break;
        case 7:
          convertedWords = this.wordsTens[7];
          break;
        case 8:
          convertedWords = this.wordsTens[8];
          break;
        case 9:
          convertedWords = this.wordsTens[9];
          break;
        default:
          convertedWords = this.words1To19[0];
          break;
      }
    } else {
      if (n < 20) {
        convertedWords = this.words1To19[n];
      } else if (n < 100) {
        convertedWords = this.wordsTens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + this.words1To19[n % 10] : '');
      } else if (n < 1000) {
        convertedWords =
          this.words1To19[Math.floor(n / 100)] +
          ' hundred' +
          (n % 100 !== 0 ? ' and ' + this.convertToWords(n % 100) : '');
      } else {
        let words = '';
        // const numLength = n.toString().length;
        // console.log(`numLength----`, numLength);
        for (let i = 0; n > 0; i++) {
          const part = n % 1000;
          const partLength = part.toString().length;
          let localLengthHundred = false;
          if (i === 0 && partLength <= 2) {
            localLengthHundred = true;
          }
          // console.log(`n---- ${i}`, n);
          // console.log(`n % 1000---- ${i}`, part.toString().length);
          // console.log(`n % 1000 val---- ${i}`, part);
          if (part !== 0) {
            words =
              `${localLengthHundred ? 'and ' : ''}` +
              this.convertToWords(part) +
              (this.wordsBig[i] ? ' ' + this.wordsBig[i] : ' ') +
              ' ' +
              words;
          }
          n = Math.floor(n / 1000);
        }
        convertedWords = words.trim();
      }
    }

    return convertedWords;
  };
}
