nombreJoueurs = 2
joueurs = ["NOUS","EUX"]
historique = [[0,0,0,0]]
belote = []
scoreApres = []
litige = [0,0]
gagnants = []
preneurs = []
nombreParties = 1

function creer(nombre){
    nombreJoueurs = nombre ;
    document.getElementById('blocjeu').style.visibility = 'visible';


    nombreJoueurs = nombre;
    coeffPreneur = 1;
    afficherHistoriqueScores();
    
    equipeBelote();
    equipeQUiPrend();
    
    document.getElementById('pointsNOUS').value = "";
    document.getElementById('pointsEUX').value = "";    
}
function simulation(nombre){
    nombreJoueurs = 2;
    historique = [[0,0,0,0],[120,0,62,0],[81,0,81,0],[81,0,81,0],[81,0,81,0],[81,0,81,0]],
    nombreParties = 6;
    gagnants = [0,1,0,0,0,0];
    preneurs = [1,1,-1,1,1,1];
    belote = [[0,0],[0,0],[0,0],[0,0],[0,0]];
    coeffPreneur = 1;
    document.getElementById('blocjeu').style.visibility = 'visible';
    calculSommesPartielles(nombreParties-1);
    //nombreParties = 7;
    afficherHistoriqueScores();
    //nombreParties = 7;
    
    equipeBelote();
    equipeQUiPrend();
    
    document.getElementById('pointsNOUS').value = "";
    document.getElementById('pointsEUX').value = ""; 
}

function acterDernierePartie(){
    
    
    console.log('autre partie',"n°partie  ->",nombreParties);

    preneurStr = document.getElementById('preneur').value ;
    coeffPreneur = parseInt(preneurStr);
    preneurs.push(coeffPreneur);
    console.log('equipe qui prend -->',coeffPreneur)
    BeloteStr = document.getElementById('belote').value ;
    coeffBelote = parseInt(BeloteStr);
    equipeBelote();
    belote.push([0,0]);
    console.log("belotes ->",belote);
    pointsBeloteEUX = 0;
    pointsBeloteNOUS = 0;
    if ( coeffBelote == 1){
        belote[nombreParties-1][0]=20;
    }
    if ( coeffBelote == -1){
        belote[nombreParties-1][1]=20;
    }
    if ( coeffBelote == 2){
        belote[nombreParties-1][1]=20;
        belote[nombreParties-1][0]=20;
    }
    nombrePointsNOUSStr = document.getElementById('pointsNOUS').value ;
    nombrePointsNOUS = parseInt(nombrePointsNOUSStr);
    console.log('points NOUS --->',nombrePointsNOUS);
    nombrePointsEUXStr = document.getElementById('pointsEUX').value ;
    nombrePointsEUX = parseInt(nombrePointsEUXStr);
    console.log('points EUX --->',nombrePointsEUX);
    if (nombrePointsNOUSStr != "" & nombrePointsEUXStr == ""){
        nombrePointsEUX = 314 - nombrePointsNOUS
    }
    if (nombrePointsNOUSStr == "" & nombrePointsEUXStr != ""){
        nombrePointsNOUS = 314 - nombrePointsEUX
    }
    if (nombrePointsNOUS <0 || nombrePointsNOUS > 314 || nombrePointsEUX <0 || nombrePointsEUX > 314){
        coeffPreneur = 0;
    }
    if ((nombrePointsNOUSStr == "" & nombrePointsEUXStr == "")||(nombrePointsNOUSStr != "" & nombrePointsEUXStr != "" & nombrePointsNOUS+nombrePointsEUX != 314)){
        coeffPreneur = 0 ;
    }
    resultatPriseNote =[nombrePointsNOUS,nombrePointsEUX,belote[nombreParties-1][0],belote[nombreParties-1][1],coeffPreneur];
    console.log(resultatPriseNote);
    document.getElementById('pointsNOUS').value = "";
    document.getElementById('pointsEUX').value = "";
    if (coeffPreneur != 0){
        analyse = analysePriseNote(resultatPriseNote);
        console.log("analyse -->",analyse);
        final = gains(analyse);
        actualiserScores(final);
        calculSommesPartielles(nombreParties-1);
        afficherHistoriqueScores();
        //gererLitige(nombreParties);
        //dernierLitige();
        //avantdernierLitige();
        //litigetotal();
    }
}

function analysePriseNote([a,b,c,d,e]){
    if (a==0 ||b == 314){
        totalNOUS = c;
        totalEUX = 404 + d ;
    }
    else if ( a == 314 || b == 0){
        totalNOUS = 404 + c;
        totalEUX = d ;
    }
    else {
        totalNOUS = a+c ;
        totalEUX = b+d
    } 
    //console.log("nous",totalNOUS,"eux",totalEUX," c ",c," d ",d); 
    return [totalNOUS,totalEUX,c,d,coeffPreneur]
}

function gains(a){
    if (a[4] == 0){
        partie =[0,0,0];
    }
    else {
    partie = [0,0];
    if ((a[0]>=a[1] & a[4]==1)||(a[0]<=a[1] & a[4]==-1)){
        partie = [a[0],a[1],0];
        if ( a[0]>a[1]){
            gagnants.push(1);
        }
        else if ( a[0]< a[1]){
            gagnants.push(-1);
        }
    }
    else if (a[0]<a[1] & a[4]==1 & a[1] != 404){
        partie = [a[2],314 + a[3],0];
        gagnants.push(-1);
    }
    else if(a[0]<a[1] & a[4]==1 & a[1] == 404){
        partie = [a[2],404 + a[3],0];
        gagnants.push(-1);

    }
    else if (a[0]>a[1] & a[4]==-1 & a[0] != 404){
        partie = [314 + a[2], a[3],0];
        gagnants.push(1)
    }
    else if (a[0]>a[1] & a[4]==-1 & a[0] == 404){
        partie = [404 + a[2], a[3],0];
        gagnants.push(1)
    }
    }
    if ((a[0]==a[1])&(a[0]!=0)){
        partie[2] = 1 ;
        gagnants.push(0);
    }
    console.log("partie -->",partie);
    console.log("preneurs  -> ",preneurs);
    console.log("gagnants  -->",gagnants);
    return partie
}

