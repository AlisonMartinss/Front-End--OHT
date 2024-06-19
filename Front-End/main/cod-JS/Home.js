const lista = document.querySelector("[data-multas ]");
const infomais =document.querySelector('.b-infomais');
const nPagina = document.querySelector("[data-navegacao]");


const nextA = document.querySelector("[data-Bnav]");
const nextB = document.querySelector("[data-Anav]");

const indPag = document.querySelector("[data-indPage]");

const dadosMotorista = document.querySelector("[data-dadosMotorista]");
const b_filtrarMultas = document.querySelector("[data-filtraMultas]");
const filtro = document.querySelector('.form');

const radioButtons = document.querySelectorAll('input[name="option"]');


let  X = 1;

if (localStorage.getItem("numeroPag") > 1){  

    X = localStorage.getItem("numeroPag");
    pasta(localStorage.getItem("numeroPag"));

    indPag.textContent = localStorage.getItem("numeroPag");
    BuscaDados();

    
}

else {

    X = 1;

    localStorage.setItem("limitePag",1);
    localStorage.setItem("numeroPag",1);

    pasta(localStorage.getItem("numeroPag"));

    indPag.textContent = localStorage.getItem("numeroPag");
    BuscaDados();


}

/*  PASTA  */
async function pasta(nPag) {
    try {

        Read(nPag);
               
    } catch {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de Multas !</h2>`
    }}



async function Read(nPag) {
    try {

        const multasApi = (await listarMultas(localStorage.getItem("CPF"),localStorage.getItem("Token"),nPag)).data;


        multasApi.forEach(elemento => lista.appendChild(
        constroiCard(elemento.ocorrido, elemento.dataa, elemento.situacao, elemento.valor,elemento.ru)));

        return multasApi;
           
    } catch {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de Multas !</h2>`
    }}

/* =-=-=-=-=-=-=- LÓGICA DE NAVEGAÇÃO =-=-=-=-=-=-=- */



/* =-=-=-=-==--=-=-=-=-=- FILTRO =-=-=-=-==--=-=-=-=-=- */


radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        // Obtém o valor do radio button selecionado
        const selectedValue = document.querySelector('input[name="option"]:checked').value;
        localStorage.setItem("option",selectedValue);
        location.reload();
    
    })});





/* =-=-=-=-=-=-=- NEXT-PAGE =-=-=-=-=-=-=- */

async function navNextPage(nPag) {

    try{

        /*  OBTENDO NUMERO DE PAGINAS  */

        const numeroPaginas = (await listarMultas(localStorage.getItem("CPF"),localStorage.getItem("Token"),nPag)).totalPag;
        const numeroconvertido = parseInt(numeroPaginas);

        
        X = parseInt(X) + 1;
        
        if (X > numeroconvertido){

         X = parseInt(X) - 1; 
         alert("Não há mais multas a serem mostradas.")}
        else {

            if (localStorage.getItem("numeroPag") > X) {
    
                location.reload();}
    
            else {
    
                localStorage.removeItem("numeroPag");
                localStorage.setItem("numeroPag",X);
    
                location.reload(); 
            }}
    }
    catch{
        alert("Erro ao Navegar");
    }}


/* =-=-=-=-=-=-=- BACK-PAGE =-=-=-=-=-=-=- */

async function   navBacktPage(nPag) {

    try{

        /*  OBTENDO NUMERO DE PAGINAS  */

        const numeroPaginas = (await listarMultas(localStorage.getItem("CPF"),localStorage.getItem("Token"),nPag)).totalPag;
        const numeroconvertido = parseInt(numeroPaginas);

        
        X = parseInt(X) - 1;

        
        if (X < 1){

         X = parseInt(X) + 1; 
         alert("Não há mais multas a serem mostradas.")

        }

        else {

            if (localStorage.getItem("numeroPag") > X) {

                localStorage.removeItem("numeroPag");
                localStorage.setItem("numeroPag",X);
    
                location.reload();
                
            }
    
            else {

                location.reload(); 
            }}
    }
    catch{
        alert("Erro Ao Navegar");}}



 /* =-=-=-=-=-=-=- CAPTURA DE AÇÕES DE BOTOES =-=-=-=-=-=-=- */


