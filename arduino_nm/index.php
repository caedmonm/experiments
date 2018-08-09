<?
if(isset($_POST['val'])){
    $file = 'pos.txt';
    $handle = fopen($file, 'w') or die('Cannot open file:  '.$file);
    $data = intval($_POST['val']);
    fwrite($handle, $data);
}
?>
<html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    </head>
    <body>
        <input type="number" value="90" style="border-radius:4px; border:none; background-color: #eee; padding: 10px 20px" />
        <script>

        </script>
    </body>
</html>