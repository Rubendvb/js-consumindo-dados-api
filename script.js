// Manipulando formulário
let cidade = document.getElementById("cidade");
let logradouro = document.getElementById("endereco");
let bairro = document.getElementById("bairro");
let estado = document.getElementById("estado");

async function buscaCEP(cep) {
  let mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";
  try {
    let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let consultaCEPConvertida = await consultaCEP.json();

    if (consultaCEPConvertida.erro) {
      throw Error("CEP não encontrado");
    }

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    bairro.value = consultaCEPConvertida.bairro;
    estado.value = consultaCEPConvertida.uf;

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (error) {
    cidade.value = "";
    logradouro.value = "";
    bairro.value = "";
    estado.value = "";
    mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente</p>`;
    console.log(error);
  }
}

let cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaCEP(cep.value));

//--------------------------------------------------------------------------------

// Fazendo consulta de varios ceps
// async function buscaCEP(cep) {
//   try {
//     let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
//     let consultaCEPConvertida = await consultaCEP.json();

//     if (consultaCEPConvertida.erro) {
//       throw Error("CEP não encontrado");
//     }
//     console.log(consultaCEPConvertida);
//     return consultaCEPConvertida;
//   } catch (error) {
//     console.log(error);
//   }
// }

// let ceps = ["01001000", "01001001"];
// let conjuntoCeps = ceps.map((valores) => buscaCEP(valores));
// Promise.all(conjuntoCeps).then((res) => console.log(res));

//-----------------------------------------------------------------------------------

// let consultaCEP = fetch("https://viacep.com.br/ws/01001000/json/")
//   .then((res) => res.json())
//   .then((res) => {
//     if (res.erro) {
//       throw Error("Este cep não existe");
//     } else {
//       console.log(res);
//     }
//   })
//   .catch((erro) => console.log(erro))
//   .finally((mensagem) => console.log("Processo concluído"));

// console.log(consultaCEP);
