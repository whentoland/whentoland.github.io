function buttonClick()
{
	if (document.getElementById('theButton').classList.contains('button')) {
		counter = counter+1;
		
		var battCells = document.getElementById("cellsChoice").options[document.getElementById("cellsChoice").selectedIndex].value;
		var battAmps = parseFloat(myForm.battAmps.value);
		var wattsDrain = parseFloat(myForm.wattsDrain.value);
		var motorPower = parseFloat(myForm.motorPower.value);
		var throttle = document.getElementById("throttle").options[document.getElementById("throttle").selectedIndex].value;
		var theFinalDrain;
		
		if (myForm.wattsDrain.value!="") theFinalDrain=wattsDrain; else theFinalDrain=motorWattsCalc(motorPower,throttle);
		
		var ampsToLand=battAmps*0.7;
		var flightTime=battWattsCalc(battCells,battAmps)*0.7/theFinalDrain*60;
		
		var voltTable=[];
		populateTable(voltTable);
		var voltToLand=voltTable[cRating(theFinalDrain,battWattsCalc(battCells,battAmps))*2];
				
		document.getElementById('answervolts').innerHTML = "Its time to land when your OSD shows "+superRound(voltToLand,2)*battCells+"v (under normal load)";
		document.getElementById('answertime').innerHTML = "This should be after approximately "+superRound(flightTime,0)+" minutes flown and "+superRound(ampsToLand,0)+" Amps used";

		if ((isNaN(voltToLand))||(isNaN(flightTime))||(isNaN(ampsToLand))) {
			document.getElementById('answervolts').innerHTML = "Oops, something's wrong";
			document.getElementById('answertime').innerHTML = "Either your inputs are just silly or there's a bug somewhere in here. Let me know at aproto.ecom@gmail.com";
		}
		
		document.getElementById('answervolts').className = 'answervolts';
		document.getElementById('answertime').className = 'answertime';
		
		if (whatadstoshow()==0) {
			document.getElementById('sources').className = 'sources';
			document.getElementById('andnow').className = 'andnow';	
		}
		if (whatadstoshow()==1) {
			document.getElementById('donate').className = 'donate';
			document.getElementById('donatetext').className = 'andnow';	
		}
		if (whatadstoshow()==2) {
			document.getElementById('adverts').className = 'sources';
			document.getElementById('andnow').className = 'andnow';	
		}
		
		document.getElementById('buttonHolder').className = 'hidden';
		
		//galabel = frequency + ';' + txpower + ';' + document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text + ';' + document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text+';'+counter;
		//ga('send', 'event', 'letsfly', 'click', galabel);
	}
}

function whatadstoshow()
{
	var today = new Date();
	if (isOdd(today.getDate())) return 2; else return 2;
	//0 is the guide and lab
	//1 is donate
	//2 is the guide and angel
}

function inputSelect(whichone)
{
	if (whichone=="wattsDrain") {
		myForm.motorPower.value=null;
		document.getElementById('throttle').value = "unselected";
		document.getElementById("throttle").className='selectors';
	}
	if ((whichone=="motorPower")||(whichone=="throttle")) myForm.wattsDrain.value=null;

	if (whichone=="throttle") document.getElementById("throttle").className='selectorsselected';
	if (whichone=="cellsChoice") document.getElementById("cellsChoice").className='selectorsselected';
	
	document.getElementById('answervolts').className = 'hidden';
	document.getElementById('answertime').className = 'hidden';
	document.getElementById('andnow').className = 'hidden';
	document.getElementById('sources').className = 'hidden';
	
	var battCells = document.getElementById("cellsChoice").options[document.getElementById("cellsChoice").selectedIndex].value;
	var throttle = document.getElementById("throttle").options[document.getElementById("throttle").selectedIndex].value;
	
	if ((battCells!="unselected")&&(myForm.battAmps.value!="")&&((myForm.wattsDrain.value!="")||((myForm.motorPower.value!="")&&(throttle!="unselected")))) {
		document.getElementById('theButton').classList.add('button'); 
		document.getElementById('buttonHolder').classList.add('positionbutton');	
		document.getElementById('buttonHolder').classList.remove('hidden');	
	}	
}

function infoClick()
{
  var win = window.open("info.html", '_blank');
  win.focus();	
}

function infoClickMob()
{
  window.location="info.html";
}

function randomNum(x, y)
{
	return Math.floor(Math.random() * ((y-x)+1) + x);
}

function battWattsCalc(cells, amps)
{
	return amps/1000*4.2*cells
}

function motorWattsCalc(motorwatts, throttle) {
	return motorwatts*throttle/100
}

//returns the number of C that we're draining, rounded to the closest 0.5
function cRating(drainwatts,battwatts) {
	var cExact = drainwatts/battwatts;
	if(cExact>25) cExact=25;
	return Math.round(cExact*2)/2;
}



function log10(x)
{
	return Math.log(x) / Math.LN10;
}

function superRound(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp  = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

function isOdd(num) {
	return num % 2;
}

function labClick()
{
ga('send', 'event', 'lablink', 'click');
}

function guideClick()
{
ga('send', 'event', 'guidelink', 'click');
}
function twitterClick()
{
ga('send', 'event', 'tweet', 'click');
}

function populateTable(voltTable) {
	voltTable[0]=3.8;
	voltTable[1]=3.7225;
	voltTable[2]=3.645;
	voltTable[3]=3.639375;
	voltTable[4]=3.63375;
	voltTable[5]=3.628125;
	voltTable[6]=3.6225;
	voltTable[7]=3.616875;
	voltTable[8]=3.61125;
	voltTable[9]=3.605625;
	voltTable[10]=3.6;
	voltTable[11]=3.597;
	voltTable[12]=3.594;
	voltTable[13]=3.591;
	voltTable[14]=3.588;
	voltTable[15]=3.585;
	voltTable[16]=3.582;
	voltTable[17]=3.579;
	voltTable[18]=3.576;
	voltTable[19]=3.573;
	voltTable[20]=3.57;
	voltTable[21]=3.5625;
	voltTable[22]=3.555;
	voltTable[23]=3.5475;
	voltTable[24]=3.54;
	voltTable[25]=3.5325;
	voltTable[26]=3.525;
	voltTable[27]=3.5175;
	voltTable[28]=3.51;
	voltTable[29]=3.5025;
	voltTable[30]=3.495;
	voltTable[31]=3.4875;
	voltTable[32]=3.48;
	voltTable[33]=3.4725;
	voltTable[34]=3.465;
	voltTable[35]=3.4575;
	voltTable[36]=3.45;
	voltTable[37]=3.4425;
	voltTable[38]=3.435;
	voltTable[39]=3.4275;
	voltTable[40]=3.42;
	voltTable[41]=3.4085;
	voltTable[42]=3.397;
	voltTable[43]=3.3855;
	voltTable[44]=3.374;
	voltTable[45]=3.3625;
	voltTable[46]=3.351;
	voltTable[47]=3.3395;
	voltTable[48]=3.328;
	voltTable[49]=3.3165;
	voltTable[50]=3.305;
	return;
}