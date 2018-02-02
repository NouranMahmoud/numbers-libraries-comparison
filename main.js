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
  const formatInput = $('.format');
  const formatBox = $('.format-box');

  //output elements
  const output = $('.output');
  const rawOutput = $('.raw');
  const prosCons = $('.pros-cons');

  //init app
  input.on('keyup', function(e){
    let selectedLibrary = library.val();
    let num = input.val();
    let locale = selectorCountry.val();
    let format = formatInput.val();
    let formatedNum;
    let rawValue;

    switch (selectedLibrary) {
      case 'numeral':
        numeral.locale(locale);
        formatedNum = numeral(num).format(format);
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
        formatedNum = numbro(num).format(format);
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

  library.on('change', function libraryChange(e){
    prosCons.show().not('.'+library.val()).hide();
    if (library.val() === 'numbro' || library.val() === 'numeral') {
      formatBox.show();
    } else {
      formatBox.hide();
    }

    return libraryChange;
  }());

})()