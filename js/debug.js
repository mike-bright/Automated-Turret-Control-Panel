 $(document).ready(function() {
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

	$('#magazineProgress').progressBar('max');
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

function addToLog(message) {
	var $logContainer = $('div.logPanel .panel-body');
	var height = $logContainer.prop('scrollHeight');
	$logContainer.append('<br>'+message);
	$logContainer.animate({scrollTop: height}, 100);
}

function updateServo(angle) {
	addToLog("servo updated to "+angle+" degrees");
}