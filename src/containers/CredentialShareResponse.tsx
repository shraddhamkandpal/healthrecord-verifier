import React, { useEffect, useState } from "react";
import { Alert, Button, Form, FormControl, Modal } from "react-bootstrap";
import { useAuthentication } from "./Authentication";
import { useAsyncFn } from "react-use";
import TextAreaView from "../components/TextAreaView";
import { useGlobalTokenValue } from "./MessageListener";

const CredentialShareResponse = () => {
  const { sdk } = useAuthentication();
  const [
    credentialShareResponseToken,
    setCredentialShareResponseToken,
  ] = useState("");

  const [globalToken] = useGlobalTokenValue();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forceValidate, setForceValidate] = useState(false);

  const [
    { loading, error, value: shareResponse },
    onValidate,
  ] = useAsyncFn(async () => {
    if (!credentialShareResponseToken) {
      throw new Error("Please enter a share response token.");
    }

    return sdk!.verifyCredentialShareResponseToken(
      credentialShareResponseToken
    );
  }, [credentialShareResponseToken]);

  useEffect(() => {
    if (globalToken) {
      setCredentialShareResponseToken(globalToken);
      setForceValidate(true);
    }
  }, [globalToken]);

  useEffect(() => {
    if (forceValidate) {
      onValidate();
      setForceValidate(false);
    }
  }, [forceValidate]);

  const alert = getAlert(loading, error, shareResponse);

  useEffect(() => {
    if (shareResponse) {
      setIsModalOpen(true);
    }
  }, [shareResponse]);

  return (
    <Form>
      <Form.Group controlId="shareResponseToken">
        <Form.Label>Share Response Token</Form.Label>
        <Form.Control
          type="text"
          value={credentialShareResponseToken}
          autoComplete="off"
          onChange={(e) => setCredentialShareResponseToken(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Button size="sm" disabled={loading} onClick={onValidate}>
          Validate
        </Button>
      </Form.Group>
      {alert && (
        <Form.Group>
          <Alert variant={alert.variant} children={alert.message} />
        </Form.Group>
      )}
      {shareResponse && (
        <Form.Group>
          <Button
            disabled={isModalOpen || loading}
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            View
          </Button>
        </Form.Group>
      )}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Verifiable Presentation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {shareResponse && (
            <VerifiablePresentationView shareResponse={shareResponse} />
          )}
        </Modal.Body>
      </Modal>
    </Form>
  );
};

type VerifiablePresentationViewProps = {
  shareResponse: any;
};

const VerifiablePresentationView = ({
  shareResponse,
}: VerifiablePresentationViewProps) => {
  const { did: issuerDid, suppliedCredentials } = shareResponse;

  return (
    <div>
      <Form.Group controlId="issuerDid">
        <Form.Label>Issuer DID:</Form.Label>
        <FormControl disabled autoFocus type="text" value={issuerDid} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Supplied Credentials:</Form.Label>
        <TextAreaView
          rows={23}
          value={JSON.stringify(suppliedCredentials, undefined, 2)}
        />
      </Form.Group>
    </div>
  );
};

function getAlert(
  loading: boolean,
  error: undefined | Error,
  response: undefined | string
): { variant: string; message: string } | undefined {
  if (loading) {
    return {
      variant: "warning",
      message: "Validating share response token.",
    };
  }

  if (error) {
    return {
      variant: "danger",
      message: `Failed to validate share response token: ${error.message}`,
    };
  }

  if (response) {
    return {
      variant: "success",
      message: "Share Response Token is valid.",
    };
  }

  return undefined;
}

export default CredentialShareResponse;
