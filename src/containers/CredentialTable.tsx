import React, { useState, useEffect } from 'react';
import { Table, Button } from "react-bootstrap";
import { useAuthentication } from "./Authentication";
import { useGlobalTokenValue } from "./MessageListener";
import CheckCircle from '../assets/images/icons/check_green_circle.svg'
import CrossCircle from '../assets/images/icons/cross_red_circle.svg'

const CredentialTable = () => {
    const { sdk } = useAuthentication();
    const [
      credentialShareResponseToken,
      setCredentialShareResponseToken,
    ] = useState<string[]>([]);
    const [globalToken] = useGlobalTokenValue();
    const [vcData, setVCData] = useState<any[]>([]);
    useEffect(() => {
      if (globalToken) {
        setCredentialShareResponseToken(prevState => [...prevState, globalToken]);
      }
    }, [globalToken]);

    const onClickValidate = async (token: string) => {
      const result = await sdk!.verifyCredentialShareResponseToken(token);
      const currentVCState = vcData
      const newVCState = currentVCState.map((data:any) => {
        if (data.token === token) {
          data.validatedResult = result
        }
        return data
      })
      setVCData(newVCState)
    }

    useEffect(() => {
      const onValidate = async (token: string) => {
        const result = await sdk!.verifyCredentialShareResponseToken(token);
        const credentialType = result.suppliedCredentials[0].type[(result.suppliedCredentials[0].type.length)-1]
        let drivingClass: string | undefined = undefined
        let aadhaarId: string | undefined = undefined
        if (credentialType === 'IDDocumentCredentialPersonV1') {
          drivingClass = JSON.parse(result.suppliedCredentials[0].credentialSubject.data.hasIDDocument?.hasIDDocument.idClass).drivingClass;
          aadhaarId = JSON.parse(result.suppliedCredentials[0].credentialSubject.data.hasIDDocument?.hasIDDocument.idClass).drivingLicenseID;
        }

        setVCData(prevState => [...prevState, {token, validatedResult: result, drivingClass, aadhaarId}])
      }
      if (credentialShareResponseToken) {
        credentialShareResponseToken.map((token: string) => {
          // Check if the vcData already has the token = means it was validated before
          const existingData = vcData.filter(data => data.token == token)
          if (existingData.length == 0){
            return onValidate(token);
          }
        })
      }
    }, [credentialShareResponseToken, sdk])

    return <div>
        <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Aadhaar ID</th>
                  <th>Record Link</th>
                  <th>Validated</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {vcData.map((data, index) => {
                  return (
                    <tr>
                    <td>{data.validatedResult.suppliedCredentials[0].credentialSubject.data.givenName}</td>
                    <td><p>{data.aadhaarId}</p></td>
                    <td><a href={data.drivingClass} >{data.drivingClass}</a></td>
                    <td>{data.validatedResult.isValid ? <img src={CheckCircle} alt='check' style={{height: '28px'}} /> : 
                        <img src={CrossCircle} alt='cross' style={{height: '28px'}} />
                    }
                    </td>
                    {/* <td><Button onClick={() => onClickValidate(data.token)}>Validate</Button></td> */}
                  </tr>
                  )
                })}
              </tbody>
            </Table>
    </div>
}
export default CredentialTable;