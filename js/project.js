////BUTTON DOM////
//pick the button
let btn = document.querySelector('.button');

////LISTENER////
//listen for click on button
btn.addEventListener('click', function start(e) {
  //stop refreshing the page
  e.preventDefault();

  //////DOM//////
  let formCalculate = document.forms.formCalculate;
  let small = document.querySelector('.small');
  let regular = document.querySelector('.regular');
  let large = document.querySelector('.large');
  let campCost = document.querySelector('.campCost');
  let woodCost = document.querySelector('.woodCost');
  let costTotal = document.querySelector('.costTotal');

  ////VARIABLES////
  let formTotalPeople = formCalculate.totalNum;
  let formTotalDay = formCalculate.totalDay;
  let isReached = false;
  let totalCamper = formTotalPeople.value;
  let totalDay = formTotalDay.value;
  let cost = 0;
  let totalCost = 0;
  let firewoodCost = 6;
  let totalFirewoodCost = 0;

  //-Campsite Features
  const campsiteSmall = {
    minCapacity: 1,
    maxCapacity: 3,
    cost: 40,
    firewood: 1,
    needed: 0,
  };

  const campsiteRegular = {
    minCapacity: 4,
    maxCapacity: 7,
    cost: 70,
    firewood: 2,
    needed: 0,
  };

  const campsiteLarge = {
    minCapacity: 8,
    maxCapacity: 14,
    cost: 120,
    firewood: 3,
    needed: 0,
  };

  ///CHECK WHETHER OR NOT INPUTS ARE EMPTY
  if (totalCamper == '') {
    formTotalPeople.style.border = '2px solid red';
    formTotalPeople.focus();
    return false;
  } else {
    formTotalPeople.style.border = 'none';
  }

  if (totalDay == '') {
    formTotalDay.style.border = '2px solid red';
    formTotalDay.focus();
    return false;
  } else {
    formTotalDay.style.border = 'none';
  }

  ///MAKE CALCULATION FOR NEEDED CAMPSITE(S)
  calculate();

  ///MAKE CALCULATION FOR CAMPSITES & FIREWOOD - CALCULATE THE TOTAL COST
  costCalculate();

  ///GIVE RESULT ON USER SCREEN
  giveResult();

  //TAKE INPUT (TOTAL CAMPERS) AND USE LOOP TO FIND WHAT USER NEEDS
  function calculate() {
    while (!isReached) {
      if (totalCamper >= campsiteLarge.minCapacity) {
        campsiteLarge.needed = campsiteLarge.needed + 1;
        cost = cost + campsiteLarge.cost;
        totalCamper = totalCamper - campsiteLarge.maxCapacity;
      } else if (totalCamper >= campsiteRegular.minCapacity) {
        campsiteRegular.needed = campsiteRegular.needed + 1;
        cost = cost + campsiteRegular.cost;
        totalCamper = totalCamper - campsiteRegular.maxCapacity;
      } else if (totalCamper >= campsiteSmall.minCapacity) {
        campsiteSmall.needed = campsiteSmall.needed + 1;
        cost = cost + campsiteSmall.cost;
        totalCamper = totalCamper - campsiteSmall.maxCapacity;
      } else if (totalCamper <= 0) {
        isReached = true;
      }
    }
    return;
  }

  //CALCULATE TOTAL COST AFTER calculate() FUNCTION
  //+ FIREWOOD COST (MULTIPLY WITH USER INPUT - DAY)
  function costCalculate() {
    cost = totalDay * cost;
    totalFirewoodCost =
      totalDay *
      (campsiteLarge.needed * campsiteLarge.firewood * firewoodCost +
        campsiteRegular.needed * campsiteRegular.firewood * firewoodCost +
        campsiteSmall.needed * campsiteSmall.firewood * firewoodCost);
    totalCost = cost + totalFirewoodCost;
  }

  //GIVE RESULT OF 2 FUNCTIONS ABOVE TO USER SCREEN
  function giveResult() {
    //Needed campsites - Change innerhtml
    small.innerHTML = `${campsiteSmall.needed}`;
    regular.innerHTML = `${campsiteRegular.needed}`;
    large.innerHTML = `${campsiteLarge.needed}`;

    //Cost Summary - Change innerhtml
    campCost.innerHTML = `$${cost}`;
    woodCost.innerHTML = `$${totalFirewoodCost}`;
    costTotal.innerHTML = `$${totalCost}`;
  }
});
