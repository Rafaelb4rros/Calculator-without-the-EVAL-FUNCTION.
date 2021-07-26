const tela = document.querySelector(".tela");
const buttonsEq = document.querySelectorAll("button");
const result = document.querySelector('[data-type="result"]');
const clearLast = document.querySelector('[data-type="cleanLast"]');
tela.value = 0;

OPSUM = false;
OPSUB = false;
OPMUL = false;
OPDIV = false;


function insert(number) {
if(tela.value == 0) {
    tela.value = "";
}
    tela.value += number;
    buttonsEq.forEach(button =>{
        button.addEventListener('click', (evt) => {
            validaOperacao(evt.target);
        })
    })
    var test = tela.value;
    if(test.charAt(0) === '+'
        ||test.charAt(0) === '-'
        ||test.charAt(0) === 'x'
        ||test.charAt(0) === '÷') {

        tela.value = 0;
    }
    
    for(var i = 0; i < test.length; i++) {
        if(test.charAt(i) === '+') {
          if(test.charAt(i +1) === '+') {
             
          }
        }
    }
    
    clearLast.addEventListener('click', clearLAst)
}
    function clearLAst() {
       let test = tela.value;

       tela.value = test.substring(0, test.length - 1)
    }

function validaOperacao(button) {
    const operacaoTipo = button.dataset.type;

    if(operators[operacaoTipo]) {
        operators[operacaoTipo](button);
    }
}

const operators = {
    buttonMinus:button => subtracao(button),
    buttonSUM:button => soma(button),
    buttonX:button => multiplicacao(button),
    buttonDivide:button => divisao(button),

    cleanAll:button => clearALL(button),
}

result.addEventListener('click', ()=>{
    var telaStr = document.querySelector('.tela').value;
    var exp = new String(telaStr);

    if(OPSUM) { 
        var numbers = new String(exp.split('+'))

        n1 = numbers.substring(0, numbers.indexOf(','));
        n2 = numbers.substring(numbers.indexOf(',') +1, numbers.length);

        var resultadoFinal = parseInt(n1) + parseInt(n2);

        tela.value =+ resultadoFinal;
      
        return OPSUM = false;

    } else if(OPSUB == true && OPSUM == false) {

        var numbers = new String(exp.split('-'))

        n1 = numbers.substring(0, numbers.indexOf(','));
        n2 = numbers.substring(numbers.indexOf(',') +1, numbers.length);

        var resultadoFinal = parseInt(n1) - parseInt(n2);

        tela.value =+ resultadoFinal;
      
        return OPSUB = false;

    } else if(OPMUL == true && OPSUB == false) {
        var numbers = new String(exp.split('x'))

        n1 = numbers.substring(0, numbers.indexOf(','));
        n2 = numbers.substring(numbers.indexOf(',') +1, numbers.length);

        var resultadoFinal = parseInt(n1) * parseInt(n2);

        tela.value =+ resultadoFinal;
      
        return OPMUL = false;
    } else if (OPDIV == true && OPMUL == false) {

        var numbers = new String(exp.split('÷'))

        n1 = numbers.substring(0, numbers.indexOf(','));
        n2 = numbers.substring(numbers.indexOf(',') +1, numbers.length);

        var resultadoFinal = parseInt(n1) / parseInt(n2);

        tela.value =+ resultadoFinal;
      
        return OPDIV = false;
    }
    })

function soma() {

    return OPSUM = true;

}

function subtracao() {

    return OPSUB = true;
}

function multiplicacao() {

    return OPMUL = true;
}
function divisao() {

    return OPDIV = true;
}

function clearALL() {
    tela.value = 0;
    n1 = 0;
    n2 = 0;
}
