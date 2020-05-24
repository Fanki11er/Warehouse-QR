import { createGlobalStyle } from 'styled-components';
import theme from './mainTheme';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');


    *, *::before, *::after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font-size: 62.5%;
        width: 100%;
    }

    body {
        min-width: 100%;
        max-width: 100%;
        min-height: 100vh;
        font-size: 1.6rem;
        font-family: "Roboto", sans-serif;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        background-color: ${theme.primary};
        
    }

    .withScroll {
        overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 15px;
    background-color: ${theme.primary};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${theme.green};
    border-radius: 10px;
    border: 3px solid;
    border: none;
    
  }

    }
`;

export default GlobalStyle;
