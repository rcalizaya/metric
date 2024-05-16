'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.get("/api/convert", (req, res) => {
    const {input} = req.query;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    if (initNum === "invalid number") {
      if (initUnit === "invalid unit") {
        return res.send("invalid number and unit");
      } else {
        return res.send("invalid number");
      }
    } else if (initUnit === "invalid unit") {
      return res.send("invalid unit");
    }
    
    let returnNum = convertHandler.convert(initNum, initUnit);
    returnNum = parseFloat(returnNum.toFixed(5));
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const result = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    res.send(
      {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: result
    });
  });
};
