import { JSONValue } from "../common/utilities";

export type PrettyPrintProps = {
  className?: string;
  data: JSONValue;
  label: string;
};

export function PrettyPrint({ className, data, label }: PrettyPrintProps) {
  return (
    <div className={className}>
      {label}:&nbsp;<pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>
  );
}
