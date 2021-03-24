import React, {useContext, useEffect, useState} from 'react';
import {Button, FormControl, FormFile} from 'react-bootstrap';
import 'pages/verifier/verifier.scss'
import ApiService from 'utils/apiService';
import {GetSavedCredentialsOutput, UnsignedW3cCredential, W3cCredential} from 'utils/apis';
import QrScanner from 'qr-scanner';

interface State {
  currentUnsignedVC: UnsignedW3cCredential | null,
  currentSignedVC: W3cCredential | null,
  isCurrentVCVerified: boolean,
  storedVCs: GetSavedCredentialsOutput,
  isLoadingStoredVCs: boolean
}

/**
 * Stateful component responsible for rendering the showcase of this app.
 * The basic parts of SSI cycle are covered with this component.
 * */
const Verifier = () => {
  const [state, setState] = useState<State>({
    currentUnsignedVC: null,
    currentSignedVC: null,
    isCurrentVCVerified: false,
    storedVCs: [],
    isLoadingStoredVCs: true
  })
  const [inputVC, setinputVC] = useState('')
  const [qrCode, setQRCode] = useState<any>('');

  /**
   * Function for verifying a signed VC.
   * */
  const verifyVC = async () => {
    try {
      const result = await QrScanner.scanImage(qrCode)
      // const html5QrCode = new Html5Qrcode("reader");
      // const result = await html5QrCode.scanFile(qrCode, true)

      console.log(result)

      // console.log(result)
      // if (!result) {
      //   console.log('No QR found')
      // }
      if( isJson(inputVC) ) {
        const vc = JSON.parse(inputVC)
        const {isValid, errors} = await ApiService.verifyVC({
          verifiableCredentials: [vc]
        });

        if( isValid ) {
          setState({
            ...state,
            isCurrentVCVerified: true,
          })

          alert('Signed VC successfully verified.');
        }
        else {
          ApiService.alertWithBrowserConsole(errors, 'Signed VC not verified. Check console for errors.')
        }
      }
      else {
        alert('No signed VC found. Please sign a VC and try again.')
      }
    } catch (error) {
      console.log(error)
      ApiService.alertWithBrowserConsole(error.message);
    }
  }

  const onVCValueChange = (value: string) => {
    setinputVC(value)   
  }

  const isJson = (str: string) => {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  }

  const onImageChange = (event: any) => {
    // console.log(URL.createObjectURL(event.target.files[0]))
    // setQRCode(URL.createObjectURL(event.target.files[0]))
    setQRCode(event.target.files[0])
  }

  return (
    <div className='tutorial-verifier'>
            <span className='tutorial__step-text'>
              <strong>Step 1:</strong> Verify VC
            </span>
            {/* <FormControl
              as="textarea"
              rows={15}
              placeholder="Enter Verifiable Credential"
              aria-label="Verifiable Credential"
              aria-describedby="basic-addon1"
              value={inputVC}
              onChange={e => onVCValueChange(e.target.value)}
              style={{margin: '20px 0'}}
            /> */}

            <FormFile id="formcheck-api-regular">
              <FormFile.Input onChange={(e: any) => onImageChange(e)}/>
              <FormFile.Label>Please upload a Verifiable Credential Proof</FormFile.Label>
              {/* <input type="file" id="file-selector" onChange={onImageChange}/> */}
            </FormFile>
            <Button onClick={verifyVC}>Verify signed VC</Button>
    </div>
  )
}

export default Verifier;
