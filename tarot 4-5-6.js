nombreJoueurs = 4
joueurs = []
nonJoueur = ''
historique = []
scoresAvant = []
scoresApres = []
scoresPartie = []
nombreParties = 1
historiqueContrat = [[0,0,0]]

function creer(nombre){
    nombreJoueurs = nombre ;
    for (i=0;i<nombre;i=i+1 ){
        a = prompt("nom du joueur"+(i+1),"joueur"+(i+1));
        joueurs.push(a);
        scoresAvant.push(0);
        scoresApres.push(0);
        scoresPartie.push(0);

    }
    historique.push(scoresAvant);
    if (nombreJoueurs != 4){
        document.getElementById('bloccreation').style.visibility = 'collapse';
    }
    document.getElementById('blocjeu').style.visibility = 'visible';


    nombreJoueurs = nombre;
    afficherHistoriqueScores();
    if ( nombreJoueurs != 6){
        document.getElementById('mort').style.visibility = 'collapse';
    }
    else {
        selectionNonJoueur();
    }
    selectionPreneur();
    if ( nombreJoueurs >= 5){
        selectionPartenaire();
    }
    else {
        document.getElementById('blocpartenaire').style.visibility = 'collapse';
    }
    selectionEnchere();
    selectionBoutsGagnes();
    petitAuBout();
    equipePetitAuBout();
    poignee();
    reussitepoignee();
    grandChelem();
    document.getElementById('pointspreneur').value = "";
    document.getElementById('pointsadverse').value = "";    
}

function acterDernierePartie(){
    if ( nombreJoueurs == 6 & nombreParties == 1){
        nonJoueur = document.getElementById('nonjoueur').value ;
        document.getElementById('mort').style.visibility = 'collapse';

    }
    console.log('non-joueur ->'+nonJoueur);
    console.log('autre partie');
    totalFinal = 0 ;

    preneur = document.getElementById('preneur').value ;
    if (nombreJoueurs == 4 ){
        partenaire = preneur ;
    } else {
        partenaire = document.getElementById('partenaire').value ;
    }
    


    coeffStr = document.getElementById('enchere').value ;
    coeff = parseInt(coeffStr);
    contratStr = document.getElementById('bouts').value ;
    contrat = parseInt(contratStr);
    nombrePointsPreneurStr = document.getElementById('pointspreneur').value ;
    nombrePointsPreneur = parseFloat(nombrePointsPreneurStr);
    nombrePointsAdverseStr = document.getElementById('pointsadverse').value ;
    nombrePointsAdverse = parseFloat(nombrePointsAdverseStr);
    nombrePointsPetitAuBoutStr = document.getElementById('bout').value ;
    nombrePointsPetitAuBout = parseInt(nombrePointsPetitAuBoutStr);
    equipePetitAuBoutStr = document.getElementById('quibout').value ;
    equipeQuiAlePetitAuBout = parseInt(equipePetitAuBoutStr);
    nombrePointsPoigneeStr = document.getElementById('poignee').value ;
    nombrePointsPoignee = parseInt(nombrePointsPoigneeStr);
    coeffPoigneeStr = document.getElementById('reussitepoignee').value ;
    coeffPoignee = parseInt(coeffPoigneeStr);
    nombrePointsChelemStr = document.getElementById('grandchelem').value ;
    nombrePointsChelem = parseInt(nombrePointsChelemStr);

    contratJ = [];
    for (j=0;j<nombreJoueurs;j=j+1){
        if (joueurs[j] == preneur){
            contratJ.push('J'+(j+1));

        }
    }

    if ( nombreJoueurs != 4){
        for ( j=0;j<nombreJoueurs;j=j+1){
            if (joueurs[j] == partenaire){
                contratJ.push('J'+(j+1));
            }
        }
    } else {
        contratJ.push(0);

    }

    if (coeff == 1){
        contratJ.push('P');

    } else if (coeff == 2){
        contratJ.push('G');

    } else if (coeff == 4) {
        contratJ.push('GS');

    } else {
        contratJ.push('GC');

    }
    
    console.log('contratJ ->'+contratJ)
    
    if (nombrePointsPreneurStr != ""){
        total = nombrePointsPreneur - contrat
    }
    if (nombrePointsPreneurStr == "" & nombrePointsAdverseStr != ""){
        total = 91 - nombrePointsAdverse - contrat
    }
    if (nombrePointsPreneurStr == "" & nombrePointsAdverseStr == ""){
        total = 10000
    }
    if (nombrePointsPreneurStr != "" & nombrePointsAdverseStr != "" & nombrePointsPreneur+nombrePointsAdverse != 91){
        total = 10000
    }
    if (total <= -0.1){
        total = total - 25 ;
    }
    else {
        total = total + 25 ; 
    }
    console.log('total -->'+total)
    if (total <= 9900 & nombrePointsChelem == 0){
        pointsCartes = total;
        pointstotal = pointsCartes+nombrePointsPetitAuBout*equipeQuiAlePetitAuBout;
        annonce = nombrePointsPoignee*coeffPoignee+nombrePointsChelem;
        nombreParties = nombreParties+1;
        historiqueContrat.push(contratJ);

    }
    if (total <= 9900 & nombrePointsChelem != 0){
        pointsCartes = total;
        pointstotal = nombrePointsChelem;
        annonce = 0;
        if (nombrePointsChelem == 400){
            contratJ[2]= "Ch.D.R";

        } else if (nombrePointsChelem == 200){
            contratJ[2]= "Ch.nD.R";

        } else {
            contratJ[2] = "Ch.D.L"
        }
        nombreParties = nombreParties+1;
        historiqueContrat.push(contratJ);

    }
    actualiserScores(preneur,partenaire,coeff,pointstotal,annonce);
    afficherHistoriqueScores();
    afficherScoresDernierePartie();
    document.getElementById('pointspreneur').value = "";
    document.getElementById('pointsadverse').value = "";
    petitAuBout();
    poignee();
    grandChelem();
    calculMort();
}

