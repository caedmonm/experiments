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
	<div id="finalurl"></div>

	<script type="text/javascript">
		
		
		$(document).on("click","#go",function(){
			var urls = '';
			$(".url").each(function(){
				if($(this).val()){
					urls+=$(this).val()+",";
				}
			});
			var finalurl = "api.php?action=fetch&urls="+urls;
			$("#finalurl").html("<a href='"+finalurl+"'>"+finalurl+"</a>");

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

	</script>


</body>
</html>