import React from "react";
import Editor from "features/editor/Editor";
import EmptyEditor from "features/editor/EmptyEditor";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import Navigator from "features/navigator/Navigator";
import { PersistGate } from "redux-persist/integration/react";
import Version from "app/components/Version";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="flex">
            <div className="flex flex-col" style={{ height: "fit-content" }}>
              <Navigator />
              <Version className="flex-1 italic text-sm text-center w-full py-3 pr-10 ml-10 text-gray-400" />
            </div>
            <div className="container flex-1 mx-auto">
              <Switch>
                <Route path="/notes/:id" component={Editor} />
                <Route path="/" component={EmptyEditor} />
              </Switch>
            </div>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
