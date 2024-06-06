import { ReactNode } from "react";

export function Navbar(): ReactNode {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="navbar-brand mx-auto">
        <h1 className="navbar-text font-monospace py-0 my-0">
          <strong>Printmode Tools</strong>
        </h1>
      </div>
    </nav>
  );
}
