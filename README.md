# amount-in-words-global (Amount in Words)
Convert numeric amount in words with most global currency

## Install

```
npm install amount-in-words-global or yarn add amount-in-words-global
```

**Conversion Examples**  
101 - One Hundred One Rupees  
1010101010.01 - One Billion Ten Million One Hundred One Thousand Ten Dollars And One Cent

#### Input Parameters
**amount:** number or string (e.g. 11022.27, '$657,798.54')  
**countryCode:** IND, GBR, USA, NGR, GH, CFA, EURO (more will be added in future)

#### Usage - Javascript
```javascript
const atwp = require('amount-in-words-global');
const atw = new atwp.AmountToWords();
...
console.log(atw.toWords(111.11, atwp.CountryCodes.USA));
```

#### Usage - Typescript
```typescript
import { AmountToWords, CountryCodes } from "amount-in-words-global";
const atw = new AmountToWords();
...
console.log(atw.toWords(123.45, CountryCodes.GH));
```

---

**_NB:_** _The original code and logic was come from this project [amount-in-words package](https://www.npmjs.com/package/amount-in-words)._

---

## Contributing

In case you notice a bug, please open an issue mentioning the input that has caused an incorrect conversion.
