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