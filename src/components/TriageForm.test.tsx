import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TriageForm from "./triageForm";

describe("TriageForm", () => {
  it("blocks submission when required fields are missing", async () => {
    const onSubmit = jest.fn();
    const { getByText } = await render(<TriageForm onSubmit={onSubmit} />);
    await fireEvent.press(getByText("Submit Triage"));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(
      getByText(/complete patient name and condition to submit/i)
    ).toBeTruthy();
  });

  it("submits valid data with the selected priority and status", async () => {
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = await render(
      <TriageForm onSubmit={onSubmit} />
    );

    await fireEvent.changeText(getByPlaceholderText("e.g. John Doe"), "Jane Doe");
    await fireEvent.changeText(
      getByPlaceholderText("e.g. Chest pain, difficulty breathing"),
      "Fracture"
    );
    await fireEvent.press(getByText("1"));
    await fireEvent.press(getByText("Submit Triage"));

    expect(onSubmit).toHaveBeenCalledWith({
      patientName: "Jane Doe",
      condition: "Fracture",
      priority: 1,
      status: "Pending",
    });
  });
});