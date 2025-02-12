import { Fragment } from "react";
import { Provider } from "react-redux";

import { DefineColorants } from "./components/DefineColorants";
import { Navbar } from "./components/Navbar";
import { Tabs } from "./components/Tabs";
import { store } from "./state/store";

export function Application() {
  return (
    <Fragment>
      <Provider store={store}>
        <Navbar />
        <div className="container mx-auto mt-3 max-w-[800px]">
          <Tabs tabs={["Define Colorants"]}>
            <DefineColorants />;
          </Tabs>
        </div>
      </Provider>
    </Fragment>
  );
}
