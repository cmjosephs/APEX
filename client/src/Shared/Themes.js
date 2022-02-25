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
  relatedPadding: 'none',
  reviewQApadding: 'none',
  mainPicShadow: '4px 4px 3px #E7E7E7',
  navBtnColor: 'none',
  navBtnHover: '#D6CCC2',
  navBtnBorder: 'none',
  navBtnPadding: '6px',
  styleShadow: '2px 2px 2px #E7E7E7',
  relatedCardBorder: '3px solid #E7E7E7',
  addFavoriteButton: '#FCFCFC',
  addFavoriteHover: '#272727',

}

export const darkMode = {
  body: '#272727',
  fontColor: '#E7E7E7',
  scrollTrack: '#E7E7E7',
  scrollThumb: '#D6CCC2',
  scrollThumbHover: '#D6CCC2',
  generalButton: '#FCFCFC',
  reviewQA: '#303030',
  reviewQAShadow: '0px 8px 16px 0px rgba(0,0,0,0.2);',
  reviewQABorder: '15px',
  sizeOptionButtonBorder: 'solid #E7E7E7',
  sizeOptionButtonHoverBorder: 'thin solid #D6CCC2',
  relatedPadding: '2 em',
  reviewQApadding: '0.4 em',
  mainPicShadow: 'none',
  navBtnColor: '#E7E7E7',
  navBtnHover: '#D6CCC2',
  navBtnBorder: '10px',
  navBtnPadding: '6px',
  styleShadow: 'none',
  relatedCardBorder: 'none',
  addFavoriteButton: '#272727',
  addFavoriteHover: '#272727',
}

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.fontColor};
    font-family: 'Roboto', sans-serif;
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
    padding: ${props => props.theme.navBtnPadding}
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

  .style {
    cursor: pointer;
    height: 100%;
    object-fit: cover;
    width: 100%;
    border-radius: 15px;
    margin: 0px;
    box-shadow: ${props => props.theme.styleShadow};
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

  input-size-label {
    color: ${props => props.theme.fontColor}
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

  // RELATED

  .features-container {
    height: 60%;
    display: flex;
    width: 30%;
    background-color: ${props => props.theme.body};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .related-comparison-open, .remove-from-favorites {
    cursor: pointer;
    border-radius: 50%;
    background-color: ${props => props.theme.body};
    box-shadow: 0 0 3px rgb(0, 0, 0);
    opacity: 100%;
    margin: 4px;
  }


.add-favorite-button {
  position: relative;
  overflow: hidden;
  color: ${props => props.theme.fontColor};
  display: inline-block;
  font-size: 15px;
  line-height: 15px;
  padding: 18px 18px 17px;
  text-decoration: none;
  cursor: pointer;
  background: #FCFCFC;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  background-color: ${props => props.theme.addFavoriteButton};
}

.add-favorite-button span:first-child {
  font-family: 'Roboto', sans-serif;
  position: relative;
  transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 10;
}

.add-favorite-button span:last-child {
  font-family: 'Roboto', sans-serif;
  color: ${props => props.theme.addFavoriteHover};
  display: block;
  position: absolute;
  bottom: 0;
  transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 100;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translateY(225%) translateX(-50%);
  height: 14px;
  line-height: 13px;
}

.add-favorite-button:after {
  font-family: 'Roboto', sans-serif;
  content: "";
  position: absolute;
  bottom: -50%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #E7E7E7;
  transform-origin: bottom center;
  transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
  transform: skewY(9.3deg) scaleY(0);
  z-index: 50;
}

.add-favorite-button:hover:after {
  font-family: 'Roboto', sans-serif;
  transform-origin: bottom center;
  transform: skewY(9.3deg) scaleY(2);
}

.add-favorite-button:hover span:last-child {
  font-family: 'Roboto', sans-serif;
  transform: translateX(-50%) translateY(-100%);
  opacity: 1;
  transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
}

.related-card, .favorite-card {
  min-width: 25%;
  max-width: 25%;
  overflow: hidden;
  border: ${props => props.theme.relatedCardBorder};
  margin-bottom: 10px;
  border-radius: ${props => props.theme.reviewQABorder};
  box-shadow: ${props => props.theme.reviewQAShadow};
  padding: ${props => props.theme.relatedPadding};
  background-color: ${props => props.theme.reviewQA};
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
    font-family: 'Roboto', sans serif;
  }

  // REVIEWS

  #review-container, .navbar, .question-container {
    background-color: ${props => props.theme.reviewQA};
    border-radius: ${props => props.theme.reviewQABorder};
    box-shadow: ${props => props.theme.reviewQAShadow};
    padding: ${props => props.theme.reviewQApadding};
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
    font-family: 'Roboto', sans-serif;
  }

`

