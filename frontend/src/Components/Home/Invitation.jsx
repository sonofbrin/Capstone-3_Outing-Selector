import React from "react";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Col,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
  } from "reactstrap";

export default function Invitation(props) {

    const [emails, setEmails] = React.useState(["asdf"]);

    function addEmail(event) {
        event.preventDefault();
        setEmails((prevEmails) => [event.target.value, ...prevEmails])
    }

    function createOuting(event) {
        event.preventDefault();

    }

    return (
        <div
            className="invitation"
            style={{display: 'block', width: 700, padding: 30}}
        >
            <Modal isOpen={true} >
                <ModalHeader>
                    Choose guests and times
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label
                                for="outing-date"
                                sm={4}
                            >
                                Outing date
                            </Label>
                            <Col>
                                <Input
                                    type="datetime"
                                    id="outing-date"
                                    name="outing-date"
                                    // onChange={handleInputChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="decision-date"
                                sm={4}
                            >
                                Decision deadline
                            </Label>
                            <Col>
                                <Input
                                    type="date"
                                    id="decision-date"
                                    name="decision-date"
                                    // onChange={handleInputChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="guest-email"
                                sm={4}
                            >
                                Guest email(s)
                            </Label>
                            <Col sm={6}>
                                <Input
                                    type="email"
                                    id="guest-email"
                                    name="guest-email"
                                    placeholder="guest@email.com"

                                    // onChange={handleInputChange}
                                />
                                {emails}
                            </Col>
                            <Col sm={2}>
                                <Button onClick={addEmail}>
                                    +
                                </Button>
                            </Col>
                        </FormGroup>


                        <Button color="primary" type="submit" onClick={createOuting}>
                            Send Invitations
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}