function addFilterTag(selector, tagClass, closeButtonClass) {
  fetch('Data/recipes.json')
  .then(response => response.json())
  .then(data => {
    const parsedData = data;
    const filterTagsContainer = document.getElementById('filter-tags');

    // Ajouter un écouteur d'événements à chaque élément de la liste d'ingrédients
    const ingredientList = document.getElementById(selector);
    ingredientList.addEventListener('click', (event) => {
      const clickedIngredient = event.target;
      if (clickedIngredient.classList.contains('filter__' + tagClass + '--items')) {
        // Créer un élément de tag
        const tag = document.createElement('div');
        tag.classList.add('filter__tag' + tagClass);
        // Ajouter le nom de l'ingrédient au tag
        const tagText = document.createElement('span');
        tagText.classList.add('filter__tag-name');
        tagText.textContent = clickedIngredient.textContent;
        tag.appendChild(tagText);
        // Ajouter le bouton de suppression au tag
        const closeButton = document.createElement('i');
        closeButton.classList.add('fa-regular', 'fa-circle-xmark', 'filter__tags-' + closeButtonClass);
        closeButton.setAttribute('id', 'closeFilterIngredient')
        tag.appendChild(closeButton);
        // Ajouter le tag au conteneur de tags
        filterTagsContainer.appendChild(tag);
      }
    });

  })
}
addFilterTag('ingredients', 'ingredients', 'ingredient');
addFilterTag('Appareils', 'appliances', 'appareil');
addFilterTag('Ustensiles', 'ustensils', 'ustensils');
