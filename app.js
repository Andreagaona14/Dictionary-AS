import { dictionary } from "./dictionary.js"; 

// Variables para los elementos DOM
const wordInput = document.getElementById('word');
const translateButton = document.querySelector('.translate-button');
const translationOutput = document.getElementById('translation-output');
const categoryRadios = document.querySelectorAll('input[name="category"]');
const dictionaryTable = document.getElementById('dictionary-entries');
const sortButton = document.querySelector('.sort-button');
const newWordForm = document.getElementById('new-word-form');
const addWordButton = document.getElementById('add-word-button');


//Función de traducción
function translateWord() {
  const word = wordInput.value.trim();
  const isEnglishToSpanish = document.getElementById('english').checked;
  const isSpanishToEnglish = document.getElementById('espanol').checked; //Verificación de la opción que se selecciono para traducir 

  if (isEnglishToSpanish) {
      //Traducción Inglés a Español
      const translation = findTranslation(word, 'english', 'spanish');
      translationOutput.textContent = translation ? `La traducción de la palabra es: ${translation}` : 'Palabra no encontrada';
  } else if (isSpanishToEnglish) {
      //Traducción Español a Inglés
      const translation = findTranslation(word, 'spanish', 'english');
      translationOutput.textContent = translation ? `La traducción de la palabra es: ${translation}` : 'Palabra no encontrada';
  }
}

//Función para buscar la traducción
function findTranslation(word, sourceLang, targetLang) {
     //El for/if sirve para recorrer las categorías del diccionario
    for (const category in dictionary.categories) {
        const categoryWords = dictionary.categories[category];
         //El for/or sirve para recorrer las palabras dentro de una categoría
        for (const item of categoryWords) {
            if (item[sourceLang].toLowerCase() === word.toLowerCase()) {
                return item[targetLang];
            }
        }
    }
    return null;
}

//Función para ordenar las palabras alfabéticamente de la A a la Z
function sortDictionary() {
  const selectedCategory = Array.from(categoryRadios).find(radio => radio.checked)?.id;
  if (selectedCategory) {
      const words = dictionary.categories[selectedCategory];
      //Ordenar las palabras de A a Z por la palabra en inglés
      words.sort((a, b) => a.english.toLowerCase().localeCompare(b.english.toLowerCase()));
      displayWords(words);  //Actualizar la vista de las palabras ordenadas
  }
}

//Función para filtrar palabras por categoría
function filterByCategory() {
  const selectedCategory = Array.from(categoryRadios).find(radio => radio.checked)?.id;
  console.log("Categoría seleccionada:", selectedCategory);
  
  if (selectedCategory && dictionary.categories[selectedCategory]) {
      const words = dictionary.categories[selectedCategory];
      console.log("Palabras en esta categoría:", words);
      displayWords(words);
  }
}

//Función para mostrar las palabras en la tabla
function displayWords(words) {
    dictionaryTable.innerHTML = ''; //Limpiar tabla
    //El for/of sirve para reccorer las palabras
    for (const word of words) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${word.english}</td>
            <td>${word.spanish}</td>
            <td>${word.example}</td>
        `;
        dictionaryTable.appendChild(row);
    }
}

//Función para agregar nueva palabra en el formilario 
function addNewWord() {
    const englishWord = document.getElementById('new-english-word').value.trim();
    const spanishWord = document.getElementById('new-spanish-word').value.trim();
    const example = document.getElementById('new-example').value.trim();
    const category = document.getElementById('new-word-category').value;

    if (englishWord && spanishWord && example) {
        const newWord = {
            id: Date.now(),  
            english: englishWord,
            spanish: spanishWord,
            example: example
        };
        dictionary.categories[category].push(newWord);
        displayWords(dictionary.categories[category]);  
        newWordForm.reset();  //Limpiar el formulario
    } else {
        alert("Por favor, complete todos los campos.");
    }
}

//Vinculación a las funciones, botones y eventos 
translateButton.addEventListener('click', translateWord);
sortButton.addEventListener('click', sortDictionary);
categoryRadios.forEach(radio => radio.addEventListener('change', filterByCategory));
addWordButton.addEventListener('click', addNewWord);

//Muestra las palabras al seleccionar la categoría
displayWords(dictionary);