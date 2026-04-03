nombreJoueurs = 4
joueurs = []
scoresAvant = []
scoresApres = []
scoresPartie = []
scores = []

function preciserNombreJoueurs(){
    document.getElementById('bloccreation').style.visibility = 'visible'
    document.getElementById('blocdepart').style.visibility = 'collapse'
    text = '<option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option>'
    text = text +'<option value=5>5</option><option value=6>6</option><option value=7>7</option><option value=8>8</option>'
    text = text + '<option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option>'
    document.getElementById('tourdetable').innerHTML = text

}


function capterLeCurseur(){
    nombreJoueurs = capterNombreJoueurs();
    construireListe(nombreJoueurs);
}

function capterNombreJoueurs(){
    nombreJoueursStr= document.getElementById('tourdetable').value ;
    //console.log("retour ->"+nombreJoueursStr);
    nombreJoueurs = parseInt(nombreJoueursStr);
    construireListe(nombreJoueurs);
    document.getElementById('blocjeu').style.visibility = 'visible';
    afficherScores();


}

function construireListe(nombreJoueurs){
    for (i=0;i<nombreJoueurs;i=i+1 ){
        a = prompt("nom du joueur"+(i+1),"joueur"+(i+1));
        joueurs.push(a);
        scores.push(0);
        scoresAvant.push(0);
        scoresApres.push(0);
        scoresPartie.push(0);

    }
    
}

function afficherScores(){
    
    
    html ="<tr><td>&nbsp;table joueurs&nbsp;</td><td>Avant</td><td>score partie</td><td>Après</td></tr>";
    for (i=0;i<nombreJoueurs;i=i+1){
        html=html+'<tr><td>'+joueurs[i]+'</td><td>'+scoresAvant[i]+'</td><td>'+scoresPartie[i]+'</td><td>'+scoresApres[i]+'</td></tr>';

    }   
    document.getElementById('score').innerHTML = html

    for (i=0;i<nombreJoueurs;i=i+1){
        mot = 'pointsjoueur'+(i+1);
        document.getElementById(mot).value = "";

    }

    for (i=nombreJoueurs+1;i<13;i=i+1){
        document.getElementById('nbrepointjoueur'+i).style.visibility = 'collapse';
    
    }

}

function miseAJour(){
    scoresPartie = [];
    for (i=0;i<nombreJoueurs;i=i+1){
        mot = 'pointsjoueur'+(i+1);
        nombrePointsJoueurStr = document.getElementById(mot).value ;
        nombrePointsJoueur = parseInt(nombrePointsJoueurStr);
        scoresPartie.push(nombrePointsJoueur);

    }
    for (i=0;i<nombreJoueurs;i=i+1){
        scoresAvant[i] = scoresApres[i];
        scoresApres[i] = scoresAvant[i]+scoresPartie[i];
        
    }
    afficherScores();

    
}

