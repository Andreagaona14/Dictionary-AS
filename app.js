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

// Función de traducción
function translateWord() {
  const word = wordInput.value.trim();
  const isEnglishToSpanish = document.getElementById('english').checked;
  const isSpanishToEnglish = document.getElementById('espanol').checked;

  if (isEnglishToSpanish) {
      // Traducción Inglés a Español
      const translation = findTranslation(word, 'english', 'spanish');
      translationOutput.textContent = translation ? `La traducción de la palabra es: ${translation}` : 'Palabra no encontrada';
  } else if (isSpanishToEnglish) {
      // Traducción Español a Inglés
      const translation = findTranslation(word, 'spanish', 'english');
      translationOutput.textContent = translation ? `La traducción de la palabra es: ${translation}` : 'Palabra no encontrada';
  }
}