nombreJoueurs = 4
joueurs = []
scoresAvant = []
scoresApres = []
scoresPartie = []
scores = []

function creer(nombre){
    console.log("creer")

    for (i=0;i<nombre;i=i+1 ){
        a = prompt("nom du joueur"+(i+1),"joueur"+(i+1));
        joueurs.push(a);
        scores.push(0);
        scoresAvant.push(0);
        scoresApres.push(0);
        scoresPartie.push(0);
        console.log(joueurs);

    }

    document.getElementById('bloccreation').style.visibility = 'collapse'
    document.getElementById('blocjeu').style.visibility = 'visible'


    nombreJoueurs = nombre
    afficherScores();
    selectionPreneur();
    if ( nombreJoueurs == 5){
        selectionPartenaire();
    }
    else {
        document.getElementById('blocpartenaire').style.visibility = 'collapse'
    }
    
    selectionEnchere();
    selectionBouts();
    selectionComplement();
    selectionJoueurConcerne();
    document.getElementById('pointspreneur').value = "";
    document.getElementById('pointsadverse').value = "";
    

    
}

function afficherScores(){
    html =""
    for (i=0;i<nombreJoueurs;i=i+1){
        html=html+'<tr><td>'+joueurs[i]+'</td><td>'+scoresAvant[i]+'</td><td>'+scoresPartie[i]+'</td><td>'+scoresApres[i]+'</td></tr>'
    }
    document.getElementById('score').innerHTML = html
    
}

function selectionPreneur(){
    preneurs=''
    for (i=0;i<nombreJoueurs;i=i+1){
        preneurs=preneurs+'<option value="'+joueurs[i]+'">'+joueurs[i]+'</option>'
    }
    document.getElementById('preneur').innerHTML = preneurs
}

function selectionPartenaire(preneur){
    partenaires=''
    for (i=0;i<nombreJoueurs;i=i+1){
            partenaires = partenaires+'<option value ="'+joueurs[i]+'">'+joueurs[i]+'</option>'
    }
    document.getElementById('partenaire').innerHTML = partenaires
}

function selectionBouts(){
    text = '<option value=56>0</option><option value=51>1</option><option value=41>2</option><option value=36>3</option>'
    document.getElementById('bouts').innerHTML = text


}

function selectionEnchere(){
    encheres = ''
    encheres = encheres+'<option value=1>petite</option>';
    encheres = encheres+'<option value=2>garde</option>';
    encheres = encheres+'<option value=3>garde sans</option>';
    encheres = encheres+'<option value=4>garde contre</option>';
    document.getElementById('enchere').innerHTML = encheres
}

function actualiserScoresClick(){
    totalFinal = 0
    preneur = document.getElementById('preneur').value ;
    if (nombreJoueurs == 4 ){
        partenaire = preneur ;
    } else {
        partenaire = document.getElementById('partenaire').value ;

    }
    coeffStr = document.getElementById('enchere').value ;
    console.log(coeffStr)
    coeff = parseInt(coeffStr);
    contratStr = document.getElementById('bouts').value ;
    contrat = parseInt(contratStr);
    nombrePointsPreneurStr = document.getElementById('pointspreneur').value ;
    nombrePointsPreneur = parseInt(nombrePointsPreneurStr);
    nombrePointsAdverseStr = document.getElementById('pointsadverse').value ;
    nombrePointsAdverse = parseInt(nombrePointsAdverseStr);
    if (nombrePointsPreneurStr != ""){
        total = nombrePointsPreneur - contrat
    }
    if (nombrePointsPreneurStr == "" & nombrePointsAdverseStr != ""){
        total = 91 - nombrePointsAdverse - contrat
    }
    if (nombrePointsPreneurStr == "" & nombrePointsAdverseStr == ""){
        console.log('aucun score écrit')
        total = 10000
    }
    if (nombrePointsPreneurStr != "" & nombrePointsAdverseStr != "" & nombrePointsPreneur+nombrePointsAdverse != 91){
        console.log('aucun score écrit')
        total = 10000
    }
    if (total <= -0.5){
        total = total - 25 ;
    }
    else {
        total = total + 25 ; 
    }
    if (total <= 9900){
        totalFinal = total

    }
    
    actualiserScores(preneur,partenaire,coeff,totalFinal);
    afficherScores();
    document.getElementById('pointspreneur').value = "";
    document.getElementById('pointsadverse').value = "";
}

function actualiserScores(preneur,partenaire,coeff,total){
   
    for (i=0;i<nombreJoueurs;i=i+1){
        scoresAvant[i] = scoresApres[i]
        if ( preneur == joueurs[i] & partenaire == preneur) {
            scoresApres[i] = scoresAvant[i]+(nombreJoueurs-1)*total*coeff
        }
        else if (preneur == joueurs[i] & partenaire != preneur){
            scoresApres[i] = scoresAvant[i]+2*total*coeff;
        }
        else if (partenaire == joueurs[i] & partenaire != preneur){
            scoresApres[i] = scoresAvant[i]+ total*coeff;
        }
        else {
            scoresApres[i]= scoresAvant[i]-total*coeff
        }
        scoresPartie[i] = scoresApres[i]-scoresAvant[i]
        }
    console.log(scoresApres)
    console.log(scoresAvant)
    console.log(scoresPartie)
}

function selectionComplement(){
    autres = ''
    autres = autres+'<option value=10>petit au bout réussi</option>';
    autres = autres+'<option value=-10>petit au bout raté</option>';
    autres = autres+'<option value=10>poignée réussie</option>';
    autres = autres+'<option value=20>double poignée réussie</option>';
    autres = autres+'<option value=-10>poignée loupée</option>';
    autres = autres+'<option value=-20>double poignée loupée</option>';
    document.getElementById('autre').innerHTML = autres
}

function selectionJoueurConcerne(){
    complement=''
    for (i=0;i<nombreJoueurs;i=i+1){
        complement=complement+'<option value="'+joueurs[i]+'">'+joueurs[i]+'</option>'
    }
    console.log(complement);
    document.getElementById('beneficiaire').innerHTML = complement
}

function mettreAJourComplementClick(){
    beneficiaire = document.getElementById('beneficiaire').value ;
    console.log(beneficiaire);
    beneficeStr = document.getElementById('autre').value ;
    console.log(beneficeStr);
    benefice = parseInt(beneficeStr);
    actualiserBenefice(beneficiaire,benefice);
    afficherScores();
}

function actualiserBenefice(beneficiaire,benefice){
    for (i=0;i<nombreJoueurs;i=i+1){
        scoresAvant[i]= scoresApres[i]
        if ( beneficiaire == joueurs[i]) {
            scoresApres[i] = scoresAvant[i]+(nombreJoueurs-1)*benefice ;
        }
        else {
            scoresApres[i]= scoresAvant[i]-benefice ;
        }
        scoresPartie[i] = scoresApres[i]-scoresAvant[i]
        console.log(scoresPartie[i]);
    }
}