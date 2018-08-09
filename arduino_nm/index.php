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
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1" />
        <style>
            body{
                text-align: center;
            }
            #slider{
                margin: 10px auto 0 auto;
                max-width: 160px;
            }
            #pos{
                width:160px;
                border-radius:4px; 
                border:none; 
                background-color: #eee; 
                font-size:18px;
                padding: 40px;
                outline: none;
            }
            .change{
                width:80px;
                height:80px;
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
        <input id="pos" type="number" value="90" max="180" min="0" />
        <div id="slider"></div>
        <p>
        <button data-change="-10" class="change">-</button>
        <button data-change="10" class="change">+</button>
        </p>
        <script>
            var currentPos = 90;
            function set(val){
                val = Number(val);
                if(val<0){
                    val = 0;
                }
                if(val>180){
                    val = 180;
                }
                if(val!=Number($("#pos").val())){
                    $("#pos").val(val);
                }

                currentPos = val;

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
                var v = Number($("#pos").val()) + Number($(this).data("change"));
                $("#pos").val(v);
                set(v);
            });
            $("#slider").slider({
                max:180,
                min:0,
                value: currentPos,
                slide: function(e,ui){
                    set(ui.value);
                }
            });
        </script>
    </body>
</html>