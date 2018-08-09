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
        <style>
            .change{
                width:40px;
                height:40px;
                line-height: 1;
                text-align: center;
                border:none;
                border-radius: 10px;
                background-color: #008888;
                color: white;
                font-size: 16px;
                font-weight: bold;
                outline: none;
                cursor:pointer;
            }
        </style>
    </head>
    <body>
        <input id="pos" type="number" value="90" style="width:84px;border-radius:4px; border:none; background-color: #eee; padding: 10px 20px" />
        <p>
        <button data-change="-10" class="change">-</button>
        <button data-change="10" class="change">+</button>
        </p>
        <script>
            function set(val){
                $.post("./index.php",{pos:val},function(d){
                    console.log('set to:',d);
                });
            }
            $(document).on("change","#pos",function(){
                set($(this).val());
            });
            $(document).on("keyup","#pos",function(){
                set($(this).val());
            });
            $(document).on("click",".change",function(){
                $("#pos").val(
                    Number($("#pos").val()) + Number($(this).data("change"))
                );
            });
        </script>
    </body>
</html>