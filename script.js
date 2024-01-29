document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const category = document.getElementById("categoryInput").value;
  fetchQuotes(category);
});

function fetchQuotes(category) {
  fetch(`http://localhost:3000/fetchQuotes/${category}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        displayQuotes(data.quotes);
      } else {
        console.error("Erreur lors de la récupération des citations");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function displayQuotes(quotes) {
  const container = document.getElementById("quotesContainer");
  container.innerHTML = ""; // Nettoyer les citations précédentes
  quotes.forEach((quote) => {
    const quoteDiv = document.createElement("div");
    quoteDiv.className = "quote";
    quoteDiv.innerHTML = `
            <p>${quote.quote}</p>
            <button onclick="deleteQuote('${quote._id}')">Supprimer</button>
        `;
    container.appendChild(quoteDiv);
  });
}

function deleteQuote(quoteId) {
  fetch(`http://localhost:3000/deleteQuote/${quoteId}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Citation supprimée avec succès");
        // Vous pouvez ajouter une logique ici pour retirer la citation de l'affichage
      } else {
        console.error("Erreur lors de la suppression de la citation");
      }
    })
    .catch((error) => console.error("Error:", error));
}
