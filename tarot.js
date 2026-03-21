nombreJoueurs = 4
joueurs = []
historique = []
partieEnCours = []
scoresAvant = []
scoresApres = []
scoresPartie = []
scores = []
nombreParties = 0

function creer(nombre){
    console.log("creer")
    partieEnCours.push(0);
    

    for (i=0;i<nombre;i=i+1 ){
        a = prompt("nom du joueur"+(i+1),"joueur"+(i+1));
        joueurs.push(a);
        scores.push(0);
        partieEnCours.push(0);
        scoresAvant.push(0);
        scoresApres.push(0);
        scoresPartie.push(0);
        
    }
    console.log(partieEnCours);

    document.getElementById('bloccreation').style.visibility = 'collapse'
    document.getElementById('blocjeu').style.visibility = 'visible'


    nombreJoueurs = nombre
    afficherNombreParties()
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
    bout();
    reussiteaubout();
    equipeaubout();
    poignee();
    reussitepoignee();
    equipepoignee();
    selectionComplement();
    selectionJoueurConcerne();
    document.getElementById('pointspreneur').value = "";
    document.getElementById('pointsadverse').value = "";
    

    
}

function afficherNombreParties(){
    html = '<tr><td>nombre de parties jouées</td><td>'+(nombreParties)+'</td></tr>'
    document.getElementById('nombreparties').innerHTML = html
}

