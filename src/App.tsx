import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './themes/GlobalStyle';
import theme from './themes/mainTheme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes/routes';
import MainPage from './views/mainPage/MainPage';
import StoreType from './components/organisms/StoreType/StoreType';
import PrintPage from './views/PrintPage/PrintPage';
import TestComponent from './components/organisms/TestComponent/TestComponent';

function App() {
  const { main, store } = routes;
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Switch>
          <Route exact path={main} component={MainPage} />
          <Route path={store} component={StoreType} />
          <Route path={'/print'} component={PrintPage} />
          <Route path={'/read'} component={TestComponent} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
