import React, { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";
import { useAuthentication } from "./Authentication";
import { useGlobalTokenValue } from "./MessageListener";

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
                    <td>{data.isValid ? <p> True </p> : <p> False </p>}</td>
                  </tr>
                  )
                })}
              </tbody>
            </Table>
    </div>
}

export default CredentialTable;