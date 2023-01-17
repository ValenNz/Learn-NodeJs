/* Use Validator Package
    Untuk melakukan validasi sebuah string
*/
const validator = require('validator');

/* Print validator */
console.log(validator.isEmail('ValenNz@gmail.com')); // isEmail() : validasi email
console.log(validator.isMobilePhone('0812345678', 'id-ID')); // isMobilePhone() : validasi no telephone

/* Call chalk (mewarnai terminal) */
// const chalk = require('chalk');
// console.log(chalk.backgroundColorNames('Hello'));

// // const pesan = chalk`lorem iimpiihf {bgRed sit amet} bkajdsiui jlakndflfld kjdf asdhjoasdhodhfhfoaij`;
// // console.log(pesan);

