import React, { useState } from "react";
import { Alert, Form, Button, InputGroup } from "react-bootstrap";
import { useAsyncFn } from "react-use";
import { useAuthentication } from "./Authentication";
import AffinidiVCTypeSelectList, {
  CredentialRequirement,
} from "../components/AffinidiVCTypeSelectList";

import "./CredentialShareRequest.css";

const CredentialShareRequest = () => {
  const { sdk, message } = useAuthentication();

  const [holderDid, setHolderDid] = useState<string>("");
  const [shouldSendMessage, setShouldSendMessage] = useState<boolean>(true);

  const [credentialRequirements, setCredentialRequirements] = useState<
    CredentialRequirement[] | undefined
  >(undefined);

  const [
    { loading, error, value: credentialShareRequestToken },
    onGenerate,
  ] = useAsyncFn(async () => {
    if (!credentialRequirements) {
      throw new Error("Please select at least one verifiable credential type");
    }

    const shareRequestToken = await sdk!.generateCredentialShareRequestToken(
      credentialRequirements
    );

    if (shouldSendMessage && holderDid) {
      await message!.send(holderDid, { token: shareRequestToken });
    }

    return shareRequestToken;
  }, [credentialRequirements, shouldSendMessage, holderDid]);

  const alert = getAlert(loading, error, credentialShareRequestToken);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Verifiable Credential Type</Form.Label>
        <AffinidiVCTypeSelectList
          setCredentialRequirements={setCredentialRequirements}
        />
      </Form.Group>
      <Form.Group controlId="holderDid">
        <Form.Label>Holder Did (Optional)</Form.Label>
        <Form.Control
          type="text"
          value={holderDid}
          onChange={(e) => setHolderDid(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Button size="sm" disabled={loading} onClick={onGenerate}>
          Generate
        </Button>
        <Form.Check
          inline
          label="Send token to holder"
          disabled={!holderDid || loading}
          checked={shouldSendMessage}
          onClick={() => setShouldSendMessage(!shouldSendMessage)}
          style={{ marginLeft: 10 }}
        />
      </Form.Group>
      <Form.Group controlId="shareRequestToken">
        <Form.Label>Share Request Token</Form.Label>
        <Form.Control
          readOnly
          type="text"
          value={loading ? "-" : credentialShareRequestToken || ""}
        />
      </Form.Group>
      {alert && (
        <Form.Group>
          <Alert variant={alert.variant} children={alert.message} />
        </Form.Group>
      )}
    </Form>
  );
};

function getAlert(
  loading: boolean,
  error: undefined | Error,
  credentialShareRequestToken: undefined | string
): { variant: string; message: string } | undefined {
  if (loading) {
    return {
      variant: "warning",
      message: "Generating credential share request token.",
    };
  }

  if (error) {
    return {
      variant: "danger",
      message: `Failed to generate credential share request token: ${error.message}`,
    };
  }

  if (credentialShareRequestToken) {
    return {
      variant: "success",
      message: "Generated credential share request token.",
    };
  }

  return undefined;
}

export default CredentialShareRequest;