function calculSommesPartielles(nb){
    if (nb>0){
        for (j = 1 ; j < nb+1 ; j = j+1){
            historique[j][1]= historique[j-1][1]+historique[j][0];
            historique[j][3]= historique[j-1][3]+historique[j][2];
        }   
    }
}


function actualiserScores(partie){
    scoreApres = [partie[0],0,partie[1],0];
    historique.push(scoreApres);
    nombreParties=nombreParties+1;
}

function litigetotal(){
    for (i=2;i<nombreParties;i=i+1){
        console.log("partie n°",i)
    }
}

function litigetotal0(){
    if (nombreParties >= 2){
        for (j=nombreParties; j>1 ; j = j-1){
            console.log("gerer litige partie n°",j);
            gererLitige(j);
        }
    }
}

function litigetotal3(){
    if (nombreParties >= 2){
        console.log("nb parties",nombreParties);
        for (j=nombreParties; j>1 ; j = j-1){
            console.log("gerer litige partie n°",j);
            gererLitige(j);
            
        }
    }
}

function litigetotal1(){
    gererLitige(nombreParties);
    gererLitige(nombreParties-1);
    gererLitige(nombreParties-2);
    gererLitige(nombreParties-3);
}

function dernierLitige(){
    console.log(" litige partie n° ",nombreParties-1);
    gererLitige(nombreParties);
    gererLitige(nombreParties-1);
    gererLitige(nombreParties-2);
    gererLitige(nombreParties-3);
}

function avantdernierLitige(){
    console.log(" litige partie n° ",nombreParties-2);
    gererLitige(nombreParties-1);
    gererLitige(nombreParties-2);
    gererLitige(nombreParties-3);
}

function gererLitige(nombreParties){
    nb = nombreParties-2;
    if (nb >= 1){
        equipeQuiAPris = preneurs[nb];
        equipeQuiAPrisAvant = preneurs[nb-1];
        equipeQuiAGagne = gagnants[nb];
        equipeQuiAGagneAvant = gagnants[nb-1];
        litige = gagnants[nb-1];
        console.log("litige ? -> ",litige," partie n° ",nb);
        console.log("gagnants ->",gagnants);
        //if (litige ==0 & (equipeQuiAPrisAvant != equipeQuiAGagne)){
        if (litige ==0 & (equipeQuiAPrisAvant*equipeQuiAGagne==-1)){
            if ( equipeQuiAPrisAvant == 1){
                belotelitige = belote[nb-1];
                historique[nb]=[belotelitige[0],0,314+belotelitige[1],0];
                gagnants[nb-1]=-1;
            }
            else {
                belotelitige = belote[nb-1];
                historique[nb]=[314+belotelitige[0],0,belotelitige[1],0];
                gagnants[nb-1]=1
            }
        }
        console.log("colonne ->",nb-1);
        console.log("preneurs ->",preneurs);
        console.log("gagnants -->",gagnants);
        console.log("historique ",historique);
    }
    calculSommesPartielles(nombreParties-1);
    afficherHistoriqueScores();

}





function afficherHistoriqueScores(){
    if (nombreParties > 1){
        depart = 1;

    } else {
        depart = 0;

    }
    
    html = "<tr><td>partie n°</td>";
    for (j=depart;j<nombreParties;j=j+1){
        html = html+'<td>'+j+'</td>';
    }
    html = html + '</tr><td>NOUS</td>';
    for (j=depart;j<nombreParties;j=j+1){
        html = html + '<td>'+historique[j][0]+'</td>';
    }
    html = html + '</tr>'
    html = html + '</tr><td></td>';
    for (j=depart;j<nombreParties;j=j+1){
        html = html + '<td>'+historique[j][1]+'</td>';
    }
    html = html + '</tr>'
    html = html + '</tr><td>EUX</td>';
    for (j=depart;j<nombreParties;j=j+1){
        html = html + '<td>'+historique[j][2]+'</td>';
    }
    html = html + '</tr>'
    html = html + '</tr><td></td>';
    for (j=depart;j<nombreParties;j=j+1){
        html = html + '<td>'+historique[j][3]+'</td>';
    }
    html = html + '</tr>'

    
    document.getElementById('historiquescore').innerHTML = html ;
    console.log(historique);
    console.log("nombreParties ->",nombreParties) ;
}

function equipeBelote(){
    text = '<option value = 0>personne</option><option value = 1>NOUS</option><option value = -1>EUX</option><option value = 2>les deux</option>';
    document.getElementById('belote').innerHTML = text;
}

function equipeQUiPrend(){
    text = '<option value = 1>NOUS</option><option value = -1>EUX</option>';
    document.getElementById('preneur').innerHTML = text;
}


function supprimerDernierePartie(){
    historique.pop();
    belote.pop();
    gagnants.pop();
    preneurs.pop();
    nombreParties = nombreParties-1;
    afficherHistoriqueScores();

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
