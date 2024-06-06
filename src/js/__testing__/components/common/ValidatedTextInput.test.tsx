import { describe, expect, test } from "vitest";
import { fireEvent, render, waitForElementToBeRemoved } from "@testing-library/react";

import { setNot } from "../../../common/vitestUtilities";
import { ValidatedTextInput, ValidatedTextInputProps } from "../../../components/common/ValidatedTextInput";

describe("ValidatedTextInput", () => {
  test("is valid", async () => {
    let receivedText = "";

    const props: ValidatedTextInputProps = {
      isValid: true,
      value: "value",
      onChange: (text: string) => {
        receivedText = text;
      },
      delay: 500,
    };

    const validatedTextInput = render(<ValidatedTextInput {...props} />);

    const input = await validatedTextInput.findByTestId("ValidatedTextInput");
    expect(input).toHaveDisplayValue(props.value);
    setNot(expect(input), props.isValid).toHaveClass("is-invalid");

    const newValue = "new value";
    fireEvent.change(input, { target: { value: newValue } });
    expect(receivedText).toBe(newValue);
  });

  test("is invalid", async () => {
    let receivedText = "";

    const props: ValidatedTextInputProps = {
      isValid: false,
      errors: ["Error 1.", "Error 2."],
      value: "value",
      onChange: (text: string) => {
        receivedText = text;
      },
      delay: 0,
    };

    const validatedTextInput = render(<ValidatedTextInput {...props} />);

    const input = await validatedTextInput.findByTestId("ValidatedTextInput");
    expect(input).toHaveDisplayValue(props.value);
    expect(input).toHaveClass("is-invalid");

    const newValue = "new value";
    fireEvent.change(input, { target: { value: newValue } });
    expect(receivedText).toBe(newValue);

    fireEvent.focus(input);
    const tooltipFromFocus = await validatedTextInput.findByTestId("Tooltip");
    expect(tooltipFromFocus).toHaveTextContent(props.errors.join("\n"), { normalizeWhitespace: false });
    fireEvent.blur(input);
    await waitForElementToBeRemoved(() => validatedTextInput.queryAllByTestId("Tooltip"));

    fireEvent.mouseOver(input);
    const tooltipFromMouseOver = await validatedTextInput.findByTestId("Tooltip");
    expect(tooltipFromMouseOver).toHaveTextContent(props.errors.join("\n"), { normalizeWhitespace: false });
    fireEvent.mouseOut(input);
    await waitForElementToBeRemoved(() => validatedTextInput.queryAllByTestId("Tooltip"));
  });
});
