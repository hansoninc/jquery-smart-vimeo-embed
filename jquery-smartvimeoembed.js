/*
 *	jQuery Smart Vimeo Embed - v1.1.1
 *	Author: Warren L. Parsons
 *	Company: Hanson, Inc.
 *
 *	Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {
	var count = 0;

	var pluginName = "smartVimeoEmbed",
	defaults = {
		idSelectorName: 'vimeo-id',
		vimeoPatternUrl: 'http://vimeo.com/api/oembed.json?url=http%3A%2F%2Fvimeo.com/',
		autoplay: true,
		width: 640,
		onComplete: function(){},
		onError: function(){}
	};

	function Plugin( element, options ) {
		this.element = element;
		this.options = $.extend( {}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		init: function() {
			var options = this.options;

			console.log(this);

			$(this.element).each(function (i, e) {
				var $e = $(e);
				var id = $e.data(options.idSelectorName);

				// only execute on non-vimeo images
				if (id && !/VIMEO/i.test($e.attr('src'))) {

					// build Vimeo JSON URL
					var url = options.vimeoPatternUrl + id + '&autoplay=' + options.autoplay + '&width=' + options.width + '&api=1' + '&player_id=' + id + '&callback=?';

					// fetch video data from Vimeo
					$.ajax({
						url: url,
						dataType: 'jsonp',
						success: function(data){
							$('#output').text(JSON.stringify(data));

							// add wrapper for play icon positioning
							$e.wrap('<div class="vimeo-wrapper" />');

							// swap placeholder image with video thumbnail
							$e.attr('src', data.thumbnail_url);

							// add play icon and click event listener
							$e.parent().prepend('<span class="play-icon"/>').on('click', function(){
								var $this = $(this);

								// only append video once
								if ( !$this.find('iframe').length ) {

									// append video iframe and hide poster
									// image and play icon
									$this.append(data.html).find('img, .play-icon').hide();

									var iframe = $('iframe');
									var player = $f(iframe);

									console.log(player);
									
									player.addEvent('ready', function() {
										player.addEvent('pause', onPause);
									});

									iframe.find('button').on('pause', function(){
										alert('test');
									});

									function onPause() {
										// video has been paused or has completed
										alert('weve been paused');
									}

								}

								if (options.onComplete && typeof(options.onComplete) === 'function') {
									options.onComplete.call(this);
								}
							});
						},
						error: function(errorSender, errorMsg){
							if (options.onError && typeof(options.onError) === 'function') {
								options.onError.call(this);
							}
						}
					});
				}
			});
		}
	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin( this, options ));
			}
		});
	};


})( jQuery, window, document );