function actualiserScores(preneur,partenaire,coeff,total,annonce){
    scoreCartes = calculScoreCartes(preneur,partenaire,coeff,total,annonce);
    nb = historique.length;
    scoreAvant = historique[nb-1];
    scoreApres = additionDeuxListes(scoreCartes,scoreAvant);
    historique.push(scoreApres);
}

function calculScoreCartes(preneur,partenaire,coeff,total,annonce){
    scoreCartes=[]
    if (nombrePointsChelem != 0 ){
        coeff = 1;
    } 
    

    for (i=0;i<nombreJoueurs;i=i+1){
        if ( nonJoueur == joueurs[i] & nombreJoueurs == 6){
            score = 0 ;
        }
        else if ( preneur == joueurs[i] & partenaire == preneur) {
            score = (nombreJoueurs-1)*(total*coeff+annonce);
        }
        else if (preneur == joueurs[i] & partenaire != preneur){
            score = 2*(total*coeff+annonce);
        }
        else if (partenaire == joueurs[i] & partenaire != preneur){
            score = total*coeff+annonce;
        }
        else {
            score = (-1)*total*coeff-annonce;
        }
        scoreCartes.push(score);
    }
    return scoreCartes;
}

function afficherScoresDernierePartie(){
    nb = historique.length;
    scoreAvant = historique[nb-2];
    scoreApres = historique[nb-1];
    scoresPartie = soustractionDeuxListes(scoreApres,scoreAvant);
    html =""
    for (i=0;i<nombreJoueurs;i=i+1){
        html=html+'<tr><td>'+joueurs[i]+'</td><td>'+scoresPartie[i]+'</td></tr>'
                
    }   
    document.getElementById('score').innerHTML = html
    
}


