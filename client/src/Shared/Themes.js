// off-white: #FCFCFC
// off-black: #272727
// gray: #E7E7E7
// beige: #D6CCC2

import {createGlobalStyle} from 'styled-components';

export const lightMode = {
  body: '#FCFCFC',
  fontColor: '#272727',
  scrollTrack: '#E7E7E7',
  scrollThumb: '#272727',
  scrollThumbHover: '#D6CCC2',
  generalButton: '#272727',
  reviewQA: '#FCFCFC',
  reviewQAShadow: 'none',
  reviewQABorder: 'none'
}

export const darkMode = {
  body: '#272727',
  fontColor: '#E7E7E7',
  scrollTrack: '#E7E7E7',
  scrollThumb: '#D6CCC2',
  scrollThumbHover: '#FCFCFC',
  generalButton: '#FCFCFC',
  reviewQA: '#303030',
  reviewQAShadow: '0px 8px 16px 0px rgba(0,0,0,0.2);',
  reviewQABorder: '15px;'
}

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.fontColor};
    font-weight: 300;

  }
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.scrollTrack};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.scrollThumb};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.scrollThumbHover}
  }

  // REVIEWS

  .review-container-left {
    background-color: ${props => props.theme.QA};
    border-radius: ${props => props.theme.reviewQABorder};
    box-shadow: ${props => props.theme.reviewQAShadow};
  }

  .review-container-right {
    background-color:  ${props => props.theme.QA};
    border-radius: ${props => props.theme.reviewQABorder};
    box-shadow: ${props => props.theme.reviewQAShadow};
  }

  h1.review-header {
    font-family: 'Noto Serif Display', serif;
  }

  .review-button {
    background-color: ${props => props.theme.generalButton};
    color: ${props => props.theme.body};
    min-width: 160px;
    padding: 12px 16px;
    z-index: 1;
    border-radius: 5rem;
  }

  a.review-interaction {
    color: ${props => props.theme.fontColor}
  }
  a:hover {
    color: '#D6CCC2';
  }

  // NAVIGATION
  nav {
    /* position: sticky;
    top: 0px; */
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${props => props.theme.body};
    height: 68px;
  }

  #nav-break {
    color: ${props => props.theme.fontColor};
    background-color: ${props => props.theme.fontColor};
    width: 90%;
  }


  // OVERVIEW

  .same-page-review-link {
    color: ${props => props.theme.fontColor};
  }

  .size-option input[type=radio]:checked+label {
    border: solid ${props => props.theme.fontColor};
    border-radius: 4px;
  }

  .add-bag-btn {
    background-color: ${props => props.theme.fontColor};
    color: ${props => props.theme.body};
  }
  .add-bag-btn:hover {
    background-color: #D6CCC2;
    color: ${props => props.theme.fontColor};
    cursor: pointer;
  }

  .info-break {
    align-self: center;
    color: ${props => props.theme.fontColor};
    background-color: ${props => props.theme.fontColor};
    width: 80%;
    margin-left: 0px;
  }

  // Q&A
  .search-input {
    display: flex;
    color: ${props => props.theme.fontColor};
    width: 90vw;
    padding: 12px 16px;
    z-index: 1;
    border-radius: 5rem;
  }

  input.search-input {
    color: #272727
  }

  .question-answer-list {
    max-height: 50vh;
    max-width: 100vw;
    overflow: auto;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.body};
    font-family: 'Roboto', sans-serif;
    color: ${props => props.theme.fontColor};
  }

  .question-button {
    background-color: #FCFCFC;
    color: ${props => props.theme.body};
    min-width: 160px;
    padding: 12px 16px;
    z-index: 1;
    border-radius: 5rem;
  }

  .question-button:hover {
    background-color: #D6CCC2;
    color: ${props => props.theme.fontColor};
  }

  .answer-button {
    background-color: ${props => props.theme.fontColor};
    color: ${props => props.theme.body};
    min-width: 160px;
    z-index: 1;
    border-radius: 5rem;
  }

  .answer-button:hover {
    background-color: #D6CCC2;
    color: ${props => props.theme.fontColor};
  }

`