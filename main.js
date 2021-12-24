    var table = document.getElementById("table");
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


    class Ouvrage{
        constructor(Titre,Auteur,Email,Prix,Date,Type,Langue){
            this.titre = Titre;
            this.auteur = Auteur;
            this.email = Email;
            this.prix = Prix;
            this.date = Date;
            this.langue = Langue;
            this.type = Type;
        }

        détailOuvrage(){
            return "L'ouvrage est un "+this.type+" en langue "+this.langue+", écrit par "+this.auteur+" et publié le "+this.date+". Le prix de "+this.titre+" est de "+this.prix+"."

        }
    }
    // Trier la liste listeOuvrages
        function trier(){
            listeOuvrages.sort(function(a,b){
                if(a.titre < b.titre){
                    return -1;
                }
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
        listeTemp = JSON.parse(localStorage.getItem("liste"));
        if (listeTemp != null){
            
            for(i=0;i<listeTemp.length;i++){
                var infoOuvrages = new books(listeTemp[i].titre, listeTemp[i].auteur, listeTemp[i].email, listeTemp[i].price, listeTemp[i].date, listeTemp[i].language, list_temp[i].type)
                listeTemp.push(infoOuvrages);
            }
        }

        ///////////-Tableau/insertCell-///////////////
        if(validationErrors == 0){
            var index = select.selectedIndex;
            var unObjet = new Ouvrage(titre.value,auteur.value,email.value,prix.value,date.value,select.options[index].value,document.querySelector("input[name='choix']:checked").value);
            listeOuvrages.push(unObjet);
            localStorage.setItem("liste", JSON.stringify(listeOuvrages));
            trier();
            charger();
            // Vider la table HTML
            table.innerHTML = "";
            // Charger les titres
            table.innerHTML = `<th>Titre</th>
                                <th>Auteur</th>
                                <th>Email de l'auteur</th>
                                <th>Prix</th>
                                <th>Date de publication</th>
                                <th>Type</th>
                                <th>Langue</th>
                                <th>Actions</th>
                                `;

            // Charger la table HTML depuis listeOuvrages

        function charger() {
            
            for(i=0; i<listeOuvrages.length; i++){
                var newRow = table.insertRow(-1);
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
                newRow.insertCell(-1).innerHTML = "<input onClick='Edit(this)' type='button' value='Modifier'><input type='button' value='Supprimer' onClick = 'Delete(this)'>";
            }
        }
        charger();        


                // tu continues ainsi pour les autres cellules
            
            // var newRow = table.insertRow(-1);
            // var cell1 = newRow.insertCell(0);
            // var cell2 = newRow.insertCell(1);
            // var cell3 = newRow.insertCell(2);
            // var cell4 = newRow.insertCell(3);
            // var cell5 = newRow.insertCell(4);
            // var cell6 = newRow.insertCell(5);
            // var cell7 = newRow.insertCell(6);
            // var cell8 = newRow.insertCell(7);
            
            var cellType="";

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
    
        function Delete(td){
            if (confirm('Êtes-vous sûre de supprimer cette entrée?')) {
            row = td.parentElement.parentElement;
            document.getElementById("table").deleteRow(row.rowIndex);

        }}

        // Edit function;
        function Edit(r){
            var i = r.parentNode.parentNode.rowIndex;
            var row = table.rows[i];
            if(r.value == "Modifier"){
                inputs[0].value = row.cells[0].innerHTML;
                inputs[1].value = row.cells[1].innerHTML;
                inputs[2].value = row.cells[2].innerHTML;
                inputs[3].value = row.cells[3].innerHTML;
                inputs[4].value = row.cells[4].innerHTML;

                // Language
                if(row.cells[5].innerHTML == "Anglais"){
                    select.selectedIndex = 1;
                }
                else if(row.cells[5].innerHTML == "Anglais"){
                    select.selectedIndex = 2;
                }
                else{
                    select.selectedIndex = 3;
                }

                // Type
                for(var i=0;i<type.length;i++){
                    if(row.cells[6].innerHTML==type[i].value){
                    type[i].checked = true;
                    }
                }
                r.value="Sauvegarder"
                document.getElementById("Soumettre").setAttribute("disabled","true");
            }
            else{
                row.cells[0].innerHTML = document.getElementById("titre").value;
                row.cells[1].innerHTML = document.getElementById("auteur").value;
                row.cells[2].innerHTML = document.getElementById("email").value;
                row.cells[3].innerHTML = document.getElementById("prix").value;
                row.cells[4].innerHTML = document.getElementById("date").value;
                row.cells[5].innerHTML = document.getElementById("Langues").value;
               
                //Nada helped me understand localStorage
               
                var listeTemp = "";
                for(i=0;i<type.length;i++){
                    if(type[i].checked){
                        // row.cells[6]
                        listeTemp = type[i].value;
                    }
                }
                r.value = "Modifier";
                document.getElementById("Soumettre").removeAttribute("disabled")
                inputs[0].value=""
                inputs[1].value=""
                inputs[2].value=""
                inputs[3].value=""
                inputs[4].value=""
                inputs[5].value=""
                inputs[6].value=""

            }     }    
        document.getElementsByTagName("form")[0].addEventListener("submit", validateForm);
            // couldn't get it to work with the previous version
            //I had to call the form with its TagName instead of its Id 
            //Zoubair helped me to get it back   
