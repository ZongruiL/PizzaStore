import { render, screen } from "@testing-library/react";
import Success from "../components/Success";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";

describe('Success component', () => {
  test('renders Success component with success message', () => {
    const successMessage = 'Your operation was successful!';
    render(<Success success={successMessage} />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText(successMessage)).toBeInTheDocument();
  });
});