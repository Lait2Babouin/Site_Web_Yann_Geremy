/* --- cible la troisième lettre d'un ol --- */
const lis = document.querySelectorAll('ol li');

lis.forEach(li => {
  const text = li.textContent;
  const thirdLetter = text[4];
  const newHTML = text.replace(thirdLetter, `<span style="color: rgb(180, 5, 5); font-size: 50px;">${thirdLetter}</span>`);
  li.innerHTML = newHTML;
});

/* DEBUT COKTAIL ALEATOIRE */
function getRandomCocktail(){
	fetch('https://www.theaudiodb.com/api/v1/json/2/search.php?s=coldplay')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log("Il semblerait qu'il y est un problème : " +
          response.status);
        return;
      }

      response.json().then(function(data) {
        displayRandomCocktail(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
getRandomCocktail();

function displayRandomCocktail(cocktail){
	console.log(cocktail.drinks[0]);

	let drinkSection = document.querySelector('#drink-section');
	drinkSection.innerHTML = '';

	let drinkName = document.createElement('h2');
	drinkName.innerHTML = cocktail.drinks[0].strDrink;

	drinkSection.appendChild(drinkName);

	let img = document.createElement('img');
	img.src = cocktail.drinks[0].strDrinkThumb;

	drinkSection.appendChild(img);

	for(let i=1; i<16; i++){
		console.log();

		if(cocktail.drinks[0][`strIngredient${i}`] == null || cocktail.drinks[0][`strIngredient${i}`] == '' ){
			break;
		}

		let ingredient = document.createElement('ons-list-item');
		ingredient.innerHTML = cocktail.drinks[0][`strMeasure${i}`] + ': ' + cocktail.drinks[0][`strIngredient${i}`];

		drinkSection.appendChild(ingredient);
	}

	let card = document.createElement('ons-card');
	card.innerHTML = cocktail.drinks[0].strInstructions;

	drinkSection.appendChild(card);

}
/* FIN COKTAIL ALEATOIRE */

/* DEBUT COKTAIL PAR SA PREMIERE LETTRE */
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
let getInfo = () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3 class="msg">Veuillez saisir le nom d'un cocktail</h3>`;
  } else {
    fetch(url + userInp)
      .then((responses) => responses.json())
      .then((datas) => {
        document.getElementById("user-inp").value = "";
        console.log(datas);
        console.log(datas.drinks[0]);
        let myDrink = datas.drinks[0];
        console.log(myDrink.strDrink);
        console.log(myDrink.strDrinkThumb);
        console.log(myDrink.strInstructions);
        let count = 1;
        let ingredients = [];
        for (let i in myDrink) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myDrink[i]) {
            ingredient = myDrink[i];
            if (myDrink[`strMeasure` + count]) {
              measure = myDrink[`strMeasure` + count];
            } else {
              measure = "";
            }
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        console.log(ingredients);
        result.innerHTML = `
      <img src=${myDrink.strDrinkThumb}>
      <h2>${myDrink.strDrink}</h2>
      <h3>Ingredients:</h3>
      <ul class="ingredients"></ul>
      <h3>Instructions:</h3>
      <p>${myDrink.strInstructions}</p>
      `;
        let ingredientsCon = document.querySelector(".ingredients");
        ingredients.forEach((items) => {
          let listItem = document.createElement("li");
          listItem.innerText = items;
          ingredientsCon.appendChild(listItem);
        });
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Inconnu au bataillon...<br>&#128526;</h3>`;
      });
  }
};
window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo);

function getsans_alcool(){
	fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log("Il semblerait qu'il y est un problème : " +
          response.status);
        return;
      }

      // Examine la response
      response.json().then(function(data) {
        //console.log(data);
        displayRandomCocktail(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
getsans_alcool();

function displaysans_alcool(cocktail){
	console.log(cocktail.drinks[0]);

	let drinkSection = document.querySelector('#drink-section');
	drinkSection.innerHTML = '';

	let drinkName = document.createElement('h2');
	drinkName.innerHTML = cocktail.drinks[0].strDrink;

	drinkSection.appendChild(drinkName);

	let img = document.createElement('img');
	img.src = cocktail.drinks[0].strDrinkThumb;

	drinkSection.appendChild(img);

	for(let i=1; i<16; i++){
		console.log();

		if(cocktail.drinks[0][`strIngredient${i}`] == null || cocktail.drinks[0][`strIngredient${i}`] == '' ){
			break;
		}

		let ingredient = document.createElement('ons-list-item');
		ingredient.innerHTML = cocktail.drinks[0][`strMeasure${i}`] + ': ' + cocktail.drinks[0][`strIngredient${i}`];

		drinkSection.appendChild(ingredient);
	}

	let card = document.createElement('ons-card');
	card.innerHTML = cocktail.drinks[0].strInstructions;

	drinkSection.appendChild(card);

}
/* FIN COKTAIL PAR SA PREMIERE LETTRE */


/* DEBUT COKTAIL AVEC ALCOOL */
function getAlcoholicCocktail(){
	fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
  .then(
    function(response_2) {
      if (response_2.status !== 200) {
        console.log("Il semblerait qu'il y est un problème : " +
          response_2.status);
        return;
      }

      response_2.json().then(function(data_2) {
        displayAlcoholicCocktail(data_2);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
getAlcoholicCocktail();

function displayAlcoholicCocktail(cocktail_2){
	console.log(cocktail_2.drinks[0]);

	let drinkSection_2 = document.querySelector('#drink-section');
	drinkSection_2.innerHTML = '';

	let drinkName_2 = document.createElement('h2');
	drinkName_2.innerHTML = cocktail_2.drinks[0].strDrink;

	drinkSection_2.appendChild(drinkName_2);

	let img_2 = document.createElement('img');
	img_2.src = cocktail.drinks[0].strDrinkThumb;

	drinkSection_2.appendChild(img_2);

	for(let i=1; i<16; i++){
		console.log();

		if(cocktail.drinks[0][`strIngredient${i}`] == null || cocktail_2.drinks[0][`strIngredient${i}`] == '' ){
			break;
		}

		let ingredient_2 = document.createElement('ons-list-item');
		ingredient_2.innerHTML = cocktail_2.drinks[0][`strMeasure${i}`] + ': ' + cocktail_2.drinks[0][`strIngredient${i}`];

		drinkSection_2.appendChild(ingredient_2);
	}

	let card_2 = document.createElement('ons-card');
	card_2.innerHTML = cocktail.drinks[0].strInstructions;

	drinkSection_2.appendChild(card_2);

}
/*FIN COKTAIL AVEC ALCOOL*/