import React from "react";

import {
  Actions,
  Button,
  DatePicker,
  Input,
  Message,
  Modal,
  PheliaMessageProps,
  Section,
  Text,
  TextField
} from "../core";

export function MyModal() {
  return (
    <Modal title="A fancy pants modal" submit="submit the form">
      <Input label="Expiration date">
        <DatePicker action="date" />
      </Input>

      <Input label="Little bit">
        <TextField action="little-bit" placeholder="just a little bit" />
      </Input>

      <Input label="Summary">
        <TextField
          action="summary"
          placeholder="type something here"
          multiline
        />
      </Input>
    </Modal>
  );
}

type State = "submitted" | "canceled" | "init";

export function ModalExample({ useModal, useState }: PheliaMessageProps) {
  const [state, setState] = useState<State>("state", "init");
  const [form, setForm] = useState("form", "");

  const openModal = useModal(
    "modal",
    MyModal,
    form => {
      setState("submitted");
      setForm(JSON.stringify(form, null, 2));
    },
    () => setState("canceled")
  );

  return (
    <Message text="A modal example">
      {state === "canceled" && (
        <Section>
          <Text emoji>:no_good: why'd you have to do that</Text>
        </Section>
      )}

      {state === "submitted" && (
        <Section>
          <Text type="mrkdwn">{"```\n" + form + "\n```"}</Text>
        </Section>
      )}

      {state !== "init" && (
        <Actions>
          <Button
            style="danger"
            action="reset"
            onClick={() => setState("init")}
          >
            reset
          </Button>
        </Actions>
      )}

      {state === "init" && (
        <Actions>
          <Button
            style="primary"
            action="openModal"
            onClick={() => openModal()}
          >
            Open the modal
          </Button>
        </Actions>
      )}
    </Message>
  );
}
