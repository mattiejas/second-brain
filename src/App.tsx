import React from "react";
import Editor from "features/editor/Editor";
import EmptyEditor from "features/editor/EmptyEditor";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./app/store";
import Navigator from "features/navigator/Navigator";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex">
          <Navigator />
          <div className="container flex-1 mx-auto">
            <Switch>
              <Route path="/note/:id" component={Editor} />
              <Route exact path="/" component={EmptyEditor} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
