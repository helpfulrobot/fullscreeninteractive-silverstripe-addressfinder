;(function($) {
	$(document).ready(function () {
		$(".address_finder").each(function (i, elem) {
			var widget, 
				key = $(elem).data('api-key'),
				address = $(elem).find('.address_finder_address'),
				input = $(elem).find("input").first(),
				manual = $(elem).find('.manual_address'),
				toggle = $(elem).find('.toggle_manual_address');

			var useManual = manual.find("input[name*=ManualAddress]"),
				field = address.find('input').get(0);

			/* update ui with javascript */
			toggle.show();
			address.show();

			if(!useManual.val()) {
				manual.hide();
			}

			/* create widget */
			widget = new AddressFinder.Widget(field, key, {
				show_locations: false
			});

			/* updates manual fields and hidden metadata */
			widget.on("result:select", function (value, item) {
				/* populate postal line fields */
				for(var i = 1; i <= 6; i++) {
					manual.find("input[name*=PostalLine" + i +"]").val(item["postal_line_"+ i] || '');
				}

				manual.find("input[name*=Suburb]").val(item.suburb || '');
				manual.find("input[name*=City]").val(item.city || '');
				manual.find("input[name*=Postcode]").val(item.postcode || '');
				manual.find("input[name*=Longitude]").val(item.x || '');
				manual.find("input[name*=Latitude]").val(item.y || '');
			});

			/* click handler to toggle manual div */
			toggle.on('click', function(e) {
				e.preventDefault();

				manual.toggle('slow');

				// if the manual address is visible then add a hidden flag so
				if(manual.is(":visible")) {
					useManual.val('1');
				}
				else {
					useManual.val('0');
				}
			});

			/* on manually changing of the fields then we have to clear x/y */
			manual.on('keydown', 'input', function(e) {
				manual.find("input[name*=Longitude]").val('');
				manual.find("input[name*=Latitude]").val('');
			});

			/* focusing back on the address dropdown should hide the manual */
			input.on('focus', function(e) {
				manual.slideUp();
			});
		});
	});
})(jQuery);