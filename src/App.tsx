import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './themes/GlobalStyle';
import theme from './themes/mainTheme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes/routes';
import MainTemplate from './Template/MainTemplate/MainTemplate';

function App() {
  const { scan } = routes;
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path={scan} component={MainTemplate} />
          <Route path={'*'} component={MainTemplate} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
