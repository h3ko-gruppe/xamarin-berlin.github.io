/*
	Escape Velocity by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				alignment: 'center',
				detach: false
			});

		// Scrolly links.
			$('.scrolly-middle').scrolly({
				speed: 1000,
				anchor: 'middle'
			});

			$('.scrolly').scrolly({
				speed: 1000,
				offset: function() { return (skel.breakpoint('mobile').active ? 70 : 190); }
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

	});
	
	/* CONTACT FORM VALIDATION */
	$("#contactform #form_submit").click(function( event ) {
	  	event.preventDefault();
	});
	$("#contactform #form_submit").click(function(){
		var name = checkName();
		var mail = checkMail();
		var message = checkMessage();
		if (name == true && mail == true && message == true){
			$("#contactform").submit();			
		} else {
			var errorMessage = "Es gibt Fehler beim Ausfüllen des Kontaktformulars:\n";
			if (name != true){
				errorMessage += name + "\n";
			}
			if (mail != true){
				errorMessage += mail + "\n";
			}
			if (message != true){
				errorMessage += message + "\n";
			}
			alert(errorMessage);			
		}
	})
	
	function checkName(){
		if ($("#contact-name").val() == 0){
			return 'Bitte füllen Sie das Feld "Name" aus.';
		} else {
			return true;
		}
	}
	function checkMail(){
		if ($("#contact-email").val() == 0){
			return 'Bitte füllen Sie das Feld "Email" aus.';
		} else if( !isValidEmailAddress( $("#contact-email").val() ) ) { 
			return 'Bitte tragen Sie eine gültige Email-Adresse in das Feld "Email" ein.';
		} else {
			return true;
		}
	}
	function checkMessage(){
		if ($("#contact-message").val() == 0){
			return 'Bitte füllen Sie das Feld "Nachricht" aus.';
		} else {
			return true;
		}
	}
	function isValidEmailAddress(emailAddress) {
	    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	    return pattern.test(emailAddress);
	}
	
	/* SEND CONTACT FORM */
	$("#contactform").submit(function(){
		var subject = $("#contact-subject").val();		
		var url = "http://mailbot.dev.h3ko.de/api/Smtp?subject=" + subject + "&isHtmlBody=false&api-token=357f3abd4343420180513b5dddb737aa";
		var dataType = "text/plain";
		var contactName = $("#contact-name").val();
		var contactMail = $("#contact-email").val();
		var contactMessage = $("#contact-message").val();
		var data = "Name: " + contactName + "\nE-Mail: " + contactMail + "\nNachricht:\n" + contactMessage;
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: function(){
				$(".success_message").show();
				$("#overlay").fadeOut();
			},
			error: function(){
				$(".error_message").show();
				$("#overlay").fadeOut();
			},
			contentType: "text/plain"
		});
		$("#contact-name").val("");
		$("#contact-email").val("");
		$("#contact-message").val("");
		$("#overlay").fadeIn();
		return false;
	});

})(jQuery);