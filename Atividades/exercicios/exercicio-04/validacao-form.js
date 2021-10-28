function validar(campo){

    let n = campo.value;

    if(n.length == 0){
        window.alert("Preencha todos os campos corretamente!");
        campo.value = "";
        campo.focus();
        return false;
    }

    return true;
}

function Classe(nome, idade, endereco){
    this.nome = nome;
    this.idade = idade;
    this.endereco = endereco;
}

function carregarDadosDoForm() {

    let nome = document.frmDados.nome;
    let idade = document.frmDados.idade;
    let endereco = document.frmDados.endereco;

    if(validar(nome) && validar(idade) && validar(endereco)){

        const classe = new Classe(nome, idade, endereco);
        console.log(classe);

        let n = nome;
        let i = idade;
        let e = endereco;

    }

}


