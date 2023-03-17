function filterIngredient() {
    fetch('Data/recipes.json')
        .then(response => response.json())
        .then(data => {
            // Variables globales
            const parsedData = data;
            let selectedIngredients = [];
            // Fonction pour ajouter un écouteur d'événements à chaque élément de la liste d'ingrédients
            function addEventListenerToList(id, filterClass, filterFunction) {
                const ingredientList = document.getElementById(id);
                ingredientList.addEventListener('click', (event) => {
                    const clickedIngredient = event.target;
                    if (clickedIngredient.classList.contains(filterClass)) {
                        const ingredientName = clickedIngredient.textContent.trim();
                        if (!selectedIngredients.includes(ingredientName)) {
                            selectedIngredients.push(ingredientName);
                        }
                        let filteredRecipes = parsedData;
                        for (let i = 0; i < selectedIngredients.length; i++) {
                            filteredRecipes = filterFunction(filteredRecipes, selectedIngredients[i]);
                        }
                        displayRecipes(filteredRecipes);
                    }
                });
            }

            // Fonction pour filtrer les recettes en fonction des ingrédients sélectionnés
            function filterRecipesByIngredients(recipes, selectedIngredient) {
                return recipes.filter(recipe => {
                    return recipe.ingredients.some(ingredient => {
                        return ingredient.ingredient.toLowerCase().includes(selectedIngredient.toLowerCase())
                    });
                });
            }

            // Fonction pour filtrer les recettes en fonction de l'appareil sélectionné
            function filterRecipesByAppliance(recipes, selectedAppliance) {
                return recipes.filter(recipe => {
                    return recipe.appliance.toLowerCase().includes(selectedAppliance.toLowerCase())
                });
            }

            // Fonction pour filtrer les recettes en fonction des ustensiles sélectionnés
            function filterRecipesByUstensils(recipes, selectedUstensil) {
                return recipes.filter(recipe => {
                    return recipe.ustensils.some(ustensil => {
                        return ustensil.toLowerCase().includes(selectedUstensil.toLowerCase())
                    });
                });
            }

            // Ajouter un écouteur d'événements à chaque liste d'ingrédients
            addEventListenerToList('ingredients', 'filter__ingredients--items', filterRecipesByIngredients);
            addEventListenerToList('Appareils', 'filter__appliances--items', filterRecipesByAppliance);
            addEventListenerToList('Ustensiles', 'filter__ustensils--items', filterRecipesByUstensils);


            // Créer une fonction pour filtrer les recettes en fonction des tags sélectionnés
            function filterRecipes(tagType) {
                const filterTagsContainer = document.getElementById('filter-tags');
                filterTagsContainer.addEventListener('click', (event) => {
                    const clickedCloseButton = event.target;
                    if (clickedCloseButton.classList.contains(`filter__tags-${tagType}`)) {
                        // Supprimer le tag sélectionné de la liste des tags sélectionnés
                        const tagText = clickedCloseButton.parentNode.querySelector('.filter__tag-name').textContent;
                        selectedIngredients = selectedIngredients.filter(ingredientName => ingredientName !== tagText);

                        // Filtrer les recettes en fonction des tags sélectionnés
                        let filteredRecipes = parsedData;
                        for (let i = 0; i < selectedIngredients.length; i++) {
                            filteredRecipes = filteredRecipes.filter(recipe => {
                                if (tagType === 'ingredient') {
                                    return recipe.ingredients.some(ingredient => {
                                        return ingredient.ingredient.toLowerCase().includes(selectedIngredients[i].toLowerCase());
                                    });
                                } else if (tagType === 'appareil') {
                                    return recipe.appliance.toLowerCase().includes(selectedIngredients[i].toLowerCase());
                                } else if (tagType === 'ustensils') {
                                    return recipe.ustensils.some(ustensils => {
                                        return ustensils.toLowerCase().includes(selectedIngredients[i].toLowerCase());
                                    });
                                }
                            });
                        }

                        // Afficher les recettes filtrées
                        displayRecipes(filteredRecipes);

                        // Supprimer le tag parent du bouton de suppression
                        clickedCloseButton.parentNode.remove();
                    }
                });
            }

            // Appeler la fonction pour chaque type de tag
            filterRecipes('ingredient');
            filterRecipes('appareil');
            filterRecipes('ustensils');



            function searchInput(inputId, listId) {
                // Récupérer l'élément input et la liste
                const input = document.getElementById(inputId);
                const list = document.getElementById(listId).getElementsByTagName('li');
            
                // Fonction qui recherche les ingrédients dans la liste
                function searchList() {
                    // Récupérer la valeur de l'input
                    const inputValue = input.value.toLowerCase();
                    if (inputValue.length >= 3) {
                        // Parcourir la liste des ingrédients
                        for (let i = 0; i < list.length; i++) {
                            const ingredient = list[i].textContent.toLowerCase();
            
                            // Vérifier si l'ingrédient contient la valeur de l'input
                            if (ingredient.includes(inputValue)) {
                                list[i].style.display = '';
                            } else {
                                list[i].style.display = 'none';
                            }
                        }
                    } else {
                        // Si la valeur de l'input est inférieure à 3 caractères, réinitialiser la liste
                        for (let i = 0; i < list.length; i++) {
                            list[i].style.display = '';
                        }
                    }
                }
            
                input.addEventListener('input', searchList);
            }
            
            // Appeler la fonction pour chaque groupe d'éléments à rechercher
            searchInput('inputingredients', 'ingredients');
            searchInput('inputappliances', 'Appareils');
            searchInput('inputustensils', 'Ustensiles');
            



            function dropdown(elementId, inputId, containerId, headerId, colorClass) {
                const openDropdown = document.getElementById('open' + elementId);
                openDropdown.addEventListener('click', function () {
                    document.getElementById('input' + inputId).style.display = 'flex';
                    document.getElementById(containerId).style.display = 'flex';
                    document.getElementById('close' + elementId).style.display = 'flex';
                    document.getElementById(headerId).style.display = 'none';
                    document.querySelector('.' + colorClass).classList.replace('filter__' + inputId + '--close', 'filter__' + inputId + '--view');
                });

                const closeDropdown = document.getElementById('close' + elementId);
                closeDropdown.addEventListener('click', function () {
                    document.getElementById('input' + inputId).style.display = 'none';
                    document.getElementById(containerId).style.display = 'none';
                    document.getElementById('close' + elementId).style.display = 'none';
                    document.getElementById(headerId).style.display = 'flex';
                    document.querySelector('.' + colorClass).classList.replace('filter__' + inputId + '--view', 'filter__' + inputId + '--close');
                });
            }

            dropdown('Ingredient', 'ingredients', 'ingredients', 'headerIngredient', 'colorBlue');
            dropdown('Appareil', 'appliances', 'Appareils', 'headerAppareil', 'colorGreen');
            dropdown('Ustensil', 'ustensils', 'Ustensiles', 'headerUstensil', 'colorOrange');

        }).catch(error => console.error('Erreur lors du chargement du fichier JS', error));
}

filterIngredient()


// algo fojctionnel filter some 

// algo natif for if else include