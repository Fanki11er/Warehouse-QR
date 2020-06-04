import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './themes/GlobalStyle';
import theme from './themes/mainTheme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes/routes';
import MainTemplate from './Template/MainTemplate/MainTemplate';

function App() {
  const { main, store, scan, tags } = routes;
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path={'/'} component={MainTemplate} />
          <Route path={'*'} component={MainTemplate} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

/* <Route exact path={scan} component={ScanItem} />
          <Route path={store} component={StoreType} />
          <Route path={tags} component={PrintPage} />
          <Route path={main} component={MainPage} /> */
