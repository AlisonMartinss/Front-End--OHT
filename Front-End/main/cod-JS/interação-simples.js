


const trocar_back = document.querySelector('.trocar-fundo');
const back_op = document.querySelector('.trocar-fundo-op');
const input = document.querySelector('.input_remetente');
const cadastro = document.querySelector("[data-cadastro]");
const usuario = document.querySelector("[data-usuario]");
const senha = document.querySelector("[data-senha]");
const submit = document.querySelector('submit');
const cadastro_tl1 = document.querySelector("[data-cadainicial]");


const escuro_boton = document.querySelector('.b_ce');
const claro_boton = document.querySelector('.b_cla');


const login =  document.querySelector('.title_login')


const body = document.querySelector('.body');
const text = document.querySelector('.text-botao');


let contador_fundo = 0;
let nbackgraund;






/* -=-=-=-=-=-=-=-=- TROCAR COR DE DUNFO DA PAGINA -=-=-=-=-=-=-=-=- */






trocar_back.addEventListener('click',() =>{
    if (contador_fundo == 0){
        back_op.classList.add('active');
        contador_fundo = 1;


        
    } 
    else {
        back_op.classList.remove('active');
        contador_fundo = 0;
        
    }

});

async function bacgraund() {
if (localStorage.getItem("NbackGround") == 1){
    body.classList.add('tema_escuro');
}

else {
    body.classList.remove('tema_escuro');
}
    
};

escuro_boton.addEventListener('click',() =>{
    
nbackgraund = 1;
localStorage.setItem("NbackGround",nbackgraund);
bacgraund();

});

claro_boton.addEventListener('click',() =>{

nbackgraund = 0;
localStorage.setItem("NbackGround",nbackgraund);
bacgraund();

});

bacgraund();





/* ================================== */



/*cadastro.addEventListener('click',() =>{  

    if (contador02 === 0 ){

    login.innerHTML = `Cadastro`;
    cadastro.innerHTML = `login`;
    usuario.innerHTML = `Crie o seu usuário`;
    senha.innerHTML = `Crie sua senha`;
    

    contador02 = 1;
    situa = 1;

    console.log("Passei pelo cadastro");
    console.log("Clicou em Cadastro: "+ situa);

    }

    else if (contador02 === 1){

        login.innerHTML = `Login`;
        cadastro.innerHTML = `Cadastro`;
        usuario.innerHTML = `Usuário`;
        senha.innerHTML = `Senha`;
        

        contador02 = 0;
        situa = 0;
        console.log("Passei pelo Login")
        console.log("Clicou em Login: "+ situa);
    }


  
});


export {situa};

*/