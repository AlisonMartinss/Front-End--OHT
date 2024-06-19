const multa = document.querySelector("[data-main]");







async function Read() {
    try {

        const multasApi = await BuscaMulta(localStorage.getItem("Token"),localStorage.getItem("Parametro"));


        multasApi.forEach(elemento => multa.appendChild(
        constroiMulta(elemento.ocorrido, elemento.dataa, elemento.situacao, elemento.valor,elemento.ru,
            elemento.agente,elemento.endereco.cep,elemento.endereco.logradouro,elemento.endereco.bairro,
            elemento.endereco.complemento,elemento.endereco.uf)));

        return multasApi;
           
    } catch {
        multa.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de Multas !</h2>`
    }}




/* -=-=-=-=-=-= BUSCA MULTA -=-=-=-=-=-= */

async function BuscaMulta(tk,RU) {
    try {

        const conexao = await fetch(`http://localhost:8080/principal/Busca`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${tk}`
            },
            body: JSON.stringify({
               
                    "RU":RU    
            })
    
        });


        if (!conexao.ok) {
            throw new Error("Não Foi Possivel Buscar Registros com esse CPF")
        }

        const conexaoConvertida = await conexao.json();

        return conexaoConvertida;
           
    } catch {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a Multas !</h2>`
    }}

/* -=-=-=-=-=-= CRIA CONTAINER MULTA -=-=-=-=-=-= */

export default function constroiMulta(ocorrido,dataa,situacao,valor,ru,agente,cep,logradouro,bairro,complemento,uf) {
    const multa = document.createElement("div");
    multa.className = "principal";
    multa.innerHTML = 

    `<div class="principal-A">

            <h2 class="topico-titulo">Multa</h2>

            <h2 class="topico">Registro Unico (RU): ${ru}</h2>
            <h2 class="topico">Valor: ${valor}</h2>
            <h2 class="topico">Ocorrido: ${ocorrido}</h2>
            <h2 class="topico">Data: ${dataa}</h2>
            <h2 class="topico">Situação: ${situacao}</h2>
            <h2 class="topico">Agente: ${agente}</h2>

    </div>

    <div class="principal-B">

            <h2 class="topico-titulo">Endereço do ocorrido</h2>

            <h2 class="topico">CEP: ${cep}</h2>
            <h2 class="topico">Logradouro: ${logradouro}</h2>
            <h2 class="topico">Bairro: ${bairro}</h2>
            <h2 class="topico">Complemento: ${complemento}</h2>
            <h2 class="topico">UF: ${uf}</h2>

    </div>

    

    

      
`

    return multa;
}

Read();




