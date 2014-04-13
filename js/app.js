////global vars/////
var defaultData = {"s1":"",
					"s2":"",
					"s3":"",
					"s4":"",
					"s5":"",
					"s6":"",
					"s7":"",
					"s8":"",
					"ammoCount":"",
					"vmAutoDuty":"",
					"vmManDuty":"",
					"pmOutDutySP":"",
					"psManPosDegrees":"",
					"pirCurrentState":""
					};
var spinner = "<img src='images/spiffygif.com.gif' class='center-block spinner' alt='Spinner'>",
	host = '127.0.0.1',
	poller,
	mode,
	firstUpdate = true,
	turretConnection,
	turretData = defaultData,
	disconnects = 1;

$(document).ready(function() {
	indexInit();
});

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
		var magnitude = Math.round(255-(($(this).attr('magnitude')/50)*255));
		$(this).css('background-color', 'rgb(255, '+magnitude+', '+magnitude+')');
	});
}

function updateMotion(sensorData) {
	sensorData.each(function(key, value){
		var color = (value)?'red':'#A3A3A3';
		$('#s'+key).css('background-color');
	});
}

function fetchSettings(){
	formData = $('#settingsForm').serialize();
	return formData;
}

function processSettings(){
	var formData = fetchSettings();
	sendMessage(arrayToObject(formData));	//send settings to hw
}

//send array to hardware software on port 1337
//returns response
function sendMessage(message, callback){
	var xmlString = objectToXml(message);
	var message = {'host':host, 'message':xmlString};
	var response;
	jQuery.isPlainObject(message);
	$.post('/socket', message, function(data) {
		if(data.length > 0 && data.indexOf("Warning") === -1){
			disconnects = 0;
			addToLog("Turret data updated");
			// console.log(data);
			setVars(xmlToObject(data));
			return true;
		} else {
			disconnects++;
			addToLog("<span style='color:red;'>Error</span> getting data!");
			return false;
		}

		if(typeof callback !== "undefined")
			callback();
	});
}

function xmlToObject(xml){
	var arrayResponse = {};
	$(xml).find("*").each(function(){
		arrayResponse[$(this).context.localName] = $(this).text();
	});
	return arrayResponse;
}

function objectToXml(arrayXml){
	var returnString = '<?xml version="1.0" encoding="UTF-8"?>\
						<turretSettings>';
	for(var key in arrayXml){
		returnString = returnString + "<" + key + ">" + arrayXml[key] + "</" + key + ">";
	};
	return returnString+'</turretSettings>';
}

function arrayToObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    if (arr[i] !== undefined) rv[i] = arr[i];
  return rv;
}

function setVars(vars) {
	// console.log(varObject);
	//grab IR data
	var sensorData = [vars['s1'],vars['s2'],vars['s3'],vars['s4'],
					  vars['s5'],vars['s6'],vars['s7'],vars['s8'],];
  	updateInfrared(sensorData);
  	// updateMotion([vars['m1'], vars['m2']]);
  	//update ammo count
  	$('#magazineProgress').progressBar('update', vars['ammocount']);
  	//update dials
  	if(mode==="auto")
  		$('.dialView').val(vars['psmanposdegrees']).trigger('change');
  	if(vars['psmanposdegrees'] !== $('.dial').val().substr(0, $(this).length))
		$('.dial').val(vars['psmanposdegrees']).trigger('change');
	switch(vars['pircurrentstate']){
		case 0:
			updateMotion([0,0]);
		break;
		case 1:
			updateMotion([1,0]);
		break;
		case 2:
			updateMotion([0,1]);
		break;
		case 3:
			updateMotion([1,1]);
		break;
	}

}

function startMonitoring(){
	turretData['auto_man'] = 1;
}

function stopMonitoring(){
	turretData['auto_man'] = 0;
}


var indexInit = function() {

	//hide auto controls
	modeToggleInit();

	$('.homeTrigger').parent().addClass('active');
	$('.debugTrigger').parent().removeClass('active');

	$('[viewData]').click(function() {
		window.location.href = $(this).attr('viewData');
	});

	$('table.infraredArray tr td').each(function() {
		var magnitude = Math.round(255-($(this).attr('magnitude')*255));
		$(this).css('background-color', 'rgb(255, '+magnitude+', '+magnitude+')');
	});
	$('#startSweep').click(function() {
		sweepDemo();
	});
	$('#settingsModal').on('hide.bs.modal', function() {
		$('[data-toggle="modal"]').parent().removeClass('active');
	});
	$('#settingsModal').on('show.bs.modal', function() {
		$('[data-toggle="modal"]').parent().addClass('active');
	});
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
		turretData['shotRequest'] = 1;
		addToLog("Shot request sent");
	});

	//make the log minimizable
	$('#logPanel div.panel-heading').click(function() {
		$('#logPanel div.panel-body').slideToggle("fast");
	});


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
			sendMessage(defaultData, connectToTurret());
		}, 3000);
	}else{
		console.log("done waiting");
		//connection made!
		$connectingModal.modal('hide');
		// Init poller
		pingTurret();
	}
}

function pingTurret(imBack){
	if(disconnects > 5){
		//uh oh, display connecting to turret modal
		connectToTurret();
	} else if(typeof imBack === "undefined"){
		setTimeout(function(){
			sendMessage(turretData, pingTurret(true));
		}, 1000);
	} else {
		//reset data
		turretData = defaultData;
		pingTurret();
	}
}



//////shared functions///////
// function sweepDemo() {
// 	var $magazine = $('#magazineProgress');
// 	var $scanning = $('#scanningProgress');
// 	updateInfrared(testArray);
// 	$magazine.progressBar('max');
// 	$scanning.progressBar('min');

// 	(function sweepLoop(i) {
// 	   setTimeout(function() {
// 	      $scanning.progressBar('update', 10*i);
// 	      if(i === 6){
// 			updateInfrared(testArray2);
// 	      	shootLoop($magazine.prop('aria-valuenow'));
// 	      }
// 	      i++;
// 	      if (i<7) sweepLoop(i);
// 	   }, 1000)
// 	})(1);

// 	function shootLoop(i) {
// 		setTimeout(function() {
// 			$magazine.progressBar('update', i);
// 			if((--i)+1) shootLoop(i);
// 		}, 500);
// 	}
// }
