// scripts.js

const searchInput = document.getElementById('search-bar');
const suggestionsContainer = document.getElementById('suggestions');
const savedSearchList = document.getElementById('saved-search-list');

// Sample data for suggestions
const sampleSuggestions = [
    { text: 'indus valley civilisation', url: 'posts/Indus valley civilization/indus_valley_civilisation.html' },
    { text: 'isro( bulletpoints)', url: 'posts/Isro/Isro(bulletpoint).html' },
     { text: 'esports', url: 'posts/esports/esports.html' },
];

// Load saved searches from local storage
document.addEventListener('DOMContentLoaded', () => {
    const savedSearches = JSON.parse(localStorage.getItem('savedSearches')) || [];
    
});

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    suggestionsContainer.innerHTML = '';

    if (query) {
        const filteredSuggestions = sampleSuggestions.filter(item =>
            item.text.toLowerCase().includes(query)
        );

        filteredSuggestions.forEach(suggestion => {
            // Create an a element for each suggestion
            const suggestionElement = document.createElement('a');
            suggestionElement.classList.add('suggestion-item');
            suggestionElement.textContent = suggestion.text;
            suggestionElement.href = suggestion.url;

            // Add click event listener to suggestion items
            suggestionElement.addEventListener('click', (event) => {
                
        function displayFoundResults(documents) {
  const container = document.createElement("ul");
  documents.forEach(({url, title}) => {
    const row = document.createElement("li");
    const link = document.createElement("a");
    link.href = url;
    link.textContent = title;
    row.appendChild(link);
    container.appendChild(row);
  });
  document.querySelector('#search').appendChild(container);
        }        searchInput.value = suggestion.text;
                suggestionsContainer.innerHTML = '';
                suggestionsContainer.classList.remove('active');
                saveSearch(suggestion);
            });

            // Append the suggestion element to the suggestions container
            suggestionsContainer.appendChild(suggestionElement);
        });

        suggestionsContainer.classList.add('active');
    } else {
        suggestionsContainer.classList.remove('active');
    }
});

document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
        suggestionsContainer.classList.remove('active');
    }
});

function saveSearch(search) {
    let savedSearches = JSON.parse(localStorage.getItem('savedSearches')) || [];
    savedSearches = savedSearches.filter(s => s.text !== search.text); // Remove duplicates
    savedSearches.push(search);
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    
}



