////global vars/////
var stateObject,
	lastPage = null,
	spinner = "<img src='images/spiffygif.com.gif' class='center-block spinner' alt='Spinner'>",
	host = '127.0.0.1',
	stopNow = false;

$(document).ready(function() {
	switch(currentPage){
		case "Index":
			indexInit();
		break;
		case "Debug":
			debugInit();
		break;
	}
	$('.debugTrigger').click(function(e) {
		if(ajax){
			e.preventDefault();
			showDebug();
		}
		$(this).parent().addClass('active');
	});

	$('.homeTrigger').click(function(e) {
		if(ajax){
			e.preventDefault();
			showIndex();
		}
	});
	InstantClick.init();
});
//////////////////////////
/////////END OF READY////
////////////////////////


////////////////////////////////////////////
///////jquery method for progress bars//////
////////////////////////////////////////////
(function($){
    var methods = {
        init : function(options) {
        	
        },
        min : function() {
        	$(this).css('width', '0%');
        	$(this).attr('aria-valuenow', $(this).attr('aria-valuemin'));
        	$(this).find('span').text($(this).attr('aria-valuemin'));
        },
        max : function() {
        	$(this).css('width', '100%');
        	$(this).attr('aria-valuenow', $(this).attr('aria-valuemax'));
        	$(this).find('span').text($(this).attr('aria-valuemax'));
        },
        decrement : function(value) {
        	valueNow = $(this).attr('aria-valuenow');
        	if(typeof value === "undefined") value = 1;
        	if(valueNow === $(this).attr('aria-valuemin'))
        		$.error("current at min, can't decrement!");
        	newValue = valueNow - value;
        	$(this).attr('aria-valuenow', newValue);
        	$(this).find('span').text(newValue);
        	$(this).css('width', Math.round(100*(newValue/$(this).attr('aria-valuemax')))+'%');
        },
        update : function(value) {
        	if(value > $(this).attr('aria-valuemax') || value < $(this).attr('aria-valuemin'))
        		$.error( 'value outside of progress bar\'s range!');
        	$(this).css('width', Math.round(100*(value/$(this).attr('aria-valuemax')))+'%');
        	$(this).attr('aria-valuenow', value);
        	$(this).find('span').text(value);
        }
    }

    $.fn.progressBar = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.progressBar' );
        }
    }
})(jQuery);
//////shared functions///////




function sweepDemo() {
	var $magazine = $('#magazineProgress');
	var $scanning = $('#scanningProgress');
	updateInfrared(testArray);
	$magazine.progressBar('max');
	$scanning.progressBar('min');

	(function sweepLoop(i) {
	   setTimeout(function() {
	      $scanning.progressBar('update', 10*i);
	      if(i === 6){
			updateInfrared(testArray2);
	      	shootLoop($magazine.prop('aria-valuenow'));
	      }
	      i++;
	      if (i<7) sweepLoop(i);
	   }, 1000)
	})(1);

	function shootLoop(i) {
		setTimeout(function() {
			$magazine.progressBar('update', i);
			if((--i)+1) shootLoop(i);
		}, 500);
	}
}

function updateInfrared(sensorData) {
	var output = "";
	var $table = $('table.infraredArray');
		output += "<tr>";
	for(var i = 0; i < sensorData.length; i++) {
		output += "<td magnitude='"+sensorData[i]+"'></td>";
	}
		output += "</tr>";
	$table.empty();
	$table.html(output);
	$('table.infraredArray tr td').each(function() {
		var magnitude = Math.round(255-($(this).attr('magnitude')*255));
		$(this).css('background-color', 'rgb(255, '+magnitude+', '+magnitude+')');
	});
}

function fetchSettings(){
	formData = $('#settingsForm').serialize();
	if($('.dial').length)  //grab angle, if set
		formData['servoAngle'] = servoAngle;
	return formData;
}
function processSettings(){
	var formData = fetchSettings();
	updateSettings(formData);	//send settings to db
	sendMessage(arrayToObject(formData));	//send settings to hw
}

function updateSettings(settingsArray){
	$.post($form.attr('action'), settingsArray, function(data) {
		eval('show'+currentPage)();
		$('#settingsModal').find('[data-dismiss="modal"]').trigger('click');	//close modal
		showSettings($('.settingsContainer'));	//update settings display
		showSettingsForm($('#settingsForm'));	//update form data
	});

}

//shows settings on index
function showSettings($container){
	$container.empty();
	$container.html(spinner);

	$.post('/settings/get', null, function(data) {
		$container.empty();
		$container.html(data);
	});
}

