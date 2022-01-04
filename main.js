    var table = document.getElementById("table");
    var tbody = document.getElementById("tbody");
    var titre = document.getElementById("titre");
    var auteur = document.getElementById("auteur");
    var email = document.getElementById("email");
    var prix = document.getElementById("prix");
    var date = document.getElementById("date")
    var type = document.getElementsByName("choix");
    var select = document.getElementById("Langues");
    var check = document.getElementsByClassName("check");
    var small = document.getElementById("small");
    var small2 = document.getElementById("small2")
    var smol = document.getElementById("smol");
    var form = document.getElementById("form");
    var inputs = document.getElementsByTagName("input");
    var listeOuvrages = [];
    var detailOuvrage = document.getElementById("dtls")
    var printBtn = document.getElementById("print")


    class Ouvrage{
        constructor(Titre,Auteur,Email,Prix,Date,Langue,Type){
            this.titre = Titre;
            this.auteur = Auteur;
            this.email = Email;
            this.prix = Prix;
            this.date = Date;
            this.langue = Langue;
            this.type = Type;
        }

        detailOuvrage(){
            return "L'ouvrage "+this.titre+" est un "+this.type+" en langue "+this.langue+", écrit par "+this.auteur+" et publié le "+this.date+". Le prix de "+this.titre+" est de "+this.prix+"MAD."

        }
    }

    // charger la table HTML depuis le localStorage
    // // getItem
        var listeTemp = JSON.parse(localStorage.getItem("liste"));
        if (listeTemp != null){
        
            for(i = 0 ; i < listeTemp.length ; i++){
                var infoOuvrages = new Ouvrage(listeTemp[i].titre, listeTemp[i].auteur, listeTemp[i].email, listeTemp[i].prix, listeTemp[i].date, listeTemp[i].langue, listeTemp[i].type)
                listeOuvrages.push(infoOuvrages);
            }
        }

    // Trier la liste listeOuvrages
        function trier(){
            listeOuvrages.sort(function(a,b){
                if(a.titre < b.titre){
                    return -1;
                }
                else if(a.titre > b.titre){
                    return 1;
                }
                else
                    return 0;
            })
        }


        function validateForm(e){
    
    e.preventDefault();
    var validationErrors = 0;
    

    // Tester si les champs sont vides
    for(var i=0;i<5; i++){
        if(inputs[i].value == ""){
            validationErrors++;
            inputs[i].nextElementSibling.style.color = "red";
            inputs[i].nextElementSibling.innerHTML = "Ce champ ne peux pas rester vide!";
        }   
    else{
        inputs[i].nextElementSibling.style.color = "green";
        inputs[i].nextElementSibling.innerHTML = "Champ Valide";
    }
    }

    // Tester le champ titre
    if(inputs[0].value != ""){
        if(!isNaN(inputs[0].value)){
            validationErrors++;
            inputs[0].nextElementSibling.style.color = "red";
            inputs[0].nextElementSibling.innerHTML = "Ce n'est pas un titre!";
        }
        else if(!isNaN(inputs[0].value) && inputs[0].value.trim().length > 30)
        {
            inputs[0].nextElementSibling.style.color = "red";
            validationErrors++;
            inputs[0].nextElementSibling.innerHTML = "Le titre ne doit pas dépasser 30 caractères";
        }
        else{
            inputs[0].nextElementSibling.style.color = "green";
            inputs[0].nextElementSibling.innerHTML = "Champ valide";
        }
    }

    // Tester le champ auteur
    if(inputs[1].value != ""){
        if(!isNaN(inputs[1].value)){
            validationErrors++;
            inputs[1].nextElementSibling.style.color = "red";
            inputs[1].nextElementSibling.innerHTML = "Ce n'est pas un auteur!";
        }
        else if(isNaN(inputs[1].value) && inputs[1].value.trim().length > 30)
        {
            validationErrors++;
            inputs[1].nextElementSibling.style.color = "red";
            inputs[1].nextElementSibling.innerHTML = "Le nom de l'auteur ne doit pas dépasser 30 caractères";
        }
        else{
            inputs[1].nextElementSibling.style.color = "green";
            inputs[1].nextElementSibling.innerHTML = "Champ valide";
        }
    }
    // Champ email
        regEmail = /\S+@[a-z]+\.[a-z]/;
        ;
        if(inputs[2].value !=""){
            
            if(regEmail.test(inputs[2].value)){
                small2.innerHTML = "Champ valide";
                small2.style.color = "green";
            }
            else{
                small2.innerHTML = "Veuillez saisir une propre addresse email"; 
                small2.style.color = "red";
            }
        }
        

    // Tester le champ prix
        regPrix = /^[0-9]+((\.[0-9]{2})|())$/

        if(inputs[3].value !=""){
            
            if(regPrix.test(inputs[3].value)){
                small2.innerHTML = "Champ valide"
                small2.style.color = "green"
            }
            else{
                small2.innerHTML = "Veuillez saisir un propre prix"
                small2.style.color = "red"
            }
        }
    
    // Tester le champ langue
        if(select.value == ""){
            validationErrors++;
            select.nextElementSibling.innerHTML = "Sélectionnez une langue";
            select.nextElementSibling.style.color = "red";
        }
        else{
            select.nextElementSibling.innerHTML = "Champ valide";
            select.nextElementSibling.style.color = "green";
        }
        //Tester le champ type
        if(!(type[0].checked || type[1].checked || type[2].checked)){
            validationErrors++;
            small.style.color = "red"
            small.innerHTML = "Veuillez cocher votre type"
        }
        else{
            small.style.color = "green"
            small.innerHTML = "Champ valide"
        }
        
        //Local storage
        // listeTemp = JSON.parse(localStorage.getItem("liste"));
        // if (listeTemp != null){
            
        //     for(i=0;i<listeTemp.length;i++){
        //         var infoOuvrages = new Ouvrage(listeTemp[i].titre, listeTemp[i].auteur, listeTemp[i].email, listeTemp[i].price, listeTemp[i].date, listeTemp[i].language, listeTemp[i].type)
        //         listeTemp.push(Ouvrage);
        //     }
        // }

        ///////////-Tableau/insertCell-///////////////
        if(validationErrors == 0){
            var index = select.selectedIndex;
            var unObjet = new Ouvrage(titre.value,auteur.value,email.value,prix.value,date.value,select.options[index].value,document.querySelector("input[name='choix']:checked").value);
            detailOuvrage.innerHTML = unObjet.detailOuvrage();
            listeOuvrages.push(unObjet);
            localStorage.setItem("liste", JSON.stringify(listeOuvrages));
            trier();
            //Ceci est inclut dans la fonction charger().
            // // Vider la table HTML
            // table.innerHTML = "";
            
            // // Charger les titres
            // table.innerHTML = `<th>Titre</th>
            //                     <th>Auteur</th>
            //                     <th>Email de l'auteur</th>
            //                     <th>Prix</th>
            //                     <th>Date de publication</th>
            //                     <th>Type</th>
            //                     <th>Langue</th>
            //                     <th>Actions</th>
            //                     `;

                                
            charger();

            // Charger la table HTML depuis listeOuvrages
            
            // var newRow = table.insertRow(-1);
            // var cell1 = newRow.insertCell(0);
            // var cell2 = newRow.insertCell(1);
            // var cell3 = newRow.insertCell(2);
            // var cell4 = newRow.insertCell(3);
            // var cell5 = newRow.insertCell(4);
            // var cell6 = newRow.insertCell(5);
            // var cell7 = newRow.insertCell(6);
            // var cell8 = newRow.insertCell(7);
            
            // var cellType="";

                // for(i=0;i<type.length;i++)
                // {
                //     if(check[i].checked)
                //     {
                //         cellType = check[i].value;
                //     }
                // }
                
                // cell1.innerHTML = inputs[0].value;
                // cell2.innerHTML = inputs[1].value;
                // cell3.innerHTML = inputs[2].value;
                // cell4.innerHTML = inputs[3].value;
                // cell5.innerHTML = inputs[4].value;
                // cell6.innerHTML = inputs[5].value;
               
            //                                     //   `<a onClick="onEdit(this)">Edit</a>
            // //                                      //<a onClick="onDelete(this)">Delete</a>`;                      
                
                
                
            
    
        }
    }

    function charger() {
        // Vider la table
        table.innerHTML = "";

        // Ajouter l'entete
        table.innerHTML =  `<th>Titre</th>
                            <th>Auteur</th>
                            <th>Email de l'auteur</th>
                            <th>Prix</th>
                            <th>Date de publication</th>
                            <th>Langue</th>
                            <th>Type</th>
                            <th>Actions</th>`;
            
        // Charger les données
        for(i=0; i<listeOuvrages.length; i++){
            var newRow = table.insertRow();
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);
            var cell6 = newRow.insertCell(5);
            var cell7 = newRow.insertCell(6);
            // var cell8 = newRow.insertCell(7);

            cell1.innerHTML = listeOuvrages[i].titre;
            cell2.innerHTML = listeOuvrages[i].auteur;
            cell3.innerHTML = listeOuvrages[i].email;
            cell4.innerHTML = listeOuvrages[i].prix;
            cell5.innerHTML = listeOuvrages[i].date;
            cell6.innerHTML = listeOuvrages[i].langue;
            cell7.innerHTML = listeOuvrages[i].type;
            newRow.insertCell(-1).innerHTML = "<input onClick='Edit(this)' type='button' value='Modifier'><input id='deleteBtn' type='button' value='Supprimer' onClick = 'Delete(this)'>";
        }
    } 

    // Delete function v2;
    function Delete(r) {
        if(confirm('Êtes-vous sûre de supprimer cette entrée?')){
            
            // var i = r.parentElement.parentElement.style.color = "red";
            // document.getElementById("table").deleteRow(this.i);
            // var thisRow = document.getElementById("deleteBtn").parentElement.parentElement.rowIndex
            //var i = r.parentNode.parentNode.rowIndex-1;
            // (i-1,1)

            var i = r.parentElement.parentElement.rowIndex;
            
            listeOuvrages.splice(i-1,1);

        // thisRow.remove(this.thisRow);

            trier();

            localStorage.setItem("liste", JSON.stringify(listeOuvrages));
            
            charger();
        }
    }
        // v1 function Delete(td){
        //     if (confirm('Êtes-vous sûre de supprimer cette entrée?')) {
        //     row = td.parentElement.parentElement;
        //     document.getElementById("table").deleteRow(row.rowIndex);

        // }}

        // Edit function v2;
        function editRow(r) {
            var i = r.parentNode.parentNode.rowIndex-1;
            var delDisable = r.nextElementSibling;
            var row = table.rows[i];
            if (r.value == "Modifier") {
                
                // Type
                titre.value = row.cells[0].innerHTML;
                auteur.value = row.cells[1].innerHTML;
                email.value = row.cells[2].innerHTML;
                prix.value = row.cells[3].innerHTML;
                date.value = row.cells[4].innerHTML;
                langue.value = row.cells[5].innerHTML;
                
                for (var i = 0; i < type.length; i++) {
                    if (row.cells[6].innerHTML == type[i].value) {
                        type[i].checked = true;
                    }
                }
                r.value = "Sauvegarder";
                delDisable.setAttribute("disabled", "true");
                document.getElementById("Soumettre").setAttribute("disabled", "true");
            }
            else {
                listeOuvrages[i].titre = titre.value;
                listeOuvrages[i].auteur = auteur.value;
                listeOuvrages[i].email = email.value;
                listeOuvrages[i].prix = prix.value;
                listeOuvrages[i].date = date.value;
                listeOuvrages[i].langue = langue.value;
                for (var k = 0; k < type.length; k++) {
                    if (type[k].checked) {
                        listeOuvrages[i].type = type[k].value;
                    }
                }
            }
            
        }

        // v1 function Edit(r){
        //     var i = r.parentNode.parentNode.rowIndex;
        //     var row = table.rows[i];
        //     if(r.value == "Modifier"){
        //         inputs[0].value = row.cells[0].innerHTML;
        //         inputs[1].value = row.cells[1].innerHTML;
        //         inputs[2].value = row.cells[2].innerHTML;
        //         inputs[3].value = row.cells[3].innerHTML;
        //         inputs[4].value = row.cells[4].innerHTML;

        //         // Language
        //         if(row.cells[5].innerHTML == "Anglais"){
        //             select.selectedIndex = 1;
        //         }
        //         else if(row.cells[5].innerHTML == "Anglais"){
        //             select.selectedIndex = 2;
        //         }
        //         else{
        //             select.selectedIndex = 3;
        //         }

        //         // Type
        //         for(var i=0;i<type.length;i++){
        //             if(row.cells[6].innerHTML==type[i].value){
        //             type[i].checked = true;
        //             }
        //         }
        //         r.value="Sauvegarder"
        //         document.getElementById("Soumettre").setAttribute("disabled","true");
        //     }
        //     else{
        //         row.cells[0].innerHTML = document.getElementById("titre").value;
        //         row.cells[1].innerHTML = document.getElementById("auteur").value;
        //         row.cells[2].innerHTML = document.getElementById("email").value;
        //         row.cells[3].innerHTML = document.getElementById("prix").value;
        //         row.cells[4].innerHTML = document.getElementById("date").value;
        //         row.cells[5].innerHTML = document.getElementById("Langues").value;
               
                //Nada has helped me understand localStorage
               
                // var listeTemp = "";
                // for(i=0;i<type.length;i++){
                //     if(type[i].checked){
                //         // row.cells[6]
                //         listeTemp = type[i].value;
                //     }
                // }
        //         r.value = "Modifier";
        //         document.getElementById("Soumettre").removeAttribute("disabled")
        //         inputs[0].value=""
        //         inputs[1].value=""
        //         inputs[2].value=""
        //         inputs[3].value=""
        //         inputs[4].value=""
        //         inputs[5].value=""
        //         inputs[6].value=""

        //     } } 

        form.addEventListener("submit", validateForm);
        
    //   Bouton imprimer
    
    function printBt(){
        var tmpDiv = printBtn.innerHTML;
        var tmpBody = document.body.innerHTML;
        document.body.innerHTML = tmpDiv;
        window.print();
        document.body.innerHTML = tmpBody;
    }
