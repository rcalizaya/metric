const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  this.timeout(5000);
  test("Test valid whole number", function () {
    assert.equal(convertHandler.getNum("52gal"), 52);
  });
  test("Test valid decimal number", function () {
    assert.equal(convertHandler.getNum("52.262gal"), 52.262);
  });
  test("Test valid fraction number", function () {
    assert.equal(convertHandler.getNum("52/3gal"), 52/3);
  });
  test("Test valid fraction number with a decimal", function () {
    assert.equal(convertHandler.getNum("52.1/3gal"), 52.1/3);
  });
  test("Test double fraction number", function () {
    assert.equal(convertHandler.getNum("52.1/3/2gal"), "invalid number");
  });
  test("Test default number 1", function () {
    assert.equal(convertHandler.getNum("gal"), 1);
  });
  
  test("Test valid unit", function () {
    assert.equal(convertHandler.getUnit("2.3/2.1gal"), "gal");
    assert.equal(convertHandler.getUnit("2.3/2.1l"), "L");
    assert.equal(convertHandler.getUnit("kg"), "kg");
  });
  test("Test invalid unit", function () {
    assert.equal(convertHandler.getUnit("2.3/2.1wr"), "invalid unit");
  });
  
  test("Test getReturnUnit", function () {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
  });
  
  test("Test spellOutUnit", function () {
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
  });

  suite('Test Convert Method', function(){
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    test("Test Gallon", function () {
      assert.equal(convertHandler.convert(1.3, "gal"), 1.3*galToL);
    });
    test("Test Liter", function () {
      assert.equal(convertHandler.convert(1.3, "L"), 1.3/galToL);
    });
    test("Test Pound", function () {
      assert.equal(convertHandler.convert(1.3, "lbs"), 1.3*lbsToKg);
    });
    test("Test Kilogram", function () {
      assert.equal(convertHandler.convert(1.3, "kg"), 1.3/lbsToKg);
    });
    test("Test Miles", function () {
      assert.equal(convertHandler.convert(1.3, "mi"), 1.3*miToKm);
    });
    test("Test Kilometer", function () {
      assert.equal(convertHandler.convert(1.3, "km"), 1.3/miToKm);
    });
  })
});