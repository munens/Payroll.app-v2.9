var nhif = function nhifCalc(num) {
  if (num >= 0 && num <= 5999) {
    var a1 = 150;
    return a1;
  } else if (num >= 6000 && num <= 7999) {
    var a2 = 300;
    return a2;
  } else if (num >= 8000 && num <= 11999) {
    return 400;
  } else if (num >= 12000 && num <= 14999) {
    return 500;
  } else if (num >= 15000 && num <= 19999) {
    return 600;
  } else if (num >= 20000 && num <= 24999) {
    return 750;
  } else if (num >= 25000 && num <= 29999) {
    return 850;
  } else if (num >= 30000 && num <= 34999) {
    return 900;
  } else if (num >= 35000 && num <= 39999) {
    return 950;
  } else if (num >= 40000 && num <= 44999) {
    return 1000;
  } else if (num >= 45000 && num <= 49999) {
    return 1100;
  } else if (num >= 50000 && num <= 59999) {
    return 1200;
  } else if (num >= 60000 && num <= 69999) {
    return 1300;
  } else if (num >= 70000 && num <= 79999) {
    return 1400;
  } else if (num >= 80000 && num <= 89999) {
    return 1500;
  } else if (num >= 90000 && num <= 99999) {
    return 1600;
  } else {
    return 1700;
  }

};

var nssf1N = function nssfCalc1N(num) {

  if (checked === false) {

    if (num <= 6000) {
      return 0.06 * num;

    } else {
      return 360;
    }

  } else {
    return 200;
  }

};

