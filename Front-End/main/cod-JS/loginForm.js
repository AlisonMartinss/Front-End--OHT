


const formLogin = document.querySelector("[data-subL]");
const alert02 = document.querySelector("[data-alert]");



localStorage.setItem("numeroPag",1);
localStorage.setItem("option",2);

sessionStorage.setItem("alert",false);


/* -=-=-=-=-=-=-=-=-=- EXPOSIÇÕES INICIAIS -=-=-=-=-=-=-=-=-=- */


/* -=-=-=-=-=-=-=-=-=-=- CAPTURA INFO DO USUARIO -=-=-=-=-=-=-=-=-=-=- */

formLogin.addEventListener("submit",(evento) => {

    evento.preventDefault();
    
    let cpf = document.querySelector("[data-userLog]").value;
    let pass = document.querySelector("[data-passLog]").value;
    
    
    LoginUser(cpf,pass);
    
    
});

/* -=-=-=-=-=-=-=-=- LOGIN DO USUARIO -=-=-=-=-=-=-=-=- */


async function LoginUser(cpf,pass) {

    let indicador = false;


    const conexao = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
           
                "CPF":cpf,
                "senha":pass       
        })

    });

    if (!conexao.ok) {
        alert02.classList.add('active');
        alert02.appendChild(constroiAlert());
    }

    const conexaoConvertida = await conexao.json();
    const token = conexaoConvertida.tokenOK; // Extraia o token da resposta
    console.log("TOKEN RECEBIDO:", token); // Log do token

    localStorage.setItem("CPF",cpf);
    localStorage.setItem("Token",token);

    window.location.href = "http://127.0.0.1:5501/pages/Home.html";


}

/* CONTRUINDO ALERTA */

function constroiAlert() {
    const alerta01 = document.createElement("p");
    alerta01.className = "alert_texto";
    alerta01.innerHTML = 

    `Usuario ou senha incorretos !`

   return alerta01;

}



/*



 */

