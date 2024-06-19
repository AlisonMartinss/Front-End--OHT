const form = document.querySelector("[data-form]");



form.addEventListener("submit",(evento) => {

    evento.preventDefault();

    let titulo = document.querySelector("[data-titulo]").value;
    let mensagem = document.querySelector("[data-mensagem]").value;

    

    Feedback(localStorage.getItem("CPF"),localStorage.getItem("Token"),titulo,mensagem);

    alert("Mensagem enviada com Sucesso !");
    

    window.location.href = "http://127.0.0.1:5501/pages/Home.html";
    
});


async function Feedback(CPF,tk,titulo,relatorio) {

    const conexao = await fetch(`http://localhost:8080/principal/Relatorio`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${tk}`
        },
        body: JSON.stringify({
           
                "CPF":CPF,
                "titulo":titulo,
                "relatorio":relatorio   
        })

    });

    if (!conexao.ok) {
        throw new Error("Não Foi Possivel Buscar Registros com esse CPF")
    }


    const conexaoConvertida = await conexao.json();
    return;
}