////////////////////
////global vars/////
var initialData = { "s1":"",				//infrared sensors
					"s2":"",
					"s3":"",
					"s4":"",
					"s5":"",
					"s6":"",
					"s7":"",
					"s8":"",
					"ammoCount":"",			//ammo count
					"psManPosDegrees":"",	//servo position
					"pirCurrentState":"",	//motion detection sensors
					"vmAutoDuty":"60",		//auto mode velocity motor
					"vmManDuty":"",			//manual mode velocity motor
					"pmOutDutySP":"60",		//pusher motor 
					"shotRequest":"0",		//shots to fire
				  };
var host = '127.0.0.1',			//IP of server, uses port 1337
	mode,						//can be 'auto' or 'manual'
	turretData = initialData,	//initialize turret data
	disconnects = 1,			//timeout counter
	autoburst = 1,				//burst count for auto mode
	manualburst = 1;			//burst count for manual mode
///end of global vars///
///////////////////////

//initialization stuff, gets everything ready
//registers listeners etc.
$(document).ready(function(){
	//hide auto controls
	modeToggleInit();

	//manual mode knob
	$('.dial').knob({
		'min': 0,
		'max': 180,
		'angleArc': 180,
		'angleOffset': 270,
		'fgColor': "#69bd7d",
		'draw' : function() {
			$(this.i).val(this.cv + '°');
	  	},
	  	'release' : function(v) {
	  		updateServo(v);
	  	}
	});
	//show knob after init
	$('#knobContainer, #knobContainer2').show();

	//shoot button
	$('#shoot').click(function(){
		var count = (mode==="auto")?autoburst:manualburst;
		turretData['shotRequest'] = count;
		addToLog("Shot request sent");
	});
	//start monitoring click
	$('#startMon').click(function(){
		turretData['auto_man'] = 1;
		$(this).prop('disabled', true);
		$('#stopMon').prop('disabled', false);
	});
	//stop monitoring click
	$('#stopMon').click(function(){
		turretData['auto_man'] = 0;
		$(this).prop('disabled', true);
		$('#startMon').prop('disabled', false);
	});

	//make the log minimizable
	$('#logPanel div.panel-heading').click(function() {
		$('#logPanel div.panel-body').slideToggle("fast");
	});

	$('.autoburst').html(autoburst);
	$('.manualburst').html(manualburst);
	$('input#autoburst').val(autoburst);
	$('input#manualburst').val(manualburst);

	connectToTurret();
});

// Takes in array of IR sensor values
// updates IR display
function updateInfrared(sensorData) {
	var output = "";
	var $table = $('table#infraredArray');
		output += "<tr>";
	for(var i = 0; i < sensorData.length; i++) {
		output += "<td magnitude='"+sensorData[i]+"'></td>";
	}
		output += "</tr>";
	$table.empty();
	$table.html(output);
	$('table#infraredArray tr td').each(function() {
		//calculate "intensity" of red for sensor
		var magnitude = Math.round(255-((($(this).attr('magnitude')-26)/10)*255));
		$(this).css('background-color', 'rgb(255, '+magnitude+', '+magnitude+')');
	});
}

//display motion sensor data in to tr elements
function updateMotion(sensorData) {
	for (var i = sensorData.length - 1; i >= 0; i--) {
		var color = (sensorData[i])?'cornflowerblue':'#A3A3A3';
		$('#m'+(i+1)).css('background-color', color);
	};
}

//update servo variable, is sent next sendMessage call
function updateServo(angle) {
	turretData['psManPosDegrees'] = angle
	addToLog("Servo updated to "+angle+" degrees");
}

//add display messages to log on UI
function addToLog(message) {
	var $logContainer = $('div.logPanel .panel-body');
	var height = $logContainer.prop('scrollHeight');
	$logContainer.append('<br>'+message);
	$logContainer.animate({scrollTop: height}, 100);
}

//switch between auto and manual UI modes
//mode not changed for turret until start/stop monitoring clicked
function modeToggleInit() {
	var $autoToggle = $('#autoToggle'),
		$manualToggle = $('#manualToggle'),
		$manualControls = $('#manualControls'),
		$autoControls = $('#autoControls');

	$autoToggle.click(function() {
		//send message to change to manual mode
		$(this).hide();
		$manualToggle.show();
		mode = "manual";
		addToLog("Now in manual mode");
		$autoControls.hide();
		$manualControls.show();
		//verify turret is in right mode
		turretData['auto_man'] = 0;
	});
	$manualToggle.click(function() {
		//send message to change to auto mode
		$(this).hide();
		$autoToggle.show();
		mode = "auto";
		addToLog("Now in auto mode");
		$manualControls.hide();
		$autoControls.show();
	});
}

