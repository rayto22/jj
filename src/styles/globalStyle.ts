import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        height: 99%;
        font-size: 24px;
    }
    
    body {
        min-height: 100%;
    }

    button { 
        font-size: inherit;
    }
`;

export default GlobalStyle;
