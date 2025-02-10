import { Fragment } from "react";

const mappings = [
  ["Ctrl + I", "Toggle Dark Mode"],
  ["Ctrl + Shift + /", "Help"],
  ["Ctrl + Shift + Enter", "Colorant Dictionary"],
];

export function KeyboardShortcuts() {
  return (
    <Fragment>
      <h3 className="bg-base-200 border-base-300 border-b py-2 text-center text-xl font-bold">Keyboard Shortcuts</h3>
      <div className="m-5">
        <div className="mx-auto max-w-[600px]">
          <ul>
            {mappings.map(([shortcut, description]) => {
              return (
                <li
                  key={shortcut}
                  className="border-base-300 border-x border-b p-3 first:rounded-t-lg first:border-t last:rounded-b-lg"
                >
                  <div className="flex gap-3">
                    <div className="rounded-box border-base-300 w-2/5 border p-2">{shortcut}</div>
                    <div className="rounded-box border-base-300 w-3/5 border p-2">{description}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