function afficherScores(){
    html =""
    for (i=0;i<nombreJoueurs;i=i+1){
        html=html+'<tr><td>'+joueurs[i]+'</td><td>'+scoresAvant[i]+'</td><td>'+scoresPartie[i]+'</td><td>'+scoresApres[i]+'</td></tr>'
        
        console.log(html);
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

function selectionPartenaire(){
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
    encheres = encheres+'<option value=4>garde sans</option>';
    encheres = encheres+'<option value=6>garde contre</option>';
    document.getElementById('enchere').innerHTML = encheres
}

function actualiserScoresClick(){
    totalFinal = 0 ;
    equipeP=[] ;
    equipeD = [] ;
    preneur = document.getElementById('preneur').value ;
    if (nombreJoueurs == 4 ){
        partenaire = preneur ;
    } else {
        partenaire = document.getElementById('partenaire').value ;
    }
    equipeP.push(preneur);
    equipeP.push(partenaire);
    for (i=0;i<nombreJoueurs;i=i+1){
        if (joueurs[i] != preneur & joueurs[i] != partenaire){
            equipeD.push(joueurs[i]);
        }
    }
    console.log(equipeP);
    console.log(equipeD);


    coeffStr = document.getElementById('enchere').value ;
    coeff = parseInt(coeffStr);
    contratStr = document.getElementById('bouts').value ;
    contrat = parseInt(contratStr);
    nombrePointsPreneurStr = document.getElementById('pointspreneur').value ;
    nombrePointsPreneur = parseInt(nombrePointsPreneurStr);
    nombrePointsAdverseStr = document.getElementById('pointsadverse').value ;
    nombrePointsAdverse = parseInt(nombrePointsAdverseStr);

    nombrePointsPetitAuBoutStr = document.getElementById('bout').value ;
    nombrePointsPetitAuBout = parseInt(nombrePointsPetitAuBoutStr);
    coeffPetitAuBoutStr = document.getElementById('reussitebout').value ;
    coeffPetitAuBout = parseInt(coeffPetitAuBoutStr);
    equipePetitAuBoutStr =document.getElementById('quibout').value ;
    nombrePointsPoigneeStr = document.getElementById('poignee').value ;
    nombrePointsPoignee = parseInt(nombrePointsPoigneeStr);
    coeffPoigneeStr = document.getElementById('reussitepoignee').value ;
    coeffPoignee = parseInt(coeffPoigneeStr);
    equipePoigneeStr =document.getElementById('quipoignee').value ;
    console.log("1 au bout")
    console.log(equipePetitAuBoutStr);
    console.log(coeffPetitAuBout);
    
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
        pointsCartes = total;
        nombreParties = nombreParties+1;

    }
    
    actualiserScores(preneur,partenaire,coeff,pointsCartes);
    afficherNombreParties();
    afficherScores();
    document.getElementById('pointspreneur').value = "";
    document.getElementById('pointsadverse').value = "";
    bout();
    poignee();
}

function calculScoreCartes(preneur,partenaire,coeff,total){
    scoreCartes=[]

    for (i=0;i<nombreJoueurs;i=i+1){
        if ( preneur == joueurs[i] & partenaire == preneur) {
            score = (nombreJoueurs-1)*total*coeff;
        }
        else if (preneur == joueurs[i] & partenaire != preneur){
            score = 2*total*coeff;
        }
        else if (partenaire == joueurs[i] & partenaire != preneur){
            score = total*coeff;
        }
        else {
            score = (-1)*total*coeff;
        }
        scoreCartes.push(score);
    }
    return scoreCartes;
}

function calculScoreBout(points,reussite,coeff,equipeP,equipeD){
    scoreBout=[]

    for (i=0;i<nombreJoueurs;i=i+1){
        if ( preneur == joueurs[i] & partenaire == preneur) {
            score = (nombreJoueurs-1)*total*coeff;
        }
        else if (preneur == joueurs[i] & partenaire != preneur){
            score = 2*total*coeff;
        }
        else if (partenaire == joueurs[i] & partenaire != preneur){
            score = total*coeff;
        }
        else {
            score = (-1)*total*coeff;
        }
        scoreCartes.push(score);
    }
    return scoreCartes;
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
    scoreCartes = calculScoreCartes(preneur,partenaire,coeff,total);
    console.log(scoreCartes);
}
function bout(){
    html = '<option value = 0>rien</option><option value=10>petit au bout</option>'
    document.getElementById('bout').innerHTML = html
}

function reussiteaubout(){
    html = '<option value=1>réussi</option><option value = -1>perdu</option>'
    document.getElementById('reussitebout').innerHTML = html
}
function equipeaubout(){
    html = '<option value="preneur">équipe preneur</option><option value ="defense">équipe défense</option>'
    document.getElementById('quibout').innerHTML = html
}
function poignee(){
    html = '<option value = 0>rien</option><option value=20>poignée</option><option value = 30>double poignée</option><option value = 40>triple poignée</option>'
    document.getElementById('poignee').innerHTML = html
}
function reussitepoignee(){
    html = '<option value=1>réussie</option><option value = -1>perdue</option>'
    document.getElementById('reussitepoignee').innerHTML = html
}
function equipepoignee(){
    html = '<option value="preneur">équipe preneur</option><option value ="defense">équipe défense</option>'
    document.getElementById('quipoignee').innerHTML = html
}

function selectionComplement(){
    autres = ''
    autres = autres+'<option value=10>petit au bout réussi</option>';
    autres = autres+'<option value=-10>petit au bout raté</option>';
    autres = autres+'<option value=20>poignée réussie</option>';
    autres = autres+'<option value=30>double poignée réussie</option>';
    autres = autres+'<option value=40>triple poignée réussie</option>';
    autres = autres+'<option value=-20>poignée loupée</option>';
    autres = autres+'<option value=-30>double poignée loupée</option>';
    autres = autres+'<option value=-40>triple poignée loupée</option>';
    document.getElementById('autre').innerHTML = autres
}

function selectionJoueurConcerne(){
    complement=''
    for (i=0;i<nombreJoueurs;i=i+1){
        complement=complement+'<option value="'+joueurs[i]+'">'+joueurs[i]+'</option>'
    }
    document.getElementById('beneficiaire').innerHTML = complement
}

function mettreAJourComplementClick(){
    beneficiaire = document.getElementById('beneficiaire').value ;
    beneficeStr = document.getElementById('autre').value ;
    benefice = parseInt(beneficeStr);
    coeffStr = document.getElementById('enchere').value ;
    coeff = parseInt(coeffStr);
    actualiserBenefice(beneficiaire,benefice,coeff);
    afficherScores();
}

function actualiserBenefice(beneficiaire,benefice,coeff){
    if (benefice ==10 || benefice == -10){
        for (i=0;i<nombreJoueurs;i=i+1){
            scoresAvant[i]= scoresApres[i]
            if ( beneficiaire == joueurs[i]) {
                scoresApres[i] = scoresAvant[i]+(nombreJoueurs-1)*benefice*coeff ;
            }
            else {
                scoresApres[i]= scoresAvant[i]-benefice*coeff ;
            }
            scoresPartie[i] = scoresApres[i]-scoresAvant[i] 
        }
    } else {
        for (i=0;i<nombreJoueurs;i=i+1){
            scoresAvant[i]= scoresApres[i]
            if ( beneficiaire == joueurs[i]) {
                scoresApres[i] = scoresAvant[i]+(nombreJoueurs-1)*benefice ;
            }
            else {
                scoresApres[i]= scoresAvant[i]-benefice ;
            }
            scoresPartie[i] = scoresApres[i]-scoresAvant[i] 
        }

    }
    
}
function remiseAzero(nombreJoueurs){
    scoresAvant = []
    scoresApres = []
    scoresPartie = []
    nombreParties = 0
    for (i=0;i<nombreJoueurs;i=i+1 ){
        scoresAvant.push(0);
        scoresApres.push(0);
        scoresPartie.push(0);
        
    }
    afficherScores();
    afficherNombreParties();
}
function nouveauPlateau(nombreJoueurs){
    joueurs = []
    for (i=0;i<nombreJoueurs;i=i+1 ){
        a = prompt("nom du joueur"+(i+1),"joueur"+(i+1));
        joueurs.push(a);
    }
    afficherScores();
    selectionJoueurConcerne();
    selectionPreneur();
    selectionPartenaire();
}
