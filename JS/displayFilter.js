function filterRecipes(){
  fetch('Data/recipes.json')
  .then(response => response.json())
  .then(data => {
    // On crée une constante parsedData qui va stocker les données passées en paramètre
    const parsedData = data; 

    // On crée trois sets vides pour stocker les ingrédients, ustensiles et appareils de cuisine
    const ingredientsSet = new Set();
    const ustensilsSet = new Set();
    const appareilsSet = new Set();

    // Pour chaque recette dans les données, on va parcourir les ingrédients, les ustensiles et les appareils
    parsedData.forEach(recipe => {

      // Pour chaque ingrédient dans la recette, on va créer un élément de filtre s'il n'existe pas déjà
      recipe.ingredients.forEach(ingredient => {
        const name = ingredient.ingredient;
        if (!ingredientsSet.has(name)) {
          const ingredientItem = createFilterItem('li', name, 'filter__ingredients--items');
          ingredientsSet.add(name);
          document.getElementById('ingredients').appendChild(ingredientItem);
        }
      });

      // Pour chaque ustensile dans la recette, on va créer un élément de filtre s'il n'existe pas déjà
      recipe.ustensils.forEach(ustensil => {
        if (!ustensilsSet.has(ustensil)) {
          const ustensilItem = createFilterItem('li', ustensil, 'filter__ustensils--items');
          ustensilsSet.add(ustensil);
          document.getElementById('Ustensiles').appendChild(ustensilItem);
        }
      });

      // On vérifie s'il y a un appareil de cuisine dans la recette, et on crée un élément de filtre s'il n'existe pas déjà
      const appareil = recipe.appliance;
      if (!appareilsSet.has(appareil)) {
        const appareilItem = createFilterItem('li', appareil, 'filter__appliances--items');
        appareilsSet.add(appareil);
        document.getElementById('Appareils').appendChild(appareilItem);       
      }              
    });

    // On crée une fonction générique pour créer un élément de filtre à partir de son nom, tag et classe
    function createFilterItem(tagName, text, className) {
      const item = document.createElement(tagName);
      item.innerHTML = text;
      item.setAttribute('class', className);
      return item;
    }
  }).catch(error => console.error('Erreur lors du chargement du fichier JS', error));
}

function displayRecipes(recipes) {
  const container = document.getElementById('recette')
  container.innerHTML = '' // vide le html

  if (recipes.length === 0) {
    const noRecipeMessage = document.createElement('p');
    noRecipeMessage.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc...';
    noRecipeMessage.classList.add('noRecette')
    container.classList.remove('recette')
    container.appendChild(noRecipeMessage);
  } else if (recipes) {
    console.log(recipes); // vérification : affiche les recettes qui vont être affichées
    container.classList.add('recette')
    recipes.forEach(recipe => {
      const recipeElement = createRecipeElement(recipe)
      container.appendChild(recipeElement)
    })
  }
}



filterRecipes()
