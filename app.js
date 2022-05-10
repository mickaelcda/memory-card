const cartes = document.querySelectorAll('.carte');
const tentative = document.querySelector('.tentative');
const btnRejouer = document.querySelector('.rejouer');

let carteRetournee = false;
let premiereCarte, secondeCarte;
let verouillage = false;
let nbTentative = 0;

cartes.forEach(carte => {
    carte.addEventListener('click', retourneCarte)
})

function retourneCarte(){

    if(verouillage) return;

    this.childNodes[1].classList.toggle('active');

    if(!carteRetournee){

        carteRetournee = true;
        premiereCarte = this;
        return;
    }

    carteRetournee = false;
    secondeCarte = this;

    // console.log(premiereCarte, secondeCarte);

    correspondance();
}

function correspondance(){

    if(premiereCarte.getAttribute('data-attr') === secondeCarte.getAttribute('data-attr')) {

        premiereCarte.removeEventListener('click', retourneCarte);
        secondeCarte.removeEventListener('click', retourneCarte);

    } else {
        verouillage = true;
        setTimeout(() => {

            premiereCarte.childNodes[1].classList.remove('active');
            secondeCarte.childNodes[1].classList.remove('active');

            verouillage = false;
        }, 1500)
    }
    nbTentative = nbTentative + 1;
    tentative.innerText = `Coup(s) : ${nbTentative}`
}

function aleatoire(){
    cartes.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
}
aleatoire();

btnRejouer.addEventListener('click', reset);

function reset() {
    window.location.reload();
}