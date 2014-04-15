////////////////////
////global vars/////
var initialData = { "s1":"",
					"s2":"",
					"s3":"",
					"s4":"",
					"s5":"",
					"s6":"",
					"s7":"",
					"s8":"",
					"ammoCount":"",
					"psManPosDegrees":"",
					"pirCurrentState":"",
					"vmAutoDuty":"60",
					"vmManDuty":"",
					"pmOutDutySP":"60",
					"shotRequest":"0",
				  };
var spinner = "<img src='images/spiffygif.com.gif' class='center-block spinner' alt='Spinner'>",
	host = '127.0.0.1',
	mode,
	turretData = initialData,
	disconnects = 1,
	autoburst = 1,
	manualburst = 1;
///end of global vars///
///////////////////////

$(document).ready(function(){indexInit()});

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
		var magnitude = Math.round(255-((($(this).attr('magnitude')-28)/10)*255));
		$(this).css('background-color', 'rgb(255, '+magnitude+', '+magnitude+')');
	});
}

function updateMotion(sensorData) {
	for (var i = sensorData.length - 1; i >= 0; i--) {
		var color = (sensorData[i])?'cornflowerblue':'#A3A3A3';
		$('#m'+(i+1)).css('background-color', color);
	};
}

var indexInit = function() {
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
	//auto mode knob
	$('.dialView').knob({
		'min': 0,
		'max': 180,
		'angleArc': 180,
		'angleOffset': 270,
		'fgColor': "#69bd7d",
		'readOnly': true,
		'draw' : function() {
			$(this.i).val(this.cv + '°');
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

	//make the log minimizable
	$('#logPanel div.panel-heading').click(function() {
		$('#logPanel div.panel-body').slideToggle("fast");
	});

	$('.autoburst').html(autoburst);
	$('.manualburst').html(manualburst);
	$('input#autoburst').val(autoburst);
	$('input#manualburst').val(manualburst);

	connectToTurret();
};

function updateServo(angle) {
	turretData['psManPosDegrees'] = angle
	addToLog("Servo updated to "+angle+" degrees");
}

function addToLog(message) {
	var $logContainer = $('div.logPanel .panel-body');
	var height = $logContainer.prop('scrollHeight');
	$logContainer.append('<br>'+message);
	$logContainer.animate({scrollTop: height}, 100);
}

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
	});
	$manualToggle.click(function() {
		//send message to change to auto mode
		$(this).hide();
		$autoToggle.show();
		mode = "auto";
		addToLog("Now in auto mode");
		$manualControls.hide();
		$autoControls.show();
		//verify turret is in right mode
		turretData['auto_man'] = 0;
	});
}

function connectToTurret() {
	//try to connect
	var $connectingModal = $('#connectingModal');
	if(disconnects > 0){
		console.log("waiting");
		$connectingModal.modal();
		//try to create connection every three seconds
		setTimeout(function(){
			sendMessage(initialData, connectToTurret);
		}, 1000);
	}else{
		console.log("done waiting");
		//connection made!
		$connectingModal.modal('hide');
		// Init poller
		pingTurret();
	}
}

function pingTurret(){
	if(disconnects > 5){
		// haven't seen it in a second, restart connecting process
		connectToTurret();
	} else if(typeof imBack === "undefined"){
		setTimeout(function(){
			sendMessage(turretData, pingTurret);
		}, 200);
	} else {
		pingTurret();
	}
}

function sendMessage(message, callback){
	var xmlString = objectToXml(message);	//convert obj. to xml string
	var message = {'host':host, 'message':xmlString};	//format for php
	resetTurretData();	//clear out data
	// jQuery.isPlainObject(message); not sure if needed
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

function objectToXml(arrayXml){
	//add valid header/root tag
	var returnString = '<?xml version="1.0" encoding="UTF-8"?>\
						<turretSettings>';
	for(var key in arrayXml){	//add tag/value for each key/value
		returnString = returnString + "<" + key + ">" + arrayXml[key] + "</" + key + ">";
	};
	return returnString+'</turretSettings>';
}

function arrayToObject(inArr) {
  var retObj = {};
  for (var i = 0; i < inArr.length; ++i)
    if (inArr[i] !== undefined) retObj[i] = inArr[i];
  return retObj;
}

function setVars(vars) {
	//grab IR data
	var sensorData = [vars['s1'],vars['s2'],vars['s3'],vars['s4'],
					  vars['s5'],vars['s6'],vars['s7'],vars['s8'],];
  	updateInfrared(sensorData);
  	//update ammo count
  	$('#magazineProgress').progressBar('update', vars['ammocount']);
  	//update dials
  	// if(mode==="auto")
  		$('.dialView').val(vars['psmanposdegrees']).trigger('change');
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

function resetTurretData(){
	//set all keys to empty strings
	$.each(turretData, function(key, data){
		turretData[key] = "";
	});
}