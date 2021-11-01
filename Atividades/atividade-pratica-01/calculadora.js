$( function () {

    var n1;
    var n2;
    var opr;

    $("input[name=botao]").click(function(){
        $("#result").val($("#result").val() + $(this).val());
    });

    $("input[name=ce]").click(function(){
        $("#result").val('');
    });

    $("input[name=adicao]").click(function(){

        if($("#result").val() != ''){
            n1 = parseFloat($("#result").val());
            $("#result").val('');
            opr = "adicao";
            $("#opr").text($(this).val());

        } else {
            alert("Insira um valor!");
        }
    });

    $("input[name=subtracao]").click(function(){

        if($("#result").val() != ''){
            n1 = parseFloat($("#result").val());
            $("#result").val('');
            opr = "subtracao";
            $("#opr").text($(this).val());

        } else {
            alert("Insira um valor!");
        }
    });

    $("input[name=multiplicacao]").click(function(){

        if($("#result").val() != ''){
            n1 = parseFloat($("#result").val());
            $("#result").val('');
            opr = "multiplicacao";
            $("#opr").text($(this).val());

        } else {
            alert("Insira um valor!");
        }
    });

    $("input[name=divisao]").click(function(){

        if($("#result").val() != ''){
            n1 = parseFloat($("#result").val());
            $("#result").val('');
            opr = "divisao";
            $("#opr").text($(this).val());

        } else {
            alert("Insira um valor!");
        }
    });

    $("input[name=igual]").click(function(){

        if($("#result").val() != ''){

            n2 = parseFloat($("#result").val());

            if(opr == "adicao"){
                $("#result").val(n1 + n2);
            }

            else if(opr == "subtracao"){
                $("#result").val(n1 - n2);
            }

            else if(opr == "multiplicacao"){
                $("#result").val(n1 * n2);
            }

            else {
                if($("#result").val() != 0){
                    $("#result").val(n1 / n2);
                }
                else {alert("Não é possível realizar divisão por zero!");}
            }
            $("#opr").text('');
        } else {
            alert("Insira um valor!");
        }
        
    });



});


