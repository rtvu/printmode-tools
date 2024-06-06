import { ReactNode } from "react";

import { ValidatedTextInput } from "./components/common/ValidatedTextInput";

export function App(): ReactNode {
  return (
    <main className="container" role="main">
      <div className="my-2">
        <ValidatedTextInput isValid={true} value="Valid" onChange={() => undefined} />
      </div>
      <div className="my-2">
        <ValidatedTextInput
          isValid={false}
          errors={["Error 1.", "Error 2."]}
          value="Invalid"
          onChange={() => undefined}
        />
      </div>
    </main>
  );
}
