import React, { FC } from "react";
import { useAuthentication } from "./Authentication";
import { Card } from "react-bootstrap";
import "./Home.css";
import CredentialTable from './CredentialTable';
const Home: FC = () => {
  const { sdk } = useAuthentication();
  const did = sdk!.did;
  return (
    <div className="Home">
      <Card>
        <Card.Header as="h5">
          Verifiable Credential Index
        </Card.Header>
        <Card.Body children={<CredentialTable />} />
      </Card>
    </div>
  );
};
export default Home;