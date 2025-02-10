import { Fragment, useState } from "react";

import { useAppSelector } from "../../../state/hooks";

function toRegex(pattern: string, flags: string): RegExp | null {
  try {
    return new RegExp(pattern, flags);
  } catch {
    return null;
  }
}

export function ColorantDictionary() {
  const colorToColorants = useAppSelector((state) => state.colorantDictionary.colorToColorants);

  const [regexPattern, setRegexPattern] = useState("");
  const [isRegexCaseSensitive, setIsRegexCaseSensitive] = useState(false);

  const regexFlag = isRegexCaseSensitive ? "" : "i";
  const regex = toRegex(regexPattern.trim(), regexFlag);
  let filteredColorToColorants = colorToColorants;

  // Future Optimization: Can debounce `regexPattern` and memoize `filteredColorToColorants` if the following becomes slow.
  if (regex !== null) {
    filteredColorToColorants = [];

    for (const [color, colorants] of colorToColorants) {
      console.log("before filter: ", colorants);
      const filteredColorants = colorants.filter((colorant) => regex.test(colorant));

      if (filteredColorants.length > 0) {
        filteredColorToColorants.push([color, filteredColorants]);
      }
    }
  }

  return (
    <Fragment>
      <h3 className="bg-base-200 border-base-300 border-b py-2 text-center text-xl font-bold">Colorant Dictionary</h3>
      <div className="m-5">
        <div className="mx-auto max-w-[600px]">
          <div className="flex">
            <label className="mr-auto">Filter</label>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={isRegexCaseSensitive}
                onChange={() => setIsRegexCaseSensitive(!isRegexCaseSensitive)}
              />
              <span className="ml-2">Case Sensitive</span>
            </label>
          </div>
          <div className="my-2 flex">
            <input
              type="text"
              className={`input input-sm w-full ${regex === null ? "input-error text-error" : ""}`}
              value={regexPattern}
              onChange={(event) => setRegexPattern(event.target.value)}
            />
          </div>
          <div className="my-2">
            <label>Definitions</label>
          </div>
          <ul>
            {filteredColorToColorants.map(([color, colorants]) => {
              return (
                <li
                  key={color}
                  className="border-base-300 border-x border-b p-3 first:rounded-t-lg first:border-t last:rounded-b-lg"
                >
                  <div className="flex gap-3">
                    <div
                      className="rounded-box border-base-300 mb-auto border p-2 text-sm"
                      style={{ backgroundColor: color }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div className="rounded-box border-base-300 mb-auto border p-2 text-sm">{color}</div>
                    <div className="rounded-box border-base-300 w-full border p-2 text-sm">{colorants.join(", ")}</div>
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