var nssf2N = function nssfCalc2N(num) {

  if (checked === false) {
    if (num > 6000 && num <= 18000) {
      return 0.06 * (num - 6000);

    } else if (num > 18000) {
      return 720;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

var nssf = function nssfCalc(num){
  
  if(num <= 4000){
    
    return 0.05*num;
    
  }else{
    
    return 200;
  }  
};


var tier1 = 10164;
var tier2 = 9576;
var tier3 = 9576;
var tier4 = 9576;

var val1 = $("#gp").val();
var val2 = $("#ncb").val();
var val3 = $("#ad").val();
var checked = document.getElementById("oldrate").checked;

var total1 = 0.1 * tier1;
var total2 = 0.15 * tier2;
var total3 = 0.2 * tier3;
var total4 = 0.25 * tier4;

var grossPay = val1;
var nonCashBenefits = val2;
var deductions = val3;
var personalRelief = 1162;
var insuranceRelief = 0;

var taxablePay = grossPay - 200;

var paye = function payeCalc(grossPay) {
    
    var bal1 = (grossPay - 200) - tier1;
    var bal2 = bal1 - tier2;
    var bal3 = bal2 - tier3;
    var bal4 = bal3 - tier4;
    var balfinal = bal4;
    
    if ((grossPay - 200) <= tier1) {

      var paye0 = 0;
      return paye0;

    } else if (bal1 <= tier2) {

      var paye1 = total1 + 0.15 * (bal1 + nonCashBenefits - deductions);
      var PAYEdue1 = paye1 - personalRelief - insuranceRelief;
      
      if(PAYEdue1 < 0){
        
      PAYEdue1 = 0;
      return PAYEdue1;    
    
    }else{
      return PAYEdue1;
    }

    } else if (bal2 <= tier3) {

      var paye2 = total2 + total1 + 0.2 * (bal2 + nonCashBenefits - deductions);
      var PAYEdue2 = paye2 - personalRelief - insuranceRelief;
      return PAYEdue2;

    } else if (bal3 <= tier4) {

      var paye3 = total3 + total2 + total1 + 0.25 * (bal3 + nonCashBenefits - deductions);
      var PAYEdue3 = paye3 - personalRelief - insuranceRelief;
      return PAYEdue3;

    } else {

      var paye4 = total4 + total3 + total2 + total1 + 0.3 * (balfinal + nonCashBenefits - deductions);
      var PAYEdue4 = paye4 - personalRelief - insuranceRelief;
      return PAYEdue4;
    }
  
};



var payeN = function payeCalcN(grossPay) {
  
  var bal1n = (grossPay - nssf1N(grossPay) - nssf2N(grossPay)) - tier1;
  var bal2n = bal1n - tier2;
  var bal3n = bal2n - tier3;
  var bal4n = bal3n - tier4;
  var balfinaln = 0.3 * bal4n;
  
  if ((grossPay - nssf1N(grossPay) - nssf2N(grossPay)) <= tier1) {

    var paye0 = 0;
    return paye0;

  } else if (bal1n <= tier2) {
    
    var paye1n = total1 + 0.15 * (bal1n  + nonCashBenefits - deductions);
    var PAYEdue1n = paye1n - personalRelief - insuranceRelief;
    
    if(PAYEdue1n < 0){
        
      PAYEdue1n = 0;
      return PAYEdue1n;    
    
    }else{
      return PAYEdue1n;
    }

  } else if (bal2n <= tier3) {

    var paye2n = total2 + total1 + 0.2 * (bal2n  + nonCashBenefits - deductions);
    var PAYEdue2n = paye2n - personalRelief - insuranceRelief;
    return PAYEdue2n;

  } else if (bal3n <= tier4) {

    var paye3n = total3 + total2 + total1 + 0.25 * (bal3n  + nonCashBenefits - deductions);
    var PAYEdue3n = paye3n - personalRelief - insuranceRelief;
    return PAYEdue3n;

  } else {

    var paye4n = total4 + total3 + total2 + total1 + balfinaln  + 0.3*nonCashBenefits - 0.3*deductions;
    var PAYEdue4n = paye4n - personalRelief - insuranceRelief;
    return PAYEdue4n;

  }
};



var netPay = function netPayCalc(grossPay) {
    
    var netPay = grossPay - paye(grossPay) - nssf(grossPay) - nhif(grossPay);
  
    return netPay;
  
  
};

var netPayN = function netPayCalc(grossPay) {
    
    var netPay = grossPay - payeN(grossPay) - nssf1N(grossPay) - nssf2N(grossPay) - nhif(grossPay);
    //console.log(netPay);
  
    return netPay;
  
  
};

function testpaye(){
  
  for(var i = 0; i <= 1000000; i++){
     if(paye(i) < 0){
       
       console.log("1: " + i);
       
     }
  }
  
  for(var j = 0; j <= 1000000; j++){     
      if(payeN(j) < 0){
       
       console.log("2: " + j);
     }
  }  
}

//testpaye();

function testnetPay(){
  
  for(var i = 0; i <= 1000000; i++){
     if(netPay(i) < 0){
       
       console.log("3: " + i);
       
     }
  }
  for(var j = 0; j <= 1000000; j++){
    if(netPayN(j) < 0){
       
       console.log("4: " + j);
     }
  }
}

//testnetPay();

$(document).ready(function() {

  $('#button1').bind('click', function(){
    
    var val1 = $("#gp").val();
    var val2 = $("#ncb").val();
    var val3 = $("#ad").val();
    var checked = document.getElementById("oldrate").checked;
    var grossPay = val1;
    var nonCashBenefits = val2;
    var deductions = val3;
    var personalRelief = 1162;
    var insuranceRelief = 0;
    
    
    if (grossPay === '' || nonCashBenefits === '' || deductions === ''){
      
      alert("Please put values in the box");
    
    }else{
      
      if(checked === true) {
 
        var np = netPay(grossPay);
        
        $("#ans1").html("<b>GrossPay: <b>" + grossPay);
        $("#ans2").html("Taxable Pay: " + (grossPay - nssf(grossPay)));
        $("#ans3").html("PAYE: " + paye(grossPay));
        $("#ans4").html("NSSF (tier 1): " + nssf(grossPay));
        $("#ans5").html("NSSF (tier 2): " + 0);
        $("#ans6").html("NHIF: " +nhif(grossPay));
        $("#ans7").html("Net Pay: " + np);
      
      }else{
        
        var np2 = netPayN(grossPay);
        
        $("#ans1").html("<b>GrossPay: <b>" + grossPay);
        $("#ans2").html("Taxable Pay: " + (grossPay - nssf1N(grossPay) - nssf2N(grossPay)));
        $("#ans3").html("PAYE: " + payeN(grossPay));
        $("#ans4").html("NSSF (tier 1): " + nssf1N(grossPay));
        $("#ans5").html("NSSF (tier 2): " + nssf2N(grossPay));
        $("#ans6").html("NHIF: " +nhif(grossPay));
        $("#ans7").html("Net Pay: " + np2);
        
      }
     
    }  
  }); 

});


$(document).ready(function() {

  $('#button2').bind('click', function() {

    $("#gp").val("");
    $("#ncb").val("");
    $("#ad").val("");

    $("#ans1").html("<b>Gross Pay: <b>");
    $("#ans2").html("Taxable Pay: ");
    $("#ans3").html("PAYE: ");
    $("#ans4").html("NSSF (tier 1): ");
    $("#ans5").html("NSSF (tier 2): ");
    $("#ans6").html("NHIF: ");
    $("#ans7").html("Net Pay: ");

  });
});


$(document).ready(function() {
  $("#btnPrint").bind('click', function() {
    window.print();
  });
});


$(document).ready(function() {
  $("#btnEmail").bind('click', function() {

  });
});