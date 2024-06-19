const formCreate = document.querySelector("[data-subG]");

/* Algo importatne a pontuar é que o evento de submissão vem da tag "form"*/ 


formCreate.addEventListener("submit",(evento) => {

    evento.preventDefault();

    let CPF = document.querySelector("[data-user]").value;
    let PASS = document.querySelector("[data-pass]").value;
    let CEP = document.querySelector("[data-cep]").value;


    CreateUser(CPF,PASS,CEP);

});

/*  CRIAR USUARIO  */

async function CreateUser(CPF,pass,cep) {

    const conexao = await fetch("http://localhost:8080/login/CreateUser", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
           
                "CPF":CPF,
                "senha":pass,
                "CEP":cep,
                
        })

    });

    if (!conexao.ok) {
        throw new Error("Não foi possivel criar Usuario")
    }
    const conexaoConvertida = conexao.json();
    

    return conexaoConvertida;
}


    