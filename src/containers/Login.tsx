import React, { FC, useState, useEffect } from "react";
import { useAuthentication } from "./Authentication";
import { Button, Form, FormControl } from "react-bootstrap";
import config from '../config';
import './Login.css';

const Login: FC = () => {
  const { loading, login } = useAuthentication();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shareCredRequestToken, setShareCredRequestToken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpbnRlcmFjdGlvblRva2VuIjp7ImNyZWRlbnRpYWxSZXF1aXJlbWVudHMiOlt7InR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJOYW1lQ3JlZGVudGlhbFBlcnNvblYxIl0sImNvbnN0cmFpbnRzIjpbXX1dLCJjYWxsYmFja1VSTCI6IiJ9LCJleHAiOjE2MTc5NjExNDg3MDAsInR5cCI6ImNyZWRlbnRpYWxSZXF1ZXN0IiwianRpIjoiN2Y5ZTAyNWNjNmQyYTJjYSIsImlzcyI6ImRpZDplbGVtOkVpQUFUek84MkhaeEY5bGUydnE1Zm1lSkJyazdZS0RNSUIzVFotT0tDUWVuN2c7ZWxlbTppbml0aWFsLXN0YXRlPWV5SndjbTkwWldOMFpXUWlPaUpsZVVwMlkwZFdlVmxZVW5CaU1qUnBUMmxLYW1OdFZtaGtSMVZwVEVOS2NtRlhVV2xQYVVscVkwaEtjR0pYUm5sbFUwbHpTVzFHYzFwNVNUWkphMVpVVFdwVk1sTjVTamtpTENKd1lYbHNiMkZrSWpvaVpYbEtRVmt5T1hWa1IxWTBaRU5KTmtsdGFEQmtTRUo2VDJrNGRtUjZUbkJhUXpWMlkyMWpkbU15Vm1wa1dFcHdaRWhyZG1ScVNXbE1RMHAzWkZkS2MyRlhUa3hhV0d0cFQyeDBOMGx0Ykd0SmFtOXBTVE5DZVdGWE1XaGpibXRwVEVOS01XTXlSbTVhVTBrMlNXNU9jRm95TlhCaWJXTnBURU5LTUdWWVFteEphbTlwVlRKV2FtTkVTVEZPYlhONFZtMVdlV0ZYV25CWk1rWXdZVmM1ZFZNeVZqVk5ha0Y0VDBOSmMwbHVRakZaYlhod1dUQjBiR1ZWYUd4bFEwazJTV3BCZVUxSFRYcGFSRmw0VFhwck1VMUVZM2hPUjAwd1RsZEZlazVxV1RWYVYwVXhUbGRhYWs1VVNteE9ha2swV2tSUk1FMTZUVFZPYWswMFQxUlNiRTlFUm0xWk1sWnJUVlJDYVU1RVZUUlpiVlY0VFRKRmVFNTVTamxNU0hOcFlWZFJhVTlwU1dwamJWWnFZak5hYkdOdWEybE1RMG94WXpKR2JscFRTVFpKYmtwc1dUSTVNbHBZU2pWSmFYZHBaRWhzZDFwVFNUWkpiRTVzV1ROQmVVNVVXbkpOVmxwc1kyMXNiV0ZYVG1oa1IyeDJZbXQwYkdWVVNYZE5WR2RwVEVOS2QyUlhTbk5oVjA1TVdsaHNTVnBZWjJsUGFVbDNUV3BCTWxscVRYbFBWRkY2V1cxRk1sa3lXVEZOVjFFeVRrUkJORnBFVm14Tk1sRXlXbXBaTUZreVNUTk5la3BxV2xSWk0xbFhSVFJPYlZaclRsUnJOVnBYU20xT2FtTXdUV3BCZVZwVVJYaE5SMDAwV2tkRmFXWldNSE5KYlVZeFpFZG9iR0p1VW5CWk1rWXdZVmM1ZFVscWNHSkphVTUzWTIxc2RGbFlTalZKYkRCelNXMUdlbU15Vm5sa1IyeDJZbXN4YkdSSGFIWmFRMGsyVjNsSmFtTklTbkJpVjBaNVpWTktaR1pSSWl3aWMybG5ibUYwZFhKbElqb2lUMlJ5TVd0eVpYZHFkMFJRWVVGcFNHRkdNa3RzTW1GTGFYaHFXamRWT0c4MmJWOWlUV2hqYVY5a1NuWkdkV2RSZUY4dE1saG1UMk0xU0hsYU5DMWZWSFJ2VDJ4elZXeG1kM3B2TTNneFp6bE1VM2RuVldjaWZRI3ByaW1hcnkifQ.bdb944306b83312a3585a087ce920bac09185563aa666b37bbbd0a6e0a31b133737d5c521a0ef92db2e244bd9348f41e2d98b541adc598564c3027f5ad892ec0');

  async function onLogin() {
    try {
      await login.fromLoginAndPassword(username, password);
    } catch (err) {
      alert(err.message);
    }
  }

  // useEffect(() => {
  //   const credentialRequirements = [
  //     {
  //       "type":
  //       [
  //         "VerifiableCredential","IDDocumentCredentialPersonV1"]
  //     }
  //   ]
  //   const onGenerate = async () => {
  //     const shareToken = await sdk!.generateCredentialShareRequestToken(
  //       credentialRequirements
  //     );
  //     if (shareToken){
  //       setShareCredRequestToken(shareToken)
  //     }
  //   }
  //   onGenerate();
  // }, [])

  return (
    <div className='Login'>
      <form className='Form'>
        <h1 className='Title'>Verifier Login</h1>
        <p className='Info'>
          Login in order to continue
        </p>

        <Form style={{ width: 280 }}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <FormControl
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <FormControl
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Button block disabled={loading} onClick={onLogin}>
            Login
          </Button>
         <p> Looking to rent for a vehicle for your trip? Share your driving license credentials <a href={config.wallet_url + '/share-credentials?token=' + shareCredRequestToken} target='_blank'>here!</a></p>
        </Form>
      </form>
    </div>
    
  );
};

export default Login;