//display "connecting to turret" display message
//close it once a response is returned
function connectToTurret() {
	//try to connect
	var $connectingModal = $('#connectingModal');
	if(disconnects > 0){
		console.log("waiting");
		$connectingModal.modal();
		//try to create connection every second
		setTimeout(function(){
			sendMessage(initialData, connectToTurret);
		}, 1000);
	}else{
		console.log("done waiting");
		//connection made!
		$connectingModal.modal('hide');
		//init turret poller
		pingTurret();
	}
}

// recursive function, its call to sendMessage passes
// pingTurret to be called again after the message has been sent
function pingTurret(){
	if(disconnects > 5){
		// haven't seen it in a second, restart connecting process
		connectToTurret();
	} else if(typeof imBack === "undefined"){
		setTimeout(function(){
			sendMessage(turretData, pingTurret); //send new data
			resetTurretData(); //clear out data now that it is sent
		}, 200);
	} else {
		pingTurret();
	}
}

//send message to server, set variables if valid data is returned
//if we don't get anything back, increment disconnects
function sendMessage(message, callback){
	var xmlString = objectToXml(message);	//convert obj. to xml string
	var message = {'host':host, 'message':xmlString};	//format for php
	$.post('/socket', message, function(data) {
		//verify valid message received
		if(data.length > 0 && data.indexOf("Warning") === -1){
			disconnects = 0;	//reset disconnect count
			addToLog("Turret data updated");
			setVars(xmlToObject(data));	//update UI variables/displays
			return true;
		} else {
			disconnects++;	//uh oh, increment disconnects
			addToLog("<span style='color:red;'>Error</span> getting data!");
			return false;
		}
	});
	callback();	//call callback function
}

function xmlToObject(xml){
	var arrayResponse = {};
	$(xml).find("*").each(function(){	//add each xml element to object
		arrayResponse[$(this).context.localName] = $(this).text();
	});
	return arrayResponse;
}

//convert an object to an xml formatted string
function objectToXml(arrayXml){
	//add valid header/root tag
	var returnString = '<?xml version="1.0" encoding="UTF-8"?>\
						<turretSettings>';
	for(var key in arrayXml){	//add tag/value for each key/value
		returnString = returnString + "<" + key + ">" + arrayXml[key] + "</" + key + ">";
	};
	return returnString+'</turretSettings>';
}

//convert an array to an object
function arrayToObject(inArr) {
  var retObj = {};
  for (var i = 0; i < inArr.length; ++i)
    if (inArr[i] !== undefined) retObj[i] = inArr[i];
  return retObj;
}

//takes in an array/object, updates UI components
function setVars(vars) {
	//grab IR data
	var sensorData = [vars['s1'],vars['s2'],vars['s3'],vars['s4'],
					  vars['s5'],vars['s6'],vars['s7'],vars['s8'],];
  	updateInfrared(sensorData);
  	//update ammo count
  	$('#magazineProgress').progressBar('update', vars['ammocount']);
  	//update dial
  	if(vars['psmanposdegrees'] !== $('.dial').val().substr(0, $(this).length))
		$('.dial').val(vars['psmanposdegrees']).trigger('change');
	//update motion sensor display
	switch(vars['pircurrentstate']){	
		case '0':
			updateMotion([0,0]);
		break;
		case '1':
			updateMotion([1,0]);
		break;
		case '2':
			updateMotion([0,1]);
		break;
		case '3':
			updateMotion([1,1]);
		break;
	}
	var changeable = ["vmautoduty", "vmmanduty", "pmoutdutysp"];
	for (var i = changeable.length - 1; i >= 0; i--) {
		$('.'+changeable[i]).html(vars[changeable[i]]);
		if(!$('#settingsModal').is(":visible"))
			$('#'+changeable[i]).val(vars[changeable[i]]);
	};
}

//called when settings are saved, passes form values to 
//turretData container, sent when sendMessage is called
function updateSettings(){
	turretData["vmAutoDuty"] = $('input#vmautoduty').val();
	turretData["vmManDuty"] = $('input#vmmanduty').val();
	turretData["pmOutDutySP"] = $('input#pmoutdutysp').val();
	autoburst = $('input#autoburst').val();
	manualburst = $('input#manualburst').val();
	$('.autoburst').html(autoburst);
	$('.manualburst').html(manualburst);
	$('#settingsModal').modal('hide');
}

//clears all settings in turretData except for auto_mans
function resetTurretData(){
	//set all keys to empty strings
	$.each(turretData, function(key, data){
		if(key !== "auto_man")
			turretData[key] = "";
	});
}