import React, { FC, useState } from "react";
import { useAuthentication } from "./Authentication";
import { Button, Form, FormControl } from "react-bootstrap";
import config from '../config';

const Login: FC = () => {
  const { loading, login } = useAuthentication();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shareCredRequestToken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpbnRlcmFjdGlvblRva2VuIjp7ImNyZWRlbnRpYWxSZXF1aXJlbWVudHMiOlt7InR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJJRERvY3VtZW50Q3JlZGVudGlhbFBlcnNvblYxIl0sImNvbnN0cmFpbnRzIjpbXX1dLCJjYWxsYmFja1VSTCI6IiJ9LCJleHAiOjE2MjA0MDc2NjEwMzksInR5cCI6ImNyZWRlbnRpYWxSZXF1ZXN0IiwianRpIjoiMGYyMzhiNGIwMjg1M2NmOCIsImlzcyI6ImRpZDplbGVtOkVpQ29JLWhKTUF5a0Z1SmdEYU1RX2Nrd1ZIY3JENU9VTnN2WElCMjFFQTZ5MWc7ZWxlbTppbml0aWFsLXN0YXRlPWV5SndjbTkwWldOMFpXUWlPaUpsZVVwMlkwZFdlVmxZVW5CaU1qUnBUMmxLYW1OdFZtaGtSMVZwVEVOS2NtRlhVV2xQYVVscVkwaEtjR0pYUm5sbFUwbHpTVzFHYzFwNVNUWkphMVpVVFdwVk1sTjVTamtpTENKd1lYbHNiMkZrSWpvaVpYbEtRVmt5T1hWa1IxWTBaRU5KTmtsdGFEQmtTRUo2VDJrNGRtUjZUbkJhUXpWMlkyMWpkbU15Vm1wa1dFcHdaRWhyZG1ScVNXbE1RMHAzWkZkS2MyRlhUa3hhV0d0cFQyeDBOMGx0Ykd0SmFtOXBTVE5DZVdGWE1XaGpibXRwVEVOS01XTXlSbTVhVTBrMlNXNU9jRm95TlhCaWJXTnBURU5LTUdWWVFteEphbTlwVlRKV2FtTkVTVEZPYlhONFZtMVdlV0ZYV25CWk1rWXdZVmM1ZFZNeVZqVk5ha0Y0VDBOSmMwbHVRakZaYlhod1dUQjBiR1ZWYUd4bFEwazJTV3BCZVZwdFNUSmFSRUYzVDBSUmVVNVhXVEJhYW1ScldYcG5lVTlFU1ROYWFtYzFUa1JSTlUxWFVYcFBWRUpwV2xSamVWcEhVWGRPVkdzd1RucFpNMXBIVVhkTlZFRXdUVlJGZUU1RVVtaE9lbEYzV2xSc2FrMVRTamxNU0hOcFlWZFJhVTlwU1dwamJWWnFZak5hYkdOdWEybE1RMG94WXpKR2JscFRTVFpKYmtwc1dUSTVNbHBZU2pWSmFYZHBaRWhzZDFwVFNUWkpiRTVzV1ROQmVVNVVXbkpOVmxwc1kyMXNiV0ZYVG1oa1IyeDJZbXQwYkdWVVNYZE5WR2RwVEVOS2QyUlhTbk5oVjA1TVdsaHNTVnBZWjJsUGFVbDNUV3ByTWsweVVtMVBWR3hzV1hwUk5VNVVSVFJaVjFVMFRtcFNhMDFxUm0xYWJVVXdUV3BhYVU1NlRYZE5la1pxV2xSck1FOVVRVE5QUkZac1dXcFJkMWw2VVRSTlYwa3dUa2RGTkU1RVdUUlpWMWt5VFRKRmFXWldNSE5KYlVZeFpFZG9iR0p1VW5CWk1rWXdZVmM1ZFVscWNHSkphVTUzWTIxc2RGbFlTalZKYkRCelNXMUdlbU15Vm5sa1IyeDJZbXN4YkdSSGFIWmFRMGsyVjNsSmFtTklTbkJpVjBaNVpWTktaR1pSSWl3aWMybG5ibUYwZFhKbElqb2lXa0l6T0RGaFpVeE1kbm90YURoelZtcHhjMHRaZEY4NU1WUmhWRUpCV2pabmFEVXpUVmRXZW5OT1oxcDRVV3BUVlZWcmRIcElVemhrVTJkUE9FSmliWE5GVDFsUFJIUk5XVUUzWW1wUk5GbFZiMjF0UVhjaWZRI3ByaW1hcnkifQ.5eff0956ff21c9fd2abfd94cc97b089b901f93cc2a91c4801e860466496fc741037cb13a70e3cc165fb140384d5133f47c3780ef311e852574aa9b33c6a6cb3b');

  async function onLogin() {
    try {
      await login.fromLoginAndPassword(username, password);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className='Login'>
      <div className='Form'>
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

         <p> Looking to get your medical queries solved? Share your driving health record <a href={config.wallet_url + '/share-credentials?token=' + shareCredRequestToken} target='_blank' rel="noopener noreferrer">here!</a></p>
        </Form>
      </div>
    </div>
    
  );
};

export default Login;
