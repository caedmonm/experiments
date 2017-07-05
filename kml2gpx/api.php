<?
function get_array($url){
	$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => $url,
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_SSL_VERIFYHOST => false,
		  CURLOPT_SSL_VERIFYPEER => false,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
		    "cache-control: no-cache",
		    "postman-token: 6064d355-eab4-802f-536d-7a1ba175d992"
		  ),
		));

		$response = curl_exec($curl);
		$xml = simplexml_load_string($response);
		$json = json_encode($xml);
		return json_decode($json,true);
}
switch ($_GET['action']) {
	case 'fetch':
		$urls = explode(",", $_GET['urls']);
		$track = [];
		foreach ($urls as $url) {
			if($url){
				$a = get_array($url);
				$track = array_merge($track,$a['Document']['Folder']['Placemark']);
			}
		}

		foreach ($track as $p) {
			$start = strtotime($p['TimeSpan']['begin']);
			$end = strtotime($p['TimeSpan']['end']);
			$duration = $end - $start;
			$inc = $duration / count($points);

			$points = explode(" ",$p['LineString']['coordinates']);
			$i = 0;
			foreach ($points as $v) {
				$coords = explode(",", $v);
				$time = date("Y-m-d\TH:i:s\Z",($start + ($inc*$i)));
				$point_data[] = [$coords[0], $coords[1], $coords[2], $time];
				++$i;
			}
		}

		$out .= '<?xml version="1.0" encoding="UTF-8"?>
				<gpx version="1.1" creator="GPS Visualizer http://www.gpsvisualizer.com/" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
				<trk>
				<name>track</name>
				<trkseg>';

		foreach ($point_data as $p) {
			$out .= '<trkpt lat="'.$p[1].'" lon="'.$p[0].'">
				      <ele>'.$p[2].'</ele>
				      <time>'.$p[3].'</time>
				    </trkpt>';
		}

		$out .= '</trkseg>
				</trk>
				</gpx>';

		header("Content-type: text/xml");
		echo $out;
		$out = '';
	break;
	case 'teams':
		// https://www.redbullxalps.com/tracking-3d

	break;
	default:
		# code...
		break;
}

if($out){
	echo json_encode($out);
}