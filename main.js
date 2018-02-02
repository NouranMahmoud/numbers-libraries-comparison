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
  const localeBox = $('.locale-box');
  const approximateNumberSettings = $('.approximate-number-settings');
  const min10k = $('.min10k');
  const capital = $('.capital');
  const round = $('.round');
  const numbeAbbreviateSettings = $('.number-abbreviate-settings');
  const abbrFormat = $('.abbr-format');

  //output elements
  const output = $('.output');
  const rawOutput = $('.raw');
  const prosCons = $('.pros-cons');

  // default values
  formatInput.val('$ 0.0 a');
  input.val(1234);

  // init app and event handler function

  const onChange = (function onChange(e) {
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
        formatedNum = numAbbr.abbreviate(num, Number(abbrFormat.val()));
        rawValue = num;
        break;

      case 'approximate-number':
        formatedNum = approx(num, {
          decimal: ',',
          min10k: min10k.is(':checked'),
          prefix: '$',
          capital: capital.is(':checked'),
          round: round.val(),
        });

        rawValue = num;
        break;

      case 'numbro':
        formatedNum = numbro(num).format(format);
        rawValuem = numbro(formatedNum).value();
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
    return onChange;
  }())

  selectorCountry.on('change', onChange);
  library.on('change', onChange);
  input.on('keyup', onChange);
  formatInput.on('keyup', onChange);
  min10k.on('change', onChange);
  capital.on('change', onChange);
  round.on('change', onChange);
  abbrFormat.on('keyup', onChange);

  library.on('change', function libraryChange(e){
    prosCons.show().not('.'+library.val()).hide();
    if (library.val() === 'numbro' || library.val() === 'numeral') {
      formatBox.show();
      localeBox.show();
    } else {
      formatBox.hide();
      localeBox.hide();
    }

    if (library.val() === 'approximate-number') {
      approximateNumberSettings.show();
    } else {
      approximateNumberSettings.hide();
    }

    if (library.val() === 'number-abbreviate') {
      numbeAbbreviateSettings.show();
    } else {
      numbeAbbreviateSettings.hide();
    }

    return libraryChange;
  }());

})()