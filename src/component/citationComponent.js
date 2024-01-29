import React, { useState, useEffect } from "react";
import "./QuotesComponent.css"; // Assurez-vous de créer ce fichier CSS et de l'ajouter au même dossier que votre composant

const selectData = [
  { theme: "age", emoji: "👵", color: "#8A2BE2" },
  { theme: "alone", emoji: "😔", color: "#708090" },
  { theme: "amazing", emoji: "😲", color: "#FFD700" },
  { theme: "anger", emoji: "😠", color: "#FF4500" },
  { theme: "architecture", emoji: "🏰", color: "#CD5C5C" },
  { theme: "art", emoji: "🎨", color: "#FF69B4" },
  { theme: "attitude", emoji: "😏", color: "#2E8B57" },
  { theme: "beauty", emoji: "💄", color: "#FF1493" },
  { theme: "best", emoji: "🥇", color: "#FFD700" },
  { theme: "birthday", emoji: "🎂", color: "#FF6347" },
  { theme: "business", emoji: "💼", color: "#4682B4" },
  { theme: "car", emoji: "🚗", color: "#008080" },
  { theme: "change", emoji: "🔄", color: "#8FBC8F" },
  { theme: "communication", emoji: "📞", color: "#1E90FF" },
  { theme: "computers", emoji: "💻", color: "#00CED1" },
  { theme: "cool", emoji: "😎", color: "#87CEEB" },
  { theme: "courage", emoji: "🦸‍♂️", color: "#FF8C00" },
  { theme: "dad", emoji: "👨", color: "#556B2F" },
  { theme: "dating", emoji: "💑", color: "#FF1493" },
  { theme: "death", emoji: "💀", color: "#696969" },
  { theme: "design", emoji: "🎨", color: "#FF69B4" },
  { theme: "dreams", emoji: "💭", color: "#9932CC" },
  { theme: "education", emoji: "🎓", color: "#2E8B57" },
  { theme: "environmental", emoji: "🌳", color: "#3CB371" },
  { theme: "equality", emoji: "⚖️", color: "#7B68EE" },
  { theme: "experience", emoji: "🌍", color: "#A0522D" },
  { theme: "failure", emoji: "🚫", color: "#FF6347" },
  { theme: "faith", emoji: "🙏", color: "#FFD700" },
  { theme: "family", emoji: "👨‍👩‍👧‍👦", color: "#556B2F" },
  { theme: "famous", emoji: "🌟", color: "#FFD700" },
  { theme: "fear", emoji: "😨", color: "#8B4513" },
  { theme: "fitness", emoji: "🏋️‍♂️", color: "#008000" },
  { theme: "food", emoji: "🍔", color: "#FF6347" },
  { theme: "forgiveness", emoji: "🤝", color: "#32CD32" },
  { theme: "freedom", emoji: "🗽", color: "#4169E1" },
  { theme: "friendship", emoji: "🤝", color: "#FFD700" },
  { theme: "funny", emoji: "😄", color: "#FFD700" },
  { theme: "future", emoji: "🔮", color: "#9932CC" },
  { theme: "god", emoji: "🙏", color: "#FFD700" },
  { theme: "good", emoji: "👍", color: "#00FF00" },
  { theme: "government", emoji: "🏛️", color: "#696969" },
  { theme: "graduation", emoji: "🎓", color: "#2E8B57" },
  { theme: "great", emoji: "🚀", color: "#FFD700" },
  { theme: "happiness", emoji: "😃", color: "#FFD700" },
  { theme: "health", emoji: "🏥", color: "#32CD32" },
  { theme: "history", emoji: "📜", color: "#A52A2A" },
  { theme: "home", emoji: "🏠", color: "#008080" },
  { theme: "hope", emoji: "🤞", color: "#00BFFF" },
  { theme: "humor", emoji: "😄", color: "#FFD700" },
  { theme: "imagination", emoji: "🎨", color: "#FF69B4" },
  { theme: "inspirational", emoji: "🌈", color: "#FFD700" },
  { theme: "intelligence", emoji: "🧠", color: "#9370DB" },
  { theme: "jealousy", emoji: "😒", color: "#FF4500" },
  { theme: "knowledge", emoji: "📚", color: "#9932CC" },
  { theme: "leadership", emoji: "👔", color: "#4169E1" },
  { theme: "learning", emoji: "📚", color: "#9932CC" },
  { theme: "legal", emoji: "⚖️", color: "#7B68EE" },
  { theme: "life", emoji: "🌱", color: "#00FF00" },
  { theme: "love", emoji: "❤️", color: "#FF1493" },
  { theme: "marriage", emoji: "💍", color: "#FF1493" },
  { theme: "medical", emoji: "👨‍⚕️", color: "#32CD32" },
  { theme: "men", emoji: "👨", color: "#556B2F" },
  { theme: "mom", emoji: "👩", color: "#556B2F" },
  { theme: "money", emoji: "💰", color: "#FFD700" },
  { theme: "morning", emoji: "🌄", color: "#FFD700" },
  { theme: "movies", emoji: "🎬", color: "#FF6347" },
  { theme: "success", emoji: "🏆", color: "#FFD700" },
];

const QuotesComponent = () => {
  const [quotes, setQuotes] = useState([]);
  const [theme, setTheme] = useState("age");
  const [filterTheme, setFilterTheme] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllQuotes();
  }, []);

  const fetchAllQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3008/all-quotes");
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des citations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAndSaveQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3008/quotes/${theme}`);
      const data = await response.json();
      if (data.quote) {
        setQuotes([...quotes, data.quote[0]]);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération et de l’enregistrement de la citation:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuote = async (quoteId) => {
    try {
      const response = await fetch(`http://localhost:3008/quote/${quoteId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setQuotes(quotes.filter((quote) => quote._id !== quoteId));
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la citation:", error);
    }
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleFilterThemeChange = (e) => {
    const newTheme = e.target.value;
    setFilterTheme(newTheme);
    setTheme(newTheme === "all" ? "age" : newTheme);
  };

  const filteredQuotes = quotes.filter((quote) => {
    return filterTheme === "all" || quote.category === filterTheme;
  });

  return (
    <div className="quotes-container">
      <header>
        <h1>Générateur de Citations</h1>
      </header>
      <div className="theme-selector">
        <select value={theme} onChange={handleThemeChange}>
          {selectData.map((option) => (
            <option key={option.theme} value={option.theme}>
              {option.theme}
            </option>
          ))}
        </select>
        <button onClick={fetchAndSaveQuote}>Générer</button>
      </div>
      <div className="filter-selector">
        <select value={filterTheme} onChange={handleFilterThemeChange}>
          <option value="all">Tous les Thèmes</option>
          {selectData.map((option) => (
            <option key={option.theme} value={option.theme}>
              {option.theme}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="quotes-grid">
          {filteredQuotes.map((quote) => {
            const themeData =
              selectData.find((data) => data.theme === quote.category) || {};
            return (
              <div
                key={quote._id}
                className="quote-card"
                style={{ backgroundColor: themeData.color }}
              >
                <span className="emoji">{themeData.emoji}</span>
                <p className="quote-text">{quote.quote}</p>
                <p className="quote-author">{quote.author}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteQuote(quote._id)}
                >
                  Supprimer
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuotesComponent;
