function createRecipeElement(recipe) {
  const recipeContainer = document.createElement('article')
  recipeContainer.setAttribute('class', 'divContainerRecipe')

  const divForBackground = document.createElement('div')
  divForBackground.setAttribute('class', 'divBackground')

  const divContainerAll = document.createElement('div')
  divContainerAll.setAttribute('class', 'divAll')

  const divForNameAndTime = document.createElement('div')
  divForNameAndTime.setAttribute('class', 'divNameAndTime')

  const nameRecipe = document.createElement('p')
  nameRecipe.innerHTML = recipe.name

  const timeRecipe = document.createElement('p')
  timeRecipe.innerHTML = `${recipe.time} min`

  const iconTime = document.createElement('i')
  iconTime.setAttribute('class', 'fa-regular fa-clock')
  iconTime.setAttribute('id', "timerIcon")

  const divDescriptionEtIngredient = document.createElement('div')
  divDescriptionEtIngredient.setAttribute('class', 'divDescriptionAndIngredient')

  const ingredientRecipe = document.createElement('ul')
  const ingredients = recipe.ingredients

  for (let j = 0; j < ingredients.length; j++) {
    const ingredientItem = document.createElement('li')
    ingredientItem.setAttribute('id', 'recipe__ingredient')
    const ingredient = ingredients[j]
    const quantity = ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : ''
    const name = ingredient.ingredient
    ingredientItem.innerHTML = `<span class='ingredientName'>${name} :</span> ${quantity}`
    ingredientRecipe.appendChild(ingredientItem)
  }

  const description = document.createElement('p')
  description.setAttribute('class', 'pDescription')
  description.innerHTML = recipe.description

  divForNameAndTime.appendChild(nameRecipe)
  divForNameAndTime.appendChild(iconTime)
  divForNameAndTime.appendChild(timeRecipe)
  divDescriptionEtIngredient.appendChild(ingredientRecipe)
  divDescriptionEtIngredient.appendChild(description)
  divContainerAll.appendChild(divForNameAndTime)
  divContainerAll.appendChild(divDescriptionEtIngredient)
  recipeContainer.appendChild(divForBackground)
  recipeContainer.appendChild(divContainerAll)

  return recipeContainer
}

function fetchData() {
  fetch('Data/recipes.json')
    .then(response => response.json())
    .then(data => {
      const recipes = data
      const getIdRecipe = document.getElementById('recette')

      for (let i = 0; i < recipes.length; i++) {
        const recipeElement = createRecipeElement(recipes[i])
        getIdRecipe.appendChild(recipeElement)
      }

      // Réinitialiser la liste de recettes une fois les données chargées
    })
    .catch(error => console.error('Erreur lors du chargement du fichier JS', error))
}

fetchData();

