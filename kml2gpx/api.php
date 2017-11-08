<?
function get_array($url){
	$response = file_get_contents($url);
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

		if(!$response){
			$response = file_get_contents($url);
		}

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
				if(is_array($a['Document']['Folder']['Placemark'])){
					$track = array_merge($track,$a['Document']['Folder']['Placemark']);
				}
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

		header("Content-type: text/gpx");
		echo $out;
		$out = '';
	break;
	case 'list_all_links':
		$a = get_array("http://www.redbullxalps.com/tracking-3d")["Document"]["NetworkLink"];
		$teams = [];
		$track_users = ["FRA4","NZL","HUN","NLD","GER2","FRA3"];
		$track_users = ["SUI1","FRA2"];
		$track_users = "all";
		foreach ($a as $t) {
			if(in_array(substr($t['name'],0,4), $track_users) || in_array(substr($t['name'],0,3), $track_users) || $track_users == "all"){
				$team = ["name"=>$t['name']];
				$days = get_array($t['Link']['href'])["Document"]["NetworkLink"];
				$team['all_data'] = "/kml2gpx/gpx/".$t['name']."-all-tracks.gpx?action=fetch&urls=";
				foreach ($days as $d) {
					$day = get_array($d['Link']['href'])["Document"]["NetworkLink"];
					$day_data = ["name" => $d['name']];

					foreach ($day as $time) {
						if($time['name']=="06:00 - 12:00" || $time['name']=="12:00 - 18:00"){
							$day_data[$time['name']] = $time['Link']['href'];
						}
						$team['all_data'] .= $time['Link']['href'].",";
					}
					$day_data['gpx'] = "/kml2gpx/gpx/".$t['name'].".gpx?action=fetch&urls=".$day_data['06:00 - 12:00'].",".$day_data['12:00 - 18:00'];

					$team['days'][] = $day_data;
				}
				$team['all_data'] = substr($team['all_data'], 0, -1);
				$teams[] = $team;
			}
		}
		echo json_encode($teams);

	break;
	default:
		# code...
		break;
}

if($out){
	echo json_encode($out);
}