<!DOCTYPE html>
<html>
<head>
	<title></title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>
	<input class="url" />
	<input class="url" />
	<input class="url" />
	<button id="go">go</button>
	<div id="output"></div>

	<script type="text/javascript">
		
		
		$(document).on("click","#go",function(){
			var urls = '';
			$(".url").each(function(){
				if($(this).val()){
					urls+=$(this).val()+",";
				}
			});
			var finalurl = "api.php?action=fetch&urls="+urls;
			$("#output").html("<a href='"+finalurl+"'>"+finalurl+"</a>");

			// fetch_data(urls);
		});

		function fetch_data(urls){
			$.ajax({
				url: "api.php?action=fetch&urls="+urls,
				type: "GET",
				dataType: "json"
			}).done(function(data){
				console.log(data);
			});
		}

		function list_all_links(){
			$.ajax({
				url: "api.php?action=list_all_links",
				type: "GET",
				dataType: "json"
			}).done(function(data){
				$("#output").empty();
				var out;
				for (var i = 0; i < data.length; i++) {
					out += "<div>";
					out += "<h3><b>"+data[i].name+"</b></h3>";
					for (var j = 0; j < data[i].days.length; j++) {
						out += "<p><b>"+data[i].days[j].name+"</b><br />";
						out += "<a href='"+data[i].days[j].gpx+"'>download gpx</a><p>";
					}
					out += "<a href='"+data[i].all_data+"'>download full gpx track</a><p>";
					out += "</div>";
				}
				$("#output").html(out);
			});
		}

		list_all_links();

	</script>


</body>
</html>