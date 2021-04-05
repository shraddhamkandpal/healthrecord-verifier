import React, { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";
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

    useEffect(() => {
      const onValidate = async (token: string) => {
        const result = await sdk!.verifyCredentialShareResponseToken(token);
        console.log(result)
        setVCData(prevState => [...prevState, result])
      }
      
      if (credentialShareResponseToken) {
        credentialShareResponseToken.map((token: string) => {
          return onValidate(token);
        })
      }
    }, [credentialShareResponseToken, sdk])

    return <div>
        <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>Cred ID</th>
                  <th>Name</th>
                  <th>Validated</th>
                </tr>
              </thead>
              <tbody>
                {vcData.map((data, index) => {
                  return (
                    <tr>
                    <th scope="row">{index+1}</th>
                    <td>{data.suppliedCredentials[0].credentialSubject.data.givenName}</td>
                    <td>{data.isValid ? <img src={CheckCircle} style={{height: '28px'}} /> : 
                        <img src={CrossCircle} style={{height: '28px'}} />
                    }
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </Table>
    </div>
}

export default CredentialTable;