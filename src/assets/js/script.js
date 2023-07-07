function selectCarreta(){
  var carreta = document.getElementById('carreta');

  if(carreta.classList.contains('formCarreta')){
    carreta.classList.replace('formCarreta', 'show');
  }else{
    carreta.classList.replace('show', 'formCarreta');

  }


}

// Máscara para placa antiga (formato AAA-9999)
// Máscara para placa Mercosul (formato AAA9A99 ou AAA-9A99)
function mascaraPlaca(value) {
  var placaAntigaPattern = /^[a-zA-Z]{3}-\d{4}$/; // AAA-9999
  var placaMercosulPattern = /^[a-zA-Z]{3}[\d][a-zA-Z]{1}\d{2}$|^[a-zA-Z]{3}-[\d][a-zA-Z]{1}\d{2}$/; // AAA9A99 ou AAA-9A99
s
  if (placaAntigaPattern.test(value)) {
    return value.replace(/([a-zA-Z]{3})([0-9]{4})/, '$1-$2'); // formata como AAA-9999
  } else if (placaMercosulPattern.test(value)) {
    return value
      .replace(/([a-zA-Z]{3})(\d{1})([a-zA-Z]{1})(\d{2})/, '$1-$2$3$4') // formata como AAA-9A99
      .replace(/([a-zA-Z]{3})([a-zA-Z]{1})(\d{2})/, '$1-$2$3'); // formata como AAA9A99
  } else {
    return value;
  }
}


function addInput() {
  var novocar = document.getElementById('novaCarreta');

  novocar.classList.remove('newCarreta');



}



function createItem(){

}




















/*function cadCarreta(){
  var carreta = document.getElementById('carreta');

  if(carreta.classList.contains('formCarreta')){
    carreta.classList.replace('formCarreta', 'show');
  }else{
    carreta.classList.replace('show', 'formCarreta');

  }



}


function App(){
  var app = document.getElementById('app')

  if(  app.classList.contains('formApp')){
    app.classList.replace('formApp', 'showApp');

  }else{
    app.classList.replace('showApp', 'formApp');

  }

}*/
