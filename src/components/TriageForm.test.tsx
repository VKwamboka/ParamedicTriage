import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TriageForm from './triageForm';

describe('TriageForm', () => {
  it('blocks submission when required fields are missing', () => {
    const onSubmit = jest.fn();
    const { getByText } = render(<TriageForm onSubmit={onSubmit} />);

    fireEvent.press(getByText('Submit Triage'));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(getByText(/all fields are required/i)).toBeTruthy();
  });

  it('submits valid data with the selected priority and status', () => {
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(<TriageForm onSubmit={onSubmit} />);

    fireEvent.changeText(getByPlaceholderText('e.g. John Doe'), 'Jane Doe');
    fireEvent.changeText(getByPlaceholderText('e.g. Chest pain, difficulty breathing'), 'Fracture');
    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('Submit Triage'));

    expect(onSubmit).toHaveBeenCalledWith({
      patientName: 'Jane Doe',
      condition: 'Fracture',
      priority: 1,
      status: 'Pending',
    });
  });
});