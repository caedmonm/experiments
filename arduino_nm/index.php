<?
if(isset($_POST['pos'])){
    $file = 'pos.txt';
    $handle = fopen($file, 'w') or die('Cannot open file:  '.$file);
    $position = intval($_POST['pos']);
    $data = json_encode(["position"=>$position]);
    fwrite($handle, $data);
    echo $data;
    exit;
}
?>
<html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    </head>
    <body>
        <input id="pos" type="number" value="90" style="border-radius:4px; border:none; background-color: #eee; padding: 10px 20px" />
        <script>
            $(document).on("change","#pos",function(){
                $.post("./index.php",{pos:$(this).val()},function(d){
                    console.log('set to:',d);
                });
            });
        </script>
    </body>
</html>