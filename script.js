const c = (el)=>document.querySelector(el);

let seuvotopara = c('.d-1-1 span');
let cargo = c('.d-1-2 span');
let descricao = c('.d-1-4');
let aviso = c('.d-2');
let lateral = c('.d-1-right');
let numeros = c('.d-1-3');

//preciso saber qual etapa estou agora
//variavel numero e o qual será preenchido na tela da urna 
let etapaAtual = 0;
let numero = '';
let votoBranco = true;

function comecarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for(let i=0;i<etapa.numeros; i++){
        if(i === 0){
            numeroHTML += '<div class="numero pisca"></div>';    
        } else {
            numeroHTML += '<div class="numero"></div>';
        }
        
    }

    seuvotopara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

function atualizainterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else {
            return false;
        }
    })
    if(candidato.length>0){
        candidato = candidato[0];
        seuvotopara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br/>Partido: ${candidato.partido}`;
        
        let fotosHTML = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHTML +=`<div class="d-1-image small"><img src="./images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            }else{ 
                fotosHTML += `<div class="d-1-image"><img src="./images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHTML;
    } else {
        seuvotopara.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
        aviso.style.display = 'block';
    }
}

function clicou(n){
    let elnumero = document.querySelector('.numero.pisca');//procurando o numero piscando
    if(elnumero !== null){ //signica que tem um numero piscando
        elnumero.innerHTML = n;
        numero = `${numero}${n}`

        elnumero.classList.remove('pisca');
        if(elnumero.nextElementSibling !== null){
            elnumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizainterface();
        }
    }
}

function branco(){
    if(numero === ''){
        votoBranco = true;
        seuvotopara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    } else {
        alert('para digitar em BRANCO, não pode ter digitado nenhum numero, clique em CORRIGIR e tente novamente');
    }
}
function corrige(){
    comecarEtapa();
}
function confirma(){
    let etapa = etapas[etapaAtual];
    let votoconfirmado=false;
    if(votoBranco === true){
        votoconfirmado = true;
    } else if(numero.length === etapa.numeros){
        votoconfirmado = true;
    }
    if(votoconfirmado === true){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
        document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
        }
    }
}

comecarEtapa();