var tipodachave;
var valordachave;
var tipodeoperacao;
var valor = 0;
var valortemp = 0;

var valortotalenvio = 0;
var valortotalrecebimento = 0;
var saldofinal = 0;




function adicionaroperacao(){

    tipodachave = document.frmDados.tipochave;
    valordachave = document.frmDados.chavepix;
    tipodeoperacao = document.frmDados.operacao;
    valor = document.frmDados.valor;

    if (tipodeoperacao.value == 'recebimento'){
        valortemp = parseInt(valor.value);
        valortotalrecebimento = valortotalrecebimento + valortemp;
    } else if (tipodeoperacao.value == 'envio'){
        valortemp = parseInt(valor.value);
        valortotalenvio = valortotalenvio + valortemp;
    } else {
        console.log('Não preenchido');
    }

    saldofinal =  parseInt(valortotalrecebimento) - parseInt(valortotalenvio);

    console.log(saldofinal);
}

function finalizarCadastro() {

    document.frmResultados.totalenvio.value = valortotalenvio;
    document.frmResultados.totalrecebimento.value = valortotalrecebimento;
    document.frmResultados.saldofinal.value = saldofinal;


}

function apagarRegistros() {

    document.frmResultados.totalenvio.value = "";
    document.frmResultados.totalrecebimento.value = "";
    document.frmResultados.saldofinal.value = "";
    document.frmDados.valor.value = "";
    document.frmDados.data.value = "";
    document.frmDados.chavepix.value = "";

    valor = 0;
    valortemp = 0;
    valortotalenvio = 0;
    valortotalrecebimento = 0;
    saldofinal = 0;

}
