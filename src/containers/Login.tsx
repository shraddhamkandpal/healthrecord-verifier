import React, { FC, useState, useEffect } from "react";
import { useAuthentication } from "./Authentication";
import { Button, Form, FormControl } from "react-bootstrap";
import config from '../config';

const Login: FC = () => {
  const { loading, login } = useAuthentication();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shareCredRequestToken, setShareCredRequestToken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpbnRlcmFjdGlvblRva2VuIjp7ImNyZWRlbnRpYWxSZXF1aXJlbWVudHMiOlt7InR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJOYW1lQ3JlZGVudGlhbFBlcnNvblYxIl0sImNvbnN0cmFpbnRzIjpbXX1dLCJjYWxsYmFja1VSTCI6IiJ9LCJleHAiOjE2MTc2MTkwMjY2NDQsInR5cCI6ImNyZWRlbnRpYWxSZXF1ZXN0IiwianRpIjoiZGUyOWZlNjczMTliOTNkYiIsImlzcyI6ImRpZDplbGVtOkVpQUs1Yl8tYjBOajRhOGxIaXc1cnhTQU1oUDl3Zm5tVFhzRXhNR2Mtc3JfWnc7ZWxlbTppbml0aWFsLXN0YXRlPWV5SndjbTkwWldOMFpXUWlPaUpsZVVwMlkwZFdlVmxZVW5CaU1qUnBUMmxLYW1OdFZtaGtSMVZwVEVOS2NtRlhVV2xQYVVscVkwaEtjR0pYUm5sbFUwbHpTVzFHYzFwNVNUWkphMVpVVFdwVk1sTjVTamtpTENKd1lYbHNiMkZrSWpvaVpYbEtRVmt5T1hWa1IxWTBaRU5KTmtsdGFEQmtTRUo2VDJrNGRtUjZUbkJhUXpWMlkyMWpkbU15Vm1wa1dFcHdaRWhyZG1ScVNXbE1RMHAzWkZkS2MyRlhUa3hhV0d0cFQyeDBOMGx0Ykd0SmFtOXBTVE5DZVdGWE1XaGpibXRwVEVOS01XTXlSbTVhVTBrMlNXNU9jRm95TlhCaWJXTnBURU5LTUdWWVFteEphbTlwVlRKV2FtTkVTVEZPYlhONFZtMVdlV0ZYV25CWk1rWXdZVmM1ZFZNeVZqVk5ha0Y0VDBOSmMwbHVRakZaYlhod1dUQjBiR1ZWYUd4bFEwazJTV3BCZWxwVVRUUk9SRmwzV2xkWk5VMHlXbXhhVkVreFRYcFZNMDVxU1hwYVYxa3lXVlJuZVUxcVVUTk9WMHBwV21wVk1GcHFaM2hOVjBsM1dYcHNiRTVFWnpGWlZHaHNUbnBPYVZscVJYZGFSRmt3V1ZSV2FrOURTamxNU0hOcFlWZFJhVTlwU1dwamJWWnFZak5hYkdOdWEybE1RMG94WXpKR2JscFRTVFpKYmtwc1dUSTVNbHBZU2pWSmFYZHBaRWhzZDFwVFNUWkpiRTVzV1ROQmVVNVVXbkpOVmxwc1kyMXNiV0ZYVG1oa1IyeDJZbXQwYkdWVVNYZE5WR2RwVEVOS2QyUlhTbk5oVjA1TVdsaHNTVnBZWjJsUGFVbDNUWHBCZUZsNlRtcE5iVlp0V21wS2JGcFhSbWxhUjFFd1dUSkdhRTFxYUcxUFIxbDRUWHBuTUUxVWF6VlphbWN5V2tkTmVrMUVSbWxPYW1zeldtMWFiVTFFVFRCT2FsVTFXVlJrYVU1cVJUVk9WMFUxVGtScmFXWldNSE5KYlVZeFpFZG9iR0p1VW5CWk1rWXdZVmM1ZFVscWNHSkphVTUzWTIxc2RGbFlTalZKYkRCelNXMUdlbU15Vm5sa1IyeDJZbXN4YkdSSGFIWmFRMGsyVjNsSmFtTklTbkJpVjBaNVpWTktaR1pSSWl3aWMybG5ibUYwZFhKbElqb2lkbFJzWWtaNk4ydHlWakJ3U2xrNU4yOVpMV2d4YW13M2FWOUdZbHB5ZUhaaGJreEhRMEV3Wm5kbGMxTlZhbE5aYTI5NVlsQm5VV1JaTXpoNFpIcG9ha0ZVUjBkSFpYbDZWa2hEY0hvMlJWbFJTbWxSUzJjaWZRI3ByaW1hcnkifQ.fc887f448dff16ce52919bc484bb834a1b58efb9168f3c108a0028c0b6a719db66feda0e812acea23ac6efd6cb27418637250dd250890211f4d427d4457d8a93');

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

      <p> Looking to rent for a vehicle for your trip? Share your credentials <a href={config.wallet_url + '/share-credentials?token=' + shareCredRequestToken} target='_blank'>here!</a></p>
    </Form>
  );
};

export default Login;