function afficherHistoriqueScores(){
    if (nombreParties > 1){
        depart = 1;

    } else {
        depart = 0;

    }
    html ="<tr><td>preneur</td>";
    for (j=depart;j<nombreParties;j=j+1){
        html = html+'<td>'+historiqueContrat[j][0]+'</td>';
    }
    html = html + '</tr>';
    html = html + "<tr><td>contrat</td>";
    for (j=depart;j<nombreParties;j=j+1){
        html = html+'<td>'+historiqueContrat[j][2]+'</td>';
    }
    html = html + '</tr>';
    if ( nombreJoueurs != 4){
        html = html + "<tr><td>partenaire</td>";
        for (j=depart;j<nombreParties;j=j+1){
            html = html+'<td>'+historiqueContrat[j][1]+'</td>';
        }
        html = html + '</tr>';
    }

    
    html = html +"<tr><td>partie n°</td>";
    for (j=depart;j<nombreParties;j=j+1){
        html = html+'<td>'+j+'</td>';
    }
    html = html + '</tr>';
    for (i=0;i<nombreJoueurs;i=i+1){
        html=html+'<tr><td>'+joueurs[i]+'</td>'
        for (j=depart;j<nombreParties;j=j+1){
            html = html + '<td>'+historique[j][i]+'</td>';
        }
        html = html + '</tr>';
    }   
    document.getElementById('historiquescore').innerHTML = html   
}

function selectionNonJoueur(){
    nonJoueur=''
    for (i=0;i<nombreJoueurs;i=i+1){
        nonJoueur=nonJoueur+'<option value="'+joueurs[i]+'">'+joueurs[i]+'</option>'
    }
    document.getElementById('nonjoueur').innerHTML = nonJoueur
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

function selectionBoutsGagnes(){
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

function petitAuBout(){
    html = '<option value = 0>rien</option><option value=10>petit au bout réussi</option><option value=-10>petit au bout perdu</option>'
    document.getElementById('bout').innerHTML = html
}

function equipePetitAuBout(){
    html = '<option value=1>équipe preneur</option><option value =-1>équipe défense</option>'
    document.getElementById('quibout').innerHTML = html
}
function poignee(){
    html = '<option value = 0>rien</option><option value=20>poignée</option><option value = 30>double poignée</option><option value = 40>triple poignée</option>'
    document.getElementById('poignee').innerHTML = html
}
function reussitepoignee(){
    html = '<option value=1>contrat preneur réussi</option><option value = -1>contrat preneur perdu</option>'
    document.getElementById('reussitepoignee').innerHTML = html
}

function grandChelem(){
    html = '<option value = 0>rien</option><option value=400>grand chelem demandé et réussi</option><option value = 200>grand chelem non demandé et réussi</option><option value = -200>grand chelem demandé et loupé</option>'
    document.getElementById('grandchelem').innerHTML = html
}

function calculMort(){
    place = joueurs.findIndex((element) => element == nonJoueur);
    if ( place == 5){
        nonJoueur = joueurs[0];
    }
    else {
        nonJoueur = joueurs [place+1];
    }
}

function remiseAzero(nombreJoueurs){
    partie = []
    nombreParties = 1;
    somme = 0;
    for (i=0;i<nombreJoueurs;i=i+1){
        a = prompt("score du joueur"+(i+1),0);
        partie.push(parseInt(a));
        somme = somme + parseInt(a);

    }
    
    historique = [partie];
    historiqueContrat = [[0,0,0]];
    afficherHistoriqueScores();
    
}
function nouveauPlateau(nombreJoueurs){
    joueurs = []
    for (i=0;i<nombreJoueurs;i=i+1 ){
        a = prompt("nom du joueur"+(i+1),"joueur"+(i+1));
        joueurs.push(a);
    }
    afficherHistoriqueScores();
    selectionPreneur();
    selectionPartenaire();
}


function additionDeuxListes(l1,l2){
    k= l1.length;
    resultat = [];
    for (i=0;i<k;i=i+1){
        resultat.push(l1[i]+l2[i]);
    }
    return resultat
}

function soustractionDeuxListes(l1,l2){
    k= l1.length;
    resultat = [];
    for (i=0;i<k;i=i+1){
        resultat.push(l1[i]-l2[i]);
    }
    return resultat
}
