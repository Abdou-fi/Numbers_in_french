function threeDigitsConversion(part, partIndex) {  //part is a three digits string
    var unities = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    var tenToTwenty = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    var tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'];
    var hundreds = ['', '', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    var hundredsDigit = part.substring(0, 1);
    var tensDigit = part.substring(1, 2);
    var unitiesDigit = part.substring(2, 3);
    var hundredsText = new String();
    var tensText = new String();
    var unitiesText = new String();

    //hundreds
    if (hundredsDigit == '0') {hundredsText = hundreds[hundredsDigit];}
    else if (hundredsDigit == '1'){
        if ((tensDigit == '0') && (unitiesDigit == '0')){hundredsText = hundreds[hundredsDigit] + 'cent';}
        else {hundredsText = hundreds[hundredsDigit] + 'cent ';}
    }
    else {
        if ((tensDigit == '0') && (unitiesDigit == '0') && (partIndex != 2)){hundredsText = hundreds[hundredsDigit] + ' cents';}
        else {hundredsText = hundreds[hundredsDigit] + ' cent ';}
    }

    // tens
    tensText = tens[tensDigit];

    // unities
    switch (unitiesDigit) {
        case '0' : {
            if (tensDigit == '1'){ unitiesText = tenToTwenty[unitiesDigit]; }
            else if ((tensDigit == '7') || (tensDigit == '9' )) { unitiesText = '-' + tenToTwenty[unitiesDigit] ; }
            else if (tensDigit == '8' ) { unitiesText = 's'; }
            else {unitiesText='';}
        } break;

        case '1' : {
            if (tensDigit == '0'){
                if ((hundredsDigit == '0') && (partIndex == 2 )) {
                    unitiesText = '';
                }
                else{
                    unitiesText = unities[unitiesDigit];
                }
            }
            else if (tensDigit == '1'){ unitiesText = tenToTwenty[unitiesDigit]; }
            else if (tensDigit == '7'){ unitiesText =' et ' + tenToTwenty[unitiesDigit]; }
            else if (tensDigit == '8'){ unitiesText ='-' + unities[unitiesDigit]; }
            else if (tensDigit == '9'){ unitiesText ='-' + tenToTwenty[unitiesDigit]; }
            else {unitiesText=' et ' + unities[unitiesDigit];}
        } break;

        default : {
            if (tensDigit == '0'){ unitiesText = unities[unitiesDigit]; }
            else if (tensDigit == '1'){ unitiesText = tenToTwenty[unitiesDigit]; }
            else if ((tensDigit == '7') || (tensDigit == '9')){ unitiesText ='-' + tenToTwenty[unitiesDigit]; }
            else {unitiesText = '-' + unities[unitiesDigit];}
        }
    }
    return hundredsText + tensText + unitiesText;
}

function parts(chiffre) {
    var chiffreLength = chiffre.length;
    var missingDigits = 12 - chiffreLength;

    while (missingDigits > 0){
        chiffre = '0' + chiffre;
        missingDigits--;
    }
    return [chiffre.substring(0,3), chiffre.substring(3,6), chiffre.substring(6,9), chiffre.substring(9)];
}

function partDelimiters(milliardsPart, millionsPart, thousandsPart, unitiesPart){

    var milliards = milliardsPart;
    var millions = millionsPart;
    var thousands = thousandsPart;
    var unities = unitiesPart;

    var milliardsDelimiter = new String();
    var millionsDelimiter = new String();
    var thousandsDelimiter = new String();

    if (milliards == '000'){
        milliardsDelimiter = '';
    } else if (milliards == '001'){
        if ((millions =='000')&&(thousands=='000')&&(unities=='000')) {milliardsDelimiter = ' milliard';} else {milliardsDelimiter = ' milliard ';}
    } else {
        if ((millions =='000')&&(thousands=='000')&&(unities=='000')) {milliardsDelimiter = ' milliards';} else {milliardsDelimiter = ' milliards ';}
    }

    if (millions == '000'){
        millionsDelimiter = '';
    } else if (millions == '001'){
        if ((thousands=='000')&&(unities=='000' )) {millionsDelimiter = ' million';} else {millionsDelimiter = ' million ';}
    } else {
        if ((thousands=='000')&&(unities=='000' )) {millionsDelimiter = ' millions';} else {millionsDelimiter = ' millions ';}
    }

    if (thousands == '000'){thousandsDelimiter = '';}
    else if (thousands == '001'){
        if (unities=='000') {thousandsDelimiter = 'mille';} else {thousandsDelimiter = 'mille ';}
    } else {
        if (unities=='000') {thousandsDelimiter = ' mille';} else {thousandsDelimiter = ' mille ';}
    }

    return [milliardsDelimiter, millionsDelimiter, thousandsDelimiter];
}

function chiffre2lettre(x) {
    var conversion = new String();

    if (x != '') {
        conversion =
            threeDigitsConversion(parts(x)[0], 0) + partDelimiters(parts(x)[0], parts(x)[1], parts(x)[2], parts(x)[3])[0] +
            threeDigitsConversion(parts(x)[1], 1) + partDelimiters(parts(x)[0], parts(x)[1], parts(x)[2], parts(x)[3])[1] +
            threeDigitsConversion(parts(x)[2], 2) + partDelimiters(parts(x)[0], parts(x)[1], parts(x)[2], parts(x)[3])[2] +
            threeDigitsConversion(parts(x)[3], 3) + '.';
    } else {
        conversion = '';
    }
    if (( x != '') && (Number(x) == 0)) {
        conversion = 'zéro.';
    }

    return conversion.charAt(0).toUpperCase() + conversion.slice(1);
}

function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /^[0-9]+$/;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function copytxt() {
    // Get the text field
    var copied = document.getElementById("result".innerHTML);
  
    // Select the text field
    copied.select();
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copied.value);
  
    // Alert the copied text
    alert("Copied the text: " + copied.value);
  }

