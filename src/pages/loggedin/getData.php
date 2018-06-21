<?php

	include('Airtable.php');
	include('Request.php');
	include('Response.php');

	use \TANIOS\Airtable\Airtable;
	$airtable = new Airtable(array(
	    'api_key' => 'keyVRIEvyfgLfQkdw',
	    'base'    => 'appVD3EB3t3Cy0Tm2'
	));

	$request = $airtable->getContent( 'Product' );

	do {
	    $response = $request->getResponse();
	    var_dump( $response[ 'records' ] );
	}
	while( $request = $response->next() );

	print_r($request);

?>
