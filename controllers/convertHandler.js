function ConvertHandler() {
  const unitTable = 
  {
    "km": ["mi", "kilometers"],
    "mi": ["km", "miles"],
    "gal": ["L", "gallons"],
    "L": ["gal", "liters"],
    "kg": ["lbs", "kilograms"],
    "lbs": ["kg", "pounds"],
  }
  
  this.getNum = function(input) {
    let result;
    regex = /[a-zA-Z]+/;
    num = input.split(regex)[0];
    if (num == '') return 1;
    num = num.split("/");
    if (num.length > 2) {
      return "invalid number";
    } else if (num.length == 2) {
      result = parseFloat(num[0]) / parseFloat(num[1]);
    } else {
      result = parseFloat(num[0]); 
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    regex = /[^a-zA-Z]+/;
    input = input.trim().toLowerCase();
    input = input.split(regex);
    if (input.length > 1) result = input[1];
    else result = input[0];
    if (result === "l") {
      result = result.toUpperCase();
    }
    if (unitTable.hasOwnProperty(result)) return result;
    else return "invalid unit";
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    result = unitTable[initUnit][0];
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    result = unitTable[unit][1];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit) {
      case "gal":
        result = initNum*galToL;
        break;
      case "L":
        result = initNum/galToL;
        break;
      case "lbs":
        result = initNum*lbsToKg;
        break;
      case "kg":
        result = initNum/lbsToKg;
        break;
      case "mi":
        result = initNum*miToKm;
        break;
      case "km":
        result = initNum/miToKm;
        break;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    let initUnitString = this.spellOutUnit(initUnit);
    let returnUnitString = this.spellOutUnit(returnUnit);
    result = `${initNum} ${initUnitString} converts to `;
    result += `${returnNum} ${returnUnitString}`;
    return result;
  };
}

module.exports = ConvertHandler;