let indFiltro = true;


nextB.addEventListener('click' , () => {

    navNextPage(localStorage.getItem("numeroPag"));

});


nextA.addEventListener('click' , () => {

    navBacktPage(localStorage.getItem("numeroPag"));

});

b_filtrarMultas.addEventListener('click',()=>{

    if(indFiltro == true){
    filtro.classList.add('active');
    indFiltro = false;}

    else {
        filtro.classList.remove('active');
        indFiltro = true;
    }

})




/*  BUSCA LISTA DE MULTAS  */

async function listarMultas(CPF,tk,pag) {

    const conexao = await fetch(`http://localhost:8080/principal/Read/${pag}/3/${localStorage.getItem("option")}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${tk}`
        },
        body: JSON.stringify({
           
                "CPF":CPF    
        })

    });

    if (!conexao.ok) {
        throw new Error("Não Foi Possivel Buscar Registros com esse CPF")
    }
    const conexaoConvertida = await conexao.json();

   

    // Capturar e imprimir todos os cabeçalhos para verificação
    /*conexao.headers.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });*/

    // Capturando o cabeçalho específico
    const customHeader = conexao.headers.get('Numero-de-Paginas');
    

    return {

        data:conexaoConvertida,
        totalPag:customHeader
    };
}


/*   CRIA CONTAINER MULTA   */

export default function constroiCard(ocorrido,dataa,situacao,valor,ru) {
    const multa = document.createElement("li");
    multa.className = "infoMultas-a";
    multa.innerHTML = 

    `<button class="button-saber"
    
    onclick="localStorage.setItem('Parametro', '${ru}');
    window.location.href='http://127.0.0.1:5501/pages/multa.html';">

        <div class="multas-a">
            <h5 class="topico" >Ocorrido: ${ocorrido}</h5>
            <h5 class="topico" >Data: ${dataa}</h5>
        </div>
        

        <div class="multas-a">
            <h5 class="topico" >Status: ${situacao}</h5>
            <h5 class="topico" >Valor: ${valor}</h5>
        </div>   

    </button>`

    return multa;
}





/* -=-=-=-=-=-=-=-=-=-=- CRIA INDENTIDADE DO USER -=-=-=-=-=-=-=-=-=-=- */



async function BuscaDados() {
    try {

        const dadosP = (await DadosUser(localStorage.getItem("CPF"),localStorage.getItem("Token")));


        dadosP.forEach(elemento => dadosMotorista.appendChild(
        constroiIndentidade(elemento.cpf, elemento.cep, elemento.logradouro, elemento.bairro,elemento.complemento,elemento.uf)));

        return dadosP;
           
    } catch {
        dadosMotorista.innerHTML = `<h2 class="CPF404">Não foi possível carregar Dados com esse CPF !</h2>`
    }}



async function DadosUser(CPF,tk) {

    const conexao = await fetch(`http://localhost:8080/principal/User`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${tk}`
        },
        body: JSON.stringify({
           
                "CPF":CPF    
        })

    });

    if (!conexao.ok) {
        throw new Error("Não Foi Possivel Buscar Registros com esse CPF")
    }
    const conexaoConvertida = await conexao.json();


    return conexaoConvertida;
}




    function constroiIndentidade(cpf,cep,logradouro,bairro,complemento,uf) {
    const indentidade = document.createElement("div");
    indentidade.className = "dados_moto_a";
    indentidade.innerHTML = 

    `
    <div class=indentidade>

        <h2 class="topicoA">CPF: ${cpf}</h2>

        <h2  class="topicoAB">Endereço:</h2>
 
        <div class="dados_moto_b">

            <h2 class="topicoA">CEP: ${cep}</h2>
            <h2 class="topicoA">Logradouro: ${logradouro}</h2>
            <h2 class="topicoA">Bairro: ${bairro}</h2>
            <h2 class="topicoA">Complemento: ${complemento}</h2>
            <h2 class="topicoA">UF: ${uf}</h2>
    
        </div>
        
    </div>`

       

    return indentidade;
}










