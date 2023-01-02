import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
    console.log('Called beforeach');
    render(<App />);
});

afterEach(() => {
    console.log('Called aftereach');
});

beforeAll(() => {
    console.log('This will run before all: beforeAll');
});

afterAll(() => {
    console.log('This will run after all: afterAll');
});

const typeInToForm = ({ email, password, confirmPassword }) => {
    const emailInputElemnt = screen.getByRole('textbox', { name: /email/i });
    const passwordElement = screen.getByLabelText('Password');
    const confirmPasswordElement = screen.getByLabelText(/confirm password/i);

    if (email) {
        userEvent.type(emailInputElemnt, email);
    }
    if (password) {
        userEvent.type(passwordElement, password);
    }
    if (confirmPasswordElement) {
        userEvent.type(confirmPasswordElement, confirmPassword);
    }
    return {
        emailInputElemnt,
        passwordElement,
        confirmPasswordElement,
    };
};

const findAndClickSubmitBtn = () => {
    const button = screen.getByRole('button', { name: /submit/i });
    userEvent.click(button);
};

describe('App testing', () => {
    test('All inputs are empty', () => {
        const emailInputElemnt = screen.getByRole('textbox');
        expect(emailInputElemnt.value).toBe('');
        const passwordElement = screen.getByLabelText('Password');
        expect(passwordElement.value).toBe('');
        const confirmPasswordElement =
            screen.getByLabelText(/confirm password/i);
        expect(confirmPasswordElement.value).toBe('');
    });

    test('should be able to type and email', () => {
        const { emailInputElemnt } = typeInToForm({
            email: 'apoorv@gmail.com',
        });
        expect(emailInputElemnt.value).toBe('apoorv@gmail.com');
    });

    test('should be able to password', () => {
        const { passwordElement } = typeInToForm({ password: '12345' });
        expect(passwordElement.value).toBe('12345');
    });

    test('should be able to  tpye in confirm password', () => {
        const { confirmPasswordElement } = typeInToForm({
            confirmPassword: '12345',
        });

        expect(confirmPasswordElement.value).toBe('12345');
    });

    // expect().[***] These are called jest dom based matchers
    describe('Error handling', () => {
        beforeEach(() => {
            console.log('In error handling:beforeach');
        });
        test('Should show email error message on invalid email', () => {
            typeInToForm({ email: '12345' });
            let emailErrorElement = screen.queryByText(/Email is invalid/i);
            expect(emailErrorElement).not.toBeInTheDocument();
            findAndClickSubmitBtn();
            emailErrorElement = screen.getByText(/Email is invalid/i);
            expect(emailErrorElement).toBeInTheDocument();
        });

        test('Should show password error message < 5  after proper email', () => {
            const { emailInputElemnt } = typeInToForm({
                email: 'apoorv@gmail.com',
                password: '1234',
            });
            let emailErrorElement = screen.queryByText(/Email is invalid/i);
            expect(emailInputElemnt.value).toBe('apoorv@gmail.com');
            expect(emailErrorElement).not.toBeInTheDocument();
            findAndClickSubmitBtn();

            const passwordErrorElement = screen.queryByText(
                /Password is less than 5 characters/i
            );
            expect(passwordErrorElement).toBeInTheDocument();
        });

        test('After password and email are correct, should show error message if passwords donot match', () => {
            const { emailInputElemnt } = typeInToForm({
                email: 'apoorv@gmail.com',
                password: '12345',
                confirmPassword: '1234',
            });

            let emailErrorElement = screen.queryByText(/Email is invalid/i);

            expect(emailInputElemnt.value).toBe('apoorv@gmail.com');
            expect(emailErrorElement).not.toBeInTheDocument();
            findAndClickSubmitBtn();

            const passwordErrorElement = screen.queryByText(
                /Password dont match, try again/i
            );

            expect(passwordErrorElement).toBeInTheDocument();
        });

        test('Should show no error message if everything is correct', () => {
            const { emailInputElemnt } = typeInToForm({
                email: 'apoorv@gmail.com',
                password: '12345',
                confirmPassword: '12345',
            });
            let emailErrorElement = screen.queryByText(/Email is invalid/i);

            expect(emailInputElemnt.value).toBe('apoorv@gmail.com');
            expect(emailErrorElement).not.toBeInTheDocument();
            findAndClickSubmitBtn();

            const passwordErrorElement = screen.queryByText(
                /Password dont match, try again/i
            );
            emailErrorElement = screen.queryByText(/the email is invalid/i);
            expect(emailErrorElement).not.toBeInTheDocument();
            expect(passwordErrorElement).not.toBeInTheDocument();
        });
    });
});
