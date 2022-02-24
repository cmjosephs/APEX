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
  reviewQABorder: 'none',
  sizeOptionButtonBorder: 'solid #272727',
  sizeOptionButtonHoverBorder: 'thin solid rgb(5, 5, 5)',
  reviewQApadding: 'none',
  mainPicShadow: '4px 4px 3px #E7E7E7',
  navBtnColor: 'none',
  navBtnHover: '#D6CCC2',
  navBtnBorder: 'none',
  // chrisStylesShadow:
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
  reviewQABorder: '15px',
  sizeOptionButtonBorder: 'solid #E7E7E7',
  sizeOptionButtonHoverBorder: 'thin solid #D6CCC2',
  reviewQApadding: '1em',
  mainPicShadow: 'none',
  navBtnColor: '#E7E7E7',
  navBtnHover: '#D6CCC2',
  navBtnBorder: '10px'
  // chrisStylesShadow:
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

  .review-container-left, .review-container-right, .navbar, .question-container {
    background-color: ${props => props.theme.reviewQA};
    border-radius: ${props => props.theme.reviewQABorder};
    box-shadow: ${props => props.theme.reviewQAShadow};
  }

  .review-container-left, .review-container-right, .question-container {
    padding: ${props => props.theme.reviewQApadding}
  }

  h1.review-header {
    font-family: 'Noto Serif Display', serif;
  }

  .review-button, .question-button {
    background-color: ${props => props.theme.generalButton};
    color: ${props => props.theme.body};
    min-width: 160px;
    padding: 12px 16px;
    z-index: 1;
    border-radius: 5rem;
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

  .nav-btn {
    background-color: ${props => props.theme.navBtnColor};
    border-radius: ${props => props.theme.navBtnBorder};
  }
  .nav-btn:hover {
    cursor: pointer;
    padding: 6px;
    background-color: #D6CCC2;
    border-radius: 10px;
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
    border: ${props => props.theme.sizeOptionButtonBorder};
    border-radius: 4px;
  }

  .size-label:hover {
    border: ${props => props.theme.sizeOptionButtonHoverBorder};
    border-radius: 4px;
  }

  .size-label, .size-label-nostock {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 4px;
    padding: 10px 30px;
    border-style: solid;
    border-color: rgb(218, 218, 218);
    border-radius: 4px;
  }
  .size-label-nostock {
    background-color: rgb(214, 214, 214);
  }

  .full-image-wide-view {
    width: 40%;
    border-radius: 4px;
    box-shadow: ${props => props.theme.mainPicShadow};
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
    width: 97%;
    padding: 12px 16px;
    z-index: 1;
    border: thin solid #E7E7E7;
    border-radius: 12px;
    // align-items: center;
  }

  input.search-input {
    color: #272727
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