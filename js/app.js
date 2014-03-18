////global vars/////
var stateObject,
	lastPage = null,
	spinner = "<img src='images/spiffygif.com.gif' class='center-block spinner' alt='Spinner'>";

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

///////jquery method for progress bars//////
(function( $ ){

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
	for (var i = 0; i < sensorData.length; i++) {
		// for (var j = 0; j < sensorData[0].length; j++) {
			output += "<td magnitude='"+sensorData[i]+"'></td>";
		// }
	}
		output += "</tr>";
	$table.empty();
	$table.html(output);
	$('table.infraredArray tr td').each(function() {
		var magnitude = Math.round(255-($(this).attr('magnitude')*255));
		$(this).css('background-color', 'rgb(255, '+magnitude+', '+magnitude+')');
	});
}

function updateSettings(){
	var $form = $('#settingsForm');
	var $formData = $form.serialize();
	sweepRange = $('#sweepRange').val();
	$.post($form.attr('action'), $formData, function(data) {
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

////////index functions/////////
var showIndex = function(){
	var $mainContent = $('#mainContent');
	$mainContent.empty();
	$mainContent.html(spinner);
	$.post('/', function(data){
		$mainContent.empty();
		$mainContent.html(data);
		history.pushState(stateObject, "Automated Turret", '/');
		lastPage = currentPage;
		currentPage = "Index";
		indexInit();
	});
}

var indexInit = function() {
	showSettings($('.settingsContainer'));
	showSettingsForm($('#settingsForm'));
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

/////////////debug functions////////////////////
var showDebug = function() {
	var $mainContent = $('#mainContent');
	$mainContent.empty();
	$mainContent.html(spinner);
	$.post('/debug', function(data){
		$mainContent.empty();
		$mainContent.html(data);
		history.pushState(stateObject, "Automated Turret - Debug", '/debug');
		lastPage = currentPage;
		currentPage = "Debug";
		debugInit();
	});
}

var debugInit = function() {
	showSettings($('.settingsContainer'));
	showSettingsForm($('#settingsForm'));
	$('.debugTrigger').parent().addClass('active');

	$('#settingsModal').on('hide.bs.modal', function() {
		$('#settingsButton').removeClass('active');
	});
	$('#settingsModal').on('show.bs.modal', function() {
		$('#settingsButton').addClass('active');
	});
	new Switchery($('.js-switch'));

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
	$('#refresh').click(function(){
		$('#magazineProgress').progressBar('max');
		addToLog("refreshing status");
		addToLog("ammo at max");
	});
	$('#settingsModal').on('hide.bs.modal', function() {
		$('[data-toggle="modal"]').parent().removeClass('active');
	});
	$('#settingsModal').on('show.bs.modal', function() {
		$('[data-toggle="modal"]').parent().addClass('active');
	});

	function addToLog(message) {
		var $logContainer = $('div.logPanel .panel-body');
		var height = $logContainer.prop('scrollHeight');
		$logContainer.append('<br>'+message);
		$logContainer.animate({scrollTop: height}, 100);
	}

	function updateServo(angle) {
		addToLog("servo updated to "+angle+" degrees");
	}
}