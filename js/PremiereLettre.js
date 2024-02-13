const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", function() {
  const letter = document.getElementById("letter").value;
  const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;

  fetch(API_URL)
    .then(response_3 => response_3.json())
    .then(data_3 => {
      const cocktails = data_3.drinks;
      let cocktailsHTML = "";
      cocktailsHTML += `
        <table>
          <tr>
            <th>Nom du Cocktail</th>
            <th class="img-cocktail">Images du Cocktail</th>
            <th>Ingrédients</th>
            <th class="ingr-cocktail">Instructions</th>
          </tr>
      `;
      for (let i = 0; i < cocktails.length; i++) {
        let cocktail = cocktails[i];
        let ingredientsHTML = "";
        for (let j = 1; j <= 15; j++) {
          let ingredient = cocktail[`strIngredient${j}`];
          if (ingredient) {
            ingredientsHTML += `<li>${ingredient}</li>`;
          }
        }
        cocktailsHTML += `
          <html>
            <head>
              <meta charset="UTF-8" />
              <link rel="stylesheet" href="../css/PremiereLettre.css"/>
            </head>
            <body>
              <tr>
                <td class="name-cocktail">${cocktail.strDrink}</td>
                <td><img class="img-cocktail" src=${cocktail.strDrinkThumb}></td>
                <td><ul>${ingredientsHTML}</ul></td>
                <td class="ingr-cocktail">${cocktail.strInstructions}</td>
              </tr>
            <script src="../js/PremiereLettre.js"></script>
            </body>
          </html>      
        `;
      }
      cocktailsHTML += `</table>`;
      document.write(cocktailsHTML);
    });
});

         cocktailsHTML += `
        <html>
          <head>
            <meta charset="UTF-8" />
            <link rel="stylesheet" href="../css/RechercheLettre.css"/>
        </head>
        <body>
          <img src=${cocktail.strDrinkThumb}>
          <h2>${cocktail.strDrink}</h2>
          <h3>Ingredients:</h3>
          <ul class="ingredients"></ul>
          <h3>Instructions:</h3>
          <p>${cocktail.strInstructions}</p>
        </body>
        `;