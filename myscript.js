$(document).ready(function() {
  
	$.getJSON("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail", function(data) {
		// Create drink cards
		var drinks = data.drinks.slice(0, 10);
		var drinkCards = drinks.map(function(drink) {
			return "<div class='drink-card' data-id='" + drink.idDrink + "'><img src='" + drink.strDrinkThumb + "'><p>" + drink.strDrink + "</p></div>";
		});
		$("#drinks-container").html(drinkCards.join(""));

		// Initialize Glide carousel
		var glide = new Glide("#drinks-container", {
			type: "carousel",
			perView: 3,
			focusAt: "center",
			gap: 20,
			breakpoints: {
				800: {
					perView: 2
				},
				600: {
					perView: 1
				}
			}
		});
		glide.mount();

		// Fetch drink details on click
		$(".drink-card").click(function() {
			var id = $(this).data("id");
			$.getJSON("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id, function(data) {
				var drink = data.drinks[0];
				var drinkDetails = "<h2>" + drink.strDrink + "</h2><img src='" + drink.strDrinkThumb + "'><p>" + drink.strInstructions + "</p>";
				$("#drink-details").html(drinkDetails);
			});
		});

		// Navigate between drinks with arrow keys
		$(document).keydown(function(e) {
			if (e.keyCode == 37) {
				glide.go("<");
			} else if (e.keyCode == 39) {
				glide.go(">");
			}
		});
	});  

});