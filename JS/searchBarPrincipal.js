// searchBar en utilisant un algo natif
/* function searchBarPrincipal() {
    fetch('Data/recipes.json')
        .then(response => response.json())
        .then(data => {
            // Variables globales
            const searchInput = document.getElementById('searchPrincipal');
            const recipes = data

            const showMatchingRecipes = () => {
              const searchTerm = searchInput.value.toLowerCase();
              const matchingRecipes = recipes.filter(recipe => {
                  const recipeTitle = recipe.name.toLowerCase();
                  const recipeDescription = recipe.description.toLowerCase();
                  const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');

                  return recipeTitle.includes(searchTerm) || recipeDescription.includes(searchTerm) || recipeIngredients.includes(searchTerm);
              });
              displayRecipes(matchingRecipes);
            };

            searchInput.addEventListener('keyup', showMatchingRecipes);
        });
}

searchBarPrincipal(); */ 



// searchBar en utilisant un algo fonctionnel d'ailleurs sur jsBench c'est le meilleurs.
function searchBarPrincipal() {
    fetch('Data/recipes.json')
        .then(response => response.json())
        .then(data => {
            const recipes = data

        // Récupérer les éléments du DOM
        const searchInput = document.getElementById('searchPrincipal');
        const recipesContainer = document.getElementById('recette');

        // Écouter l'événement 'keyup' sur l'input de recherche
        searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const matchingRecipes = [];

        // Parcourir la liste des recettes et ajouter celles qui correspondent au terme de recherche
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const recipeTitle = recipe.name.toLowerCase();
            const recipeDescription = recipe.description.toLowerCase();
            const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join(' ');

            if (recipeTitle.includes(searchTerm) || recipeDescription.includes(searchTerm) || recipeIngredients.includes(searchTerm)) {
            matchingRecipes.push(recipe);
            }
        }

        // Afficher les recettes correspondantes dans le conteneur des recettes
        displayRecipes(matchingRecipes);
        });
    });
}
searchBarPrincipal();


