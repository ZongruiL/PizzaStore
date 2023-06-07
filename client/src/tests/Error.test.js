import { render, screen } from "@testing-library/react";
import Error from "../components/Error";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";

describe('Error component', () => {
  test('renders Error component with error message', () => {
    render(<Error />);
    expect(screen.getByText('Danger!')).toBeInTheDocument();
    expect(screen.getByText('Indicates a dangerous or potentially negative action.')).toBeInTheDocument();
  });
});