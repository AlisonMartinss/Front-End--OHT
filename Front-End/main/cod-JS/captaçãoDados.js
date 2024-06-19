/*import {situa} from "../cod-JS/interação-simples.js";

const form = document.querySelector('.form');

const variavel = situa;



function reqPOST (url,body) {
    console.log(body)
    let request = new XMLHttpRequest()
    request.open("POST",url,true)


    request.setRequestHeader("Content-type","application/json")
    request.send(JSON.stringify(body))

    request.onload = function () {
        console.log(this.responseText)
    }

    return request.responseText
}



form.addEventListener("submit",() => {

    event.preventDefault()

    let url = "http://localhost:8080/Sedex"

    let remetentee = document.querySelector('.input_remetente').value;
    let recadoo = document.querySelector('.input_recado').value;

    const body = {

        "remetente": remetentee,
        "recado": recadoo

    }

    reqPOST(url,body)


});

   


*/
