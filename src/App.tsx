import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './themes/GlobalStyle';
import theme from './themes/mainTheme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes/routes';
import MainPage from './views/mainPage/MainPage';
import StoreType from './components/organisms/StoreType/StoreType';
import PrintPage from './views/PrintPage/PrintPage';
import ScanItem from './components/organisms/ScanItem/ScanItem';

function App() {
  const { main, store, scan, tags } = routes;
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path={scan} component={ScanItem} />
          <Route path={store} component={StoreType} />
          <Route path={tags} component={PrintPage} />
          <Route path={main} component={MainPage} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
