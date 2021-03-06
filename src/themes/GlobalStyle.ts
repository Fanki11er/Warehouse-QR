import { createGlobalStyle } from 'styled-components';
import theme from './mainTheme';

const GlobalStyle = createGlobalStyle`

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
        scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 15px;
    background-color: transparent;
  }

  

  ::-webkit-scrollbar-thumb {
    background-color: ${theme.green};
    border-radius: 10px;
    min-height: 100px;
    border: 3px solid;
    border: none; 
  }

    }

    @media print {
  .printHide {
     display: none; 
   }

   .printShow {
     display: block;
   }

   .pagePrinter {
      transform: scale(1);
      margin: 0;
      padding: 0;
      margin-bottom: 25px;  
      height: 265mm; 
   }

   .pagePdf {
     transform: scale(1);
     margin: 0;
     margin-bottom: 80px;
     padding:0;
     height: 255mm;
     
    
   }
}

.animateShow {
  opacity: 0;
  animation-name: show;
  animation-duration: 0.75s;
  animation-fill-mode: forwards;

  @keyframes show {
    to {
      opacity: 1;
    }
  }
}
`;

export default GlobalStyle;
