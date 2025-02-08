import { Fragment } from "react";

import { DefineColorants } from "./components/DefineColorants";
import { Navbar } from "./components/Navbar";

export function Application() {
  return (
    <Fragment>
      <Navbar />
      <div className="container mx-auto">
        <DefineColorants />
      </div>
    </Fragment>
  );
}
