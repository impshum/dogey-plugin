(function($) {

    $.fn.dogey = function(options) {

        //Yo' defaults
        var defaults = {  
            enterOn: 'click', //timer, konami-code, click
            delayTime: 5000 //time before dogey attacks on timer mode
            };  
        
        //Extend those options
        var options = $.extend(defaults, options); 
	
        return this.each(function() {

			var _this = $(this);
			var audioSupported = false;
			//Stupid Browser Checking which should be in jQuery Support
			if ($.browser.mozilla && $.browser.version.substr(0, 5) >= "1.9.2" || $.browser.webkit) { 
				audioSupported = true;
			}
			
			//dogey Vars
			var dogeyImageMarkup = '<img id="eldogey" style="display: none" src="dogey.png" />'
			var dogeyAudioMarkup = '<audio id="eldogeyShriek" preload="auto"><source src="dogey-sound.mp3" /><source src="dogey-sound.ogg" /></audio>';	
			var locked = false;
			
			//Append dogey and Style
			$('body').append(dogeyImageMarkup);
 			if(audioSupported) { $('body').append(dogeyAudioMarkup); }
			var dogey = $('#eldogey').css({
				"position":"fixed",
				"bottom": "-700px",
				"right" : "0",
				"display" : "block"
			})
			
			// Animating Code
			function init() {
				locked = true;
			
				//Sound Hilarity
				if(audioSupported) { 
					function playSound() {
						document.getElementById('eldogeyShriek').play();
					}
					playSound();
				}
								
				// Movement Hilarity	
				dogey.animate({
					"bottom" : "0"
				}, function() { 			
					$(this).animate({
						"bottom" : "-30px"
					}, 100, function() {
						var offset = (($(this).position().left)+400);
						$(this).delay(300).animate({
							"right" : offset
						}, 2200, function() {
							dogey = $('#eldogey').css({
								"bottom": "-700px",
								"right" : "0"
							})
							locked = false;
						})
					});
				});
			}
			
			
			//Determine Entrance
			if(options.enterOn == 'timer') {
				setTimeout(init, options.delayTime);
			} else if(options.enterOn == 'click') {
				_this.bind('click', function(e) {
					e.preventDefault();
					if(!locked) {
						init();
					}
				})
			} else if(options.enterOn == 'konami-code'){
			    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
			    $(window).bind("keydown.dogeyz", function(e){
			        kkeys.push( e.keyCode );
			        if ( kkeys.toString().indexOf( konami ) >= 0 ) {
			        	init();
			        	$(window).unbind('keydown.dogeyz');
			        }
			    }, true);
	
			}
			
        });//each call
    }//orbit plugin call
})(jQuery);

