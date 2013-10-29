/*!
 * jQuery Smart Vimeo Embed
 * Original author: Warren L. Parsons
 * version: 1.0.0 (Tues, Oct. 29, 2013)
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

	var pluginName = "smartVimeoEmbed",
	defaults = {
		idSelectorName: 'vimeo-id',
		vimeoPatternUrl: 'http://vimeo.com/api/oembed.json?url=http://vimeo.com/',
		autoplay: true,
		width: 640
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

			$(this.element).each(function (i, e) {
				var id = $(e).data(options.idSelectorName);

				// only execute on non-vimeo images
				if (id && !/VIMEO/i.test($(e).attr('src'))) {

					// build Vimeo JSON URL
					var url = options.vimeoPatternUrl + id + '&autoplay=' + options.autoplay + '&width=' + options.width;

					// fetch video data from Vimeo
					$.getJSON(url, function(data){
						if (data) {

							// add wrapper for play icon positioning
							$(e).wrap('<div class="vimeo-wrapper" />');

							// swap placeholder image with video thumbnail
							$(e).attr('src', data.thumbnail_url);

							// add play icon and click event listener
							$(e).parent().addClass('play-icon').on('click', function(){
								var $this = $(this);

								// only append video once
								if ( !$this.find('iframe').length ) {

									// append video iframe and hide image
									$this.removeClass('play-icon').append(data.html).find('img').hide();
								}
							});
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
