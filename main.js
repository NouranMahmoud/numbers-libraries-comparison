(function(){
  // global dependancies
  const $ = require('jquery');

  /**** libraries ****/
  // numeral setup
  const numeral = require('numeral');
  require('numeral/locales');

  // number-abbreviate
  const NumAbbr = require('number-abbreviate');

  // approximate-number
  const approx = require('approximate-number');

  // numbro
  var numbro = require("numbro");

  /**** End of libraries ****/

  // input elements
  const library = $('.library');
  const input = $('.converter-num');
  const selectorCountry = $('.country');

  //output elements
  const output = $('.output');
  const rawOutput = $('.raw');
  const prosCons = $('.pros-cons');

  //init app
  prosCons.not('.'+library.val()).hide();

  input.on('keyup', function(e){
    let selectedLibrary = library.val();
    let num = input.val();
    let locale = selectorCountry.val();
    let formatedNum;
    let rawValue;

    switch (selectedLibrary) {
      case 'numeral':
        numeral.locale(locale);
        formatedNum = numeral(num).format('$0.[0000000] a');
        rawValue = numeral(formatedNum).value();
        break;

      case 'number-abbreviate':
        let numAbbr = new NumAbbr(['k', 'm', 'b', 't']);
        formatedNum = numAbbr.abbreviate(num, 2);
        rawValue = num;
        break;

      case 'approximate-number':
        formatedNum = approx(num, {
          decimal: ',',
          min10k: true,
          prefix: '$',
          capital: true,
          round: true,
        });
        rawValue = num;
        break;

      case 'numbro':
        formatedNum = numbro(num).format('0,[0]a');
        rawValuem = num;
        debugger;
        break;

      default:
        formatedNum = num;
        rawValue = num;
        break;
    }

    output.text(formatedNum);
    rawOutput.text(rawValue);
    
    // if empty input set default values
    if(input.val().trim() === "") {
      output.text('0');
      rawOutput.text('0');
    }
  });

  library.on('change', function(e){
    prosCons.show().not('.'+library.val()).hide();
  });
})()