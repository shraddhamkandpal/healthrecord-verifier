import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import Verifier from 'pages/verifier/verifier';
import {MemoryRouter} from 'react-router-dom';
import ApiService from 'utils/apiService';
import userEvent from '@testing-library/user-event'
import {signedDrivingLicenseVC} from 'utils/vc-data-examples/drivinglicense';

const data_input = JSON.stringify(signedDrivingLicenseVC);

describe('Verifier Component Test', () => {
    test('Component renders successfully', () => {
        const {getByText, getByRole, getByPlaceholderText} = render(<MemoryRouter><Verifier/></MemoryRouter>);

        const title = getByText('Verify VC');
        const verifyButton = getByRole('button', {name: 'Verify signed VC'});
        const textArea = getByPlaceholderText('Enter Verifiable Credential');

        expect(title).toBeInTheDocument();
        expect(verifyButton).toBeInTheDocument();
        expect(textArea).toBeInTheDocument();
    })

    test('Should alert verified vc', async () => {
        const {getByRole, getByPlaceholderText} = render(<MemoryRouter><Verifier/></MemoryRouter>); 
        const verifyButton = getByRole('button', {name: 'Verify signed VC'});
        const textArea = getByPlaceholderText('Enter Verifiable Credential');

        fireEvent.change(textArea, { target: { value: data_input } })

        jest.spyOn(window, 'alert').mockImplementation(() => {});
        jest.spyOn(ApiService, 'verifyVC').mockReturnValue({isValid: true})

        await act(async () => {
            await userEvent.click(verifyButton)
        })

        expect(window.alert).toHaveBeenCalledWith(`Signed VC successfully verified.`)
    })

    test('Should alert error message', async () => {
        const {getByRole, getByPlaceholderText} = render(<MemoryRouter><Verifier/></MemoryRouter>); 
        const verifyButton = getByRole('button', {name: 'Verify signed VC'});
        const textArea = getByPlaceholderText('Enter Verifiable Credential');

        fireEvent.change(textArea, { target: { value: data_input } })

        jest.spyOn(window, 'alert').mockImplementation(() => {});
        jest.spyOn(ApiService, 'verifyVC').mockReturnValue({isValid: false})

        await act(async () => {
            await userEvent.click(verifyButton)
        })

        expect(window.alert).toHaveBeenCalledWith(`Signed VC not verified. Check console for errors.`)
    })

    test('Should alert empty text area', async () => {
        const {getByRole} = render(<MemoryRouter><Verifier/></MemoryRouter>); 
        const verifyButton = getByRole('button', {name: 'Verify signed VC'});

        jest.spyOn(window, 'alert').mockImplementation(() => {});

        await act(async () => {
            await userEvent.click(verifyButton)
        })

        expect(window.alert).toHaveBeenCalledWith(`No signed VC found. Please sign a VC and try again.`)
    })
})
