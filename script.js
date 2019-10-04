const bateau = {
    x: 0,
    y: 0
};

const joueur = {
    x: -1,
    y: -1,
    quitter: false
}

const plateau = {
    xMax: 25,  //testé jusquà 25 tuiles
    yMax: 25
}


function afficher(x, y) {
    if (!(((x < 1 || x > plateau.xMax) || (y < 1 || y > plateau.yMax)) || (x == null && y == null))) {
        var coordonnes = (y + "." + x);
        //calcul de la disctance est de la force du bleu
        var bleu = 0;
        bleu = (Math.abs(bateau.x - joueur.x) + Math.abs(bateau.y - joueur.y)) * 20;
        if (bleu >= 8 * 20) {
            //console.log("Allô ! oui j'écoute ");
        }
        else {
            bleu = rgbToHex(255 - bleu, 0, bleu / 2)
            //console.log("bleu = " + bleu);
            document.getElementById(coordonnes).style.backgroundColor = bleu;
        }
        /*console.log(coordonnes + " est ecrit");*/
    } else {
        console.log("les coordonnes x= " + x + " et y= " + y + " ne peuvent etre affiché");
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function placerBateau() {
    bateau.x = getRandomInt(plateau.xMax) + 1;
    bateau.y = getRandomInt(plateau.yMax) + 1;
}

function victoire() {
    if (joueur.x == bateau.x && joueur.y == bateau.y) {
        alert("You won!");
        bateau.x = null;
        bateau.y = null;
        mainMenu();
    }
}

function viderPlateau() {
    hideClass("tile");
}

function tirer(x, y) {
    var isChecked = document.getElementById("switchDificulty").checked;
    //console.log(isChecked);


    if (!isChecked) {
        joueur.x = x;
        joueur.y = y;
        afficher(joueur.x, joueur.y);
        victoire();
    } else {
        joueur.x = x;
        joueur.y = y;
        //afficher(joueur.x, joueur.y);
        victoire();
        if (bateau.x - joueur.x <8 || bateau.y - joueur.y < 8) {
            bateau.x = bateau.x + (bateau.x - joueur.x);
            bateau.y = bateau.y + (bateau.y - joueur.y);
    
            if (bateau.x>plateau.xMax){ //bateau dans la grille
                bateau.x=plateau.xMax-1
            }
            if (bateau.x<1){ //bateau dans la grille
                bateau.x=1+1
            }
            if (bateau.y>plateau.yMax){ //bateau dans la grille
                bateau.y=plateau.yMax-1
            }
            if (bateau.y<1){ //bateau dans la grille
                bateau.y=1+1
            }
        }
        
        
    }
    if ((Math.abs(bateau.x - joueur.x) + Math.abs(bateau.y - joueur.y)>= 8)){
        //afficher plouf
        console.log("plouf");
        document.getElementById("ALEau").innerHTML = "plouf !";
    } else {
        //afficher distnce
        console.log("vous avez clique a " + (Math.abs(bateau.x - joueur.x) + Math.abs(bateau.y - joueur.y) + "cases du bateau"));
        document.getElementById("ALEau").innerHTML = "you shoot at <p>" + (Math.abs(bateau.x - joueur.x) + Math.abs(bateau.y - joueur.y)) +" tiles from the boat";
    }

    console.log('le bateau en x=' + bateau.x + ' et en y=' + bateau.y);
}


function newGrid() {
    var texte = '<table ALIGN="CENTER" >'; //création d'un tableau
    var nb = 1;

    for (lig = 1; lig <= plateau.yMax; lig++) { // reprendre les val de Plateau
        texte += '<tr>';
        for (col = 1; col <= plateau.xMax; col++) {
            texte += '<td class="tile" align="center" id="' + lig + '.' + col + '" onclick="tirer(' + col + ',' + lig + ')"';
            texte += '>    ';
            nb++;
            texte += '</td>';
        }
        texte += '</tr>';
    }
    texte += '</table>';

    document.getElementById("container").innerHTML = texte;
    setSize();
    //console.log("grille chargée");
}

function newGame(x, y) {
    setGrideSize(x, y);
    console.log("début de nouvelle partie");
    hideClass("mainMenu");
    hideClass("switchTexte");
    hideClass("switch");
    newGrid();
    placerBateau();
    console.log("bateau placée en x= " + bateau.x + "et en y= " + bateau.y);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function setSize() {
    var x = document.getElementsByClassName("tile");
    var i;
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var size = h / 2 / plateau.yMax;
    for (i = 0; i < x.length; i++) {
        x[i].style.height = size + "px";
        x[i].style.width = size + "px";
    }
}

function setGrideSize(x, y) {
    plateau.xMax = x;
    plateau.yMax = y;
}

function hideClass(ElementClass) {
    var x = document.getElementsByClassName(ElementClass);
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
}

function showClass(ElementClass) {
    var x = document.getElementsByClassName(ElementClass);
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "block";
    }
}

function mainMenu() {
    showClass("mainMenu");
    showClass("switchTexte");
    showClass("switch");
    viderPlateau();
    document.getElementById("ALEau").innerHTML = "Select a grid size";

}

function customNewGame() {
    var x = prompt("Enter the number of columns. We do not support any of the suffering due to grid size greater than 25 boxes.", "10");
    var y = prompt("Enter the number of lines.  We do not support any of the suffering due to grid size greater than 25 boxes.  ", "10");
    newGame(x, y);
}



