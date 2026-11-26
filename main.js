const deals = [
  {
    "id": 1,
    "title": "Hollow Knight",
    "normalPrice": 14.99,
    "salePrice": 7.49,
    "store": "Steam"
  },
  {
    "id": 2,
    "title": "Stardew Valley",
    "normalPrice": 13.99,
    "salePrice": 13.99,
    "store": "GOG"
  },
  {
    "id": 3,
    "title": "Celeste",
    "normalPrice": 19.99,
    "salePrice": 4.99,
    "store": "Steam"
  },
  {
    "id": 4,
    "title": "Hades",
    "normalPrice": 24.99,
    "salePrice": 12.49,
    "store": "Epic Games"
  },
  {
    "id": 5,
    "title": "Portal 2",
    "normalPrice": 9.99,
    "salePrice": 0.99,
    "store": "Steam"
  },
  {
    "id": 6,
    "title": "Terraria",
    "normalPrice": 9.99,
    "salePrice": 9.99,
    "store": "GOG"
  },
  {
    "id": 7,
    "title": "Disco Elysium",
    "normalPrice": 39.99,
    "salePrice": 9.99,
    "store": "GOG"
  },
  {
    "id": 8,
    "title": "Cuphead",
    "normalPrice": 19.99,
    "salePrice": 14.99,
    "store": "Steam"
  }
];

function discount_percantage(normalPrice, salePrice) { //calculate discount %
    if (normalPrice - salePrice ==0) {
       return 0; //no discount
    }
    
    return Math.round(((normalPrice - salePrice) / normalPrice) * 100 ); // % discount
}

function game_search (title) {
    for (var i = 0; i < deals.length; i++) {
        if(deals[i].title.toLowerCase() === title.toLowerCase()) {
            return deals[i] || "Game does not exist";
        }
    }
    return "Not in list";
}

function search_games(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return deals.filter(g => g.title.toLowerCase().includes(q));
}


function cheapest_game (deals) {
  let cheapest = deals[0]; //got stuck here
  for (var i = 0; i < deals.length; i++) {
    if (deals[i].salePrice < cheapest.salePrice) {
      cheapest = deals[i];
    }

  }
  return cheapest;
}

const cheapest = cheapest_game(deals);

function games_on_sale(deals) {
  var games_sale = [];
  for (var i = 0; i < deals.length; i++) {
    if (deals[i].normalPrice > deals[i].salePrice) {
       games_sale.push(deals[i]);
    }
  }
  return games_sale;
}

function render(list) {
  document.getElementById("games").innerHTML = list.map(g => {
    const pct = discount_percantage(g.normalPrice, g.salePrice);
    const onSale = pct > 0;

    return `
    <div class="card ${onSale ? "on-sale" : ""}">
      <h2>${g.title}</h2>
      ${onSale ? `<span class="tag">ON SALE</span>` : ""}
      <p>${g.store}</p>
      <p>$${g.salePrice.toFixed(2)} ${onSale ? `<s>$${g.normalPrice.toFixed(2)}</s>` : ""}</p>
      ${onSale ? `<span class="badge">-${pct}%</span>` : ""}
    </div>
    `;
  }).join("");
}

document.getElementById("Sale-btn").addEventListener("click", () => {
  render(games_on_sale(deals));
});

document.getElementById("all-btn").addEventListener("click", () => {
  render(deals);
});

document.getElementById("game_name").addEventListener("input", (e) => {
  const query = document.getElementById("game_name").value;
  render(search_games(query));
});

document.getElementById("cheapest-btn").addEventListener("click", () => {
  render([cheapest]);
});