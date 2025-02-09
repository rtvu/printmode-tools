import { Fragment } from "react";
import { Provider } from "react-redux";

import { DefineColorants } from "./components/DefineColorants";
import { Navbar } from "./components/Navbar";
import { store } from "./state/store";

export function Application() {
  return (
    <Fragment>
      <Provider store={store}>
        <Navbar />
        <div className="container mx-auto">
          <DefineColorants />
        </div>
      </Provider>
    </Fragment>
  );
}
