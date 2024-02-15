import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        height: 99%;
        font-size: 24px;
    }
    
    body {
        min-height: 100%;
        background-color: #edd1b0;
    }

    button, select { 
        font-size: inherit;
        background-color: transparent;
    }
`;

export default GlobalStyle;
