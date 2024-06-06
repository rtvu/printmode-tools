import { ReactNode } from "react";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger, { OverlayTriggerProps, OverlayTriggerType } from "react-bootstrap/OverlayTrigger";

const DEFAULT_PLACEMENT = "top";
const DEFAULT_TRIGGER: OverlayTriggerType[] = ["hover", "focus"];
const DEFAULT_DELAY = { show: 1000, hide: 250 };

export type ValidatedTextInputProps = (
  | { isValid: true }
  | {
      isValid: false;
      errors: string[];
    }
) & {
  value: string;
  onChange: (text: string) => void;
  id?: string;
  maxlength?: number;
  minlength?: number;
  readonly?: boolean;
  placement?: OverlayTriggerProps["placement"];
  trigger?: OverlayTriggerProps["trigger"];
  delay?: OverlayTriggerProps["delay"];
};

export function ValidatedTextInput(props: ValidatedTextInputProps): ReactNode {
  props = { ...props };

  if (props.id === undefined) {
    props.id = "";
  } else {
    props.id = "-" + props.id;
  }

  if (props.placement === undefined) {
    props.placement = DEFAULT_PLACEMENT;
  }

  if (props.trigger === undefined) {
    props.trigger = DEFAULT_TRIGGER;
  }
  props.trigger;

  if (props.delay === undefined) {
    props.delay = DEFAULT_DELAY;
  }

  const Input = (
    <input
      type="text"
      className={`form-control form-control-sm font-monospace ${props.isValid ? "" : "is-invalid text-danger"}`}
      value={props.value}
      onChange={(event) => {
        props.onChange(event.target.value);
      }}
      data-testid={"ValidatedTextInput" + props.id}
      maxLength={props.maxlength}
      minLength={props.minlength}
      readOnly={props.readonly}
    />
  );

  if (props.isValid) {
    return Input;
  } else {
    const tooltip = (
      <Tooltip>
        <pre className="text-start my-0 " data-testid={"Tooltip" + props.id}>
          {props.errors.join("\n")}
        </pre>
      </Tooltip>
    );

    return (
      <OverlayTrigger placement={props.placement} trigger={props.trigger} delay={props.delay} overlay={tooltip}>
        {Input}
      </OverlayTrigger>
    );
  }
}
