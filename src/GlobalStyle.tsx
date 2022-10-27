import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  
  html {
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
  body {
    margin: 0;
  }

  #root {
    height: 100%;
  }
  
  button, input {
    font-family: inherit;
  }
  button {
    padding: 0;
    background: none;
    border: none;
    outline: none;
  }
  
  .flex {
    display: flex;
  }
  
  .flex-one {
    flex: 1;
  }
  
`

export default GlobalStyle