//generates hidden settings modal
function showSettingsForm($container){
	$container.empty();
	$container.html(spinner);

	$.post('/settings/form', null, function(data) {
		$container.empty();
		$container.html(data);
		var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
		elems.forEach(function(html) {
			var switchery = new Switchery(html);
		});
		$('.selectpicker').selectpicker();
	});
}

//send array to hardware software on port 1337
//returns response
function sendMessage(message, callback){
	var xmlString = objectToXml(message);
	var message = {'host':host, 'message':xmlString};
	var response;
	jQuery.isPlainObject(message);
	$.post('/socket', message, function(data) {
		setVars(xmlToObject(data));
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
	var returnString = '<?xml version="1.0" encoding="UTF-8"?>';
	for(var key in arrayXml){
		returnString = returnString + "<" + key + ">" + arrayXml[key] + "</" + key + ">";
	};
	return returnString;
}

function arrayToObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    if (arr[i] !== undefined) rv[i] = arr[i];
  return rv;
}

function setVars(varObject) {
	console.log(varObject);
	vars = varObject;
}

function startMonitoring(){
	console.log("startMonitoring called!");
	var message = fetchSettings();
	message['close'] = false;
	sendMessage(message, returnMonitoring);
}

function returnMonitoring(){
	if(stopNow){
		stopNow = false;
		console.log("stopping");
	}
	else
		startMonitoring();
}

function stopMonitoring(){
	stopNow = true;
}

////////////////////////////////
////////INDEX FUNCTIONS/////////
////////////////////////////////

var showIndex = function(){
	var $mainContent = $('#mainContent');
	$mainContent.empty();
	$mainContent.html(spinner);
	$.post('/', function(data){
		$mainContent.empty();
		$mainContent.html(data);
		//manipulate URL
		history.pushState(stateObject, "Automated Turret", '/');
		lastPage = currentPage;
		currentPage = "Index";
		indexInit();
	});
}

var indexInit = function() {
	showSettings($('.settingsContainer'));
	showSettingsForm($('#settingsForm'));
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


	testArray = ['.05', '.1', '.1', '.1', '.2', '.2', '.1', '.1'];
	testArray2 = ['.2', '.25', '.5', '.7', '.9', '.8', '.5', '.3'];
	updateInfrared(testArray);

	new Switchery($('.js-switch'));
};




////////////////////////////////////////////////
/////////////DEBUG FUNCTIONS////////////////////
////////////////////////////////////////////////


var showDebug = function() {
	var $mainContent = $('#mainContent');
	$mainContent.empty();
	$mainContent.html(spinner);
	$.post('/debug', function(data){
		//empty main container
		$mainContent.empty();
		//fill with debug content
		$mainContent.html(data);
		//manipulate url
		history.pushState(stateObject, "Automated Turret - Debug", '/debug');
		lastPage = currentPage;
		currentPage = "Debug";
		debugInit();
	});
}

var debugInit = function() {
	showSettings($('.settingsContainer'));
	showSettingsForm($('#settingsForm'));
	$('.homeTrigger').parent().removeClass('active');
	$('.debugTrigger').parent().addClass('active');

	$('#settingsModal').on('hide.bs.modal', function() {
		$('#settingsButton').removeClass('active');
	});
	$('#settingsModal').on('show.bs.modal', function() {
		$('#settingsButton').addClass('active');
	});
	//settings modal functions
	$('#settingsModal').on('hide.bs.modal', function() {
		$('[data-toggle="modal"]').parent().removeClass('active');
	});
	$('#settingsModal').on('show.bs.modal', function() {
		$('[data-toggle="modal"]').parent().addClass('active');
	});

	//switches in settings modal
	new Switchery($('.js-switch'));

	//knob settings/update function
	$('.dial').knob({
		'min': 0,
		'max': sweepRange,
		'angleArc': sweepRange,
		'angleOffset': 270,
		'fgColor': "#69bd7d",
		'draw' : function() {
			$(this.i).val(this.cv + '°');
	  	},
	  	'release' : function(v) {
	  		updateServo(v);
	  	}
	});
	$('#shoot').click(function(){
		$('#magazineProgress').progressBar('decrement');
		addToLog("shot fired");
	});
	$('#refresh').click(function(){	//this won't be necessary, I think
		$('#magazineProgress').progressBar('max');
		addToLog("refreshing status");
		addToLog("ammo at max");
	});

	function addToLog(message) {
		var $logContainer = $('div.logPanel .panel-body');
		var height = $logContainer.prop('scrollHeight');
		$logContainer.append('<br>'+message);
		$logContainer.animate({scrollTop: height}, 100);
	}

	function updateServo(angle) {
		servoAngle = angle;
		updateSettings();
		addToLog("servo updated to "+angle+" degrees");
	}
}
