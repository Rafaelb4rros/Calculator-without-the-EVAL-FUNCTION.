
const tela = document.querySelector(".tela");
const result = document.querySelector('[data-type="result"]');
const clearRow = document.querySelector('[data-type="cleanRow"]');
const clearAll = document.querySelector('[data-type="cleanAll"]')
const clearLast = document.querySelector('[data-type="cleanLast"]');
const mem  = document.querySelector('.opShow');
let op = "";
let resultOp = "";
const operations = ["+","÷","x","-"];
let y = 0;

function insert(number) {

let numbers = tela.value;
tela.value += number;

clearLast.onclick = () =>{
    if(tela.value !== "" && tela.value !== 0 && op === "") {
        tela.value = tela.value.substr(0, tela.value.length -1)
} else {
        clearLast.disabled = true;
}
    if(tela.value !== "" && mem.textContent !== "") {
        tela.value = tela.value.substr(0, tela.value.length -1)
} else {
         clearLast.disabled = true;
}
}
    clearRow.onclick = () => {
        if(tela.value !== "" || tela.value !== 0 && mem.textContent !== 0 || mem.textContent !== "") {
                    tela.value = "";
                } else {
                    clearRow.disabled = true;
                } 
                if(tela.value !== "" || tela.value !== 0 || mem.textContent === "" || mem.textContent === 0) {
                    tela.value = "";
                } else {
                    clearRow.disabled = true;
                }
            }
            clearAll.onclick = () =>{
                op = "";
                tela.value = "";
                mem.textContent = "";
                document.querySelector('[data-type="buttonSUM"]').disabled = false;
                document.querySelector('[data-type="buttonMinus"]').disabled = false;
                document.querySelector('[data-type="buttonX"]').disabled = false;
                document.querySelector('[data-type="buttonDivide"]').disabled = false;
            }

    if(tela.value.charAt(0) !== "+" &&
        tela.value.charAt(0) !== "-"&&
        tela.value.charAt(0) !== "x" &&
        tela.value.charAt(0) !== "÷") {
            
        if(operations.includes(tela.value.charAt(numbers.length))) {
            document.querySelector('[data-type="buttonSUM"]').disabled = true;
            document.querySelector('[data-type="buttonMinus"]').disabled = true;
            document.querySelector('[data-type="buttonX"]').disabled = true;
            document.querySelector('[data-type="buttonDivide"]').disabled = true;
            mem.textContent = tela.value;

                operation(tela.value.charAt(numbers.length))

                if(tela.value.substr(0, mem.textContent.length) === mem.textContent){
                    tela.value = tela.value.substr(mem.textContent, tela.value);
                }
            }

        } else { 
            tela.value = "";
        }

        if(op !== "" && tela.value !== "" && mem.textContent !== ""){
            let numb = mem.textContent + tela.value;
            result.onclick = () => operationDefined(numb.split(op));
        }
    }

    function operation(opr) {
        if(opr === '+') { return op = '+'}
        if(opr === '-') { return op = '-'}
        if(opr === '÷') { return op = '÷'}
        if(opr === 'x') { return op = 'x'}
    }

    const operationDefined = (numbers) =>{
        n1 = parseFloat(numbers[0]);
        n2 = parseFloat(numbers[1]);

       if(op === "+") {
            resultOp = n1 + n2;
       }
       if(op === "-") {
            resultOp = n1 - n2;
       }
       if( op === "÷" ) {
           resultOp = n1 / n2;
       }
       if( op === "x") {
           resultOp = n1 * n2;
       }
       if(resultOp !== "") {
        clearLast.onclick = () =>{
            mem.textContent = "";
        } 
        clearRow.onclick = () =>{
            if(tela.value !== "" || tela.value !== 0 || mem.textContent !== "" || mem.textContent !== 0) {
                tela.value = "";
                mem.textContent = "";
            } 
        }

       }
    
       mem.textContent = ` ${mem.textContent.substr(0, mem.textContent.length -1)} ${op} ${n2} =`
       
       if(mem.textContent.length >= 3) {

           result.onclick =  evalopMem;
        }
       
       document.querySelector('[data-type="buttonSUM"]').disabled = false;
       document.querySelector('[data-type="buttonMinus"]').disabled = false;
       document.querySelector('[data-type="buttonX"]').disabled = false;
       document.querySelector('[data-type="buttonDivide"]').disabled = false;

       return tela.value = resultOp;
    }


    function evalopMem() {
        if(tela.value !== "" && mem.value !== "" && resultOp !== "") {
        let th = mem.textContent
        let thr = th.replace("=", "");
        let thrs = thr.split(op)
        n1n = parseFloat(thrs[0]);
        n2n = parseFloat(thrs[1]);

        mem.textContent = `${parseInt(tela.value)} ${op} ${parseInt(n2n)} =`
   
        if(op === "+") {
            resultOp = n1n + n2n
       }
       if(op === "-") {
            resultOp = n1n - n2n;
       }
       if( op === "÷" ) {
           resultOp = n1n / n2n;
       }
       if( op === "x") {
           resultOp = n1n * n2n;
       }
    
       tela.value = resultOp;
    }
}
