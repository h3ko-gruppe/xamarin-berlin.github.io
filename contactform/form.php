<?php
	 error_reporting(-1);
	// ======= Konfiguration:
	if(isset($_POST)){
		$mailSubject = $_POST["_subject"];
		$mailFrom = $_POST["name"] . " [" . $_POST["email"] . "]";
		$message = $_POST["message"];
		$mailTo = "post@popp-media.de";
		$returnPage = $_POST["_redirect"] . "?contact=success";
		$returnErrorPage = $_POST["_redirect"] . "?contact=error";
	}
	 
	
	
	
	$mailText = "Von: " . $mailFrom . "\n";
	$mailText .= "Nachricht:\n" . $message;
	
	 
		 
	// ======= Korrekturen vor dem Mailversand 
	 
	// Wenn PHP "Magic Quotes" vor Apostrophzeichen einfügt:
	 if(get_magic_quotes_gpc()) {
	     // eventuell eingefügte Backslashes entfernen
	     $mailtext = stripslashes($mailtext);
	 }
	 
	// ======= Mailversand
	 
	// Mail versenden und Versanderfolg merken
	$mailSent = @mail($mailTo, $mailSubject, $mailText);
	 
	// ======= Return-Seite an den Browser senden
	 
	// Wenn der Mailversand erfolgreich war:
	if($mailSent == TRUE) {
	   // Seite "Formular verarbeitet" senden:
	   header("Location: " . $returnErrorPage);
	}
	// Wenn die Mail nicht versendet werden konnte:
	else {
	   // Seite "Fehler aufgetreten" senden:
	   header("Location: " . $returnErrorPage);
	}
	 
	// ======= Ende
	 
	exit();
 
?>