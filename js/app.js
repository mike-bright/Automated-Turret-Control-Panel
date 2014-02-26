
$(document).ready(function() {
	if(typeof notifications !== "undefined")
		setupNotifications();

	showSettings($('.settingsContainer'));
	showSettingsForm($('#settingsForm'));

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
		$('#settingsButton').removeClass('active');
	});
	$('#settingsModal').on('show.bs.modal', function() {
		$('#settingsButton').addClass('active');
	});
	testArray = ['.05', '.1', '.1', '.1', '.2', '.2', '.1', '.1'];
	testArray2 = ['.2', '.25', '.5', '.7', '.9', '.8', '.5', '.3'];
	updateInfrared(testArray);
});

// constants
var spinner = "<img src='images/spiffygif.com.gif' class='center-block' alt='Spinner'>";
////////////
function setupNotifications(){
	var next = getNotification(notifications);
	if(next){
		$('body').append('<div alert class="alert alert-info alert-dismissable fade in">\
			<a href="#" id="currNotification" class="close" data-dismiss="alert">&times;</a>\
			<span>'+next+'</span></div>');
		//note: find a better way to do the delay
		setTimeout(function(){
			$('#currNotification').trigger('click');
		}, 5000);
		setTimeout(function(){
			setupNotifications();
		}, 6000);
	}
}

function getNotification(notificationArray){
	var current = notificationArray.pop();
	if(typeof current !== undefined)
		return current;
	else
		return false;
}

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
	      	shootLoop(12);
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
	console.log($formData);
	$.post($form.attr('action'), $formData, function(data) {
		$('#settingsModal').find('[data-dismiss="modal"]').trigger('click');	//close modal
		showSettings($('.settingsContainer'));	//update settings display
		showSettingsForm($('#settingsForm'));	//update form data
	});

}

function showSettings($container){
	$container.empty();
	$container.html(spinner);

	$.post('/settings/get', null, function(data) {
		$container.empty();
		$container.html(data);
	});
}

function showSettingsForm($container){
	$container.empty();
	$container.html(spinner);

	$.post('/settings/form', null, function(data) {
		$container.empty();
		$container.html(data);
		$('input[type="checkbox"]').parent().addClass('half');
	});
}