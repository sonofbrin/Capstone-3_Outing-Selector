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

    const [formData, setFormData] = React.useState(
        {
            outingTime: "",
            decisionDeadline: "",
            guestEmail: "",
            emails: []
        }
    );

    const emailElements = formData.emails.map(email => <li>{email}</li>);

    function addEmail(event) {
        // event.preventDefault();
        if (formData.guestEmail !== "") {
            setFormData(prevFormData => ({
                ...prevFormData,
                guestEmail: "",
                emails: [prevFormData.guestEmail, ...prevFormData.emails]
            }));
        }
    }

    function handleInputChange(event) {
        const {name, value} = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    function createOuting(event) {
        event.preventDefault();

    }

    return (
        <div
            className="invitation"
            style={{display: 'block', width: 700, padding: 30}}
        >
            {console.log(formData)}
            <Modal isOpen={props.show} toggle={props.toggleInvite}>
                <ModalHeader>
                    Choose guests and times
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={createOuting}>
                        <FormGroup row>
                            <Label
                                for="outing-time"
                                sm={4}
                            >
                                Meeting time
                            </Label>
                            <Col>
                                <Input
                                    type="datetime-local"
                                    id="outing-time"
                                    name="outingTime"
                                    value={formData.outingTime}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="decision-deadline"
                                sm={4}
                            >
                                Decision deadline
                            </Label>
                            <Col>
                                <Input
                                    type="datetime-local"
                                    id="decision-deadline"
                                    name="decisionDeadline"
                                    value={formData.decisionDeadline}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label
                                for="guest-email"
                                sm={4}
                            >
                                Add guest email(s)
                            </Label>
                            <Col sm={6}>
                                <Input
                                    type="email"
                                    id="guest-email"
                                    name="guestEmail"
                                    placeholder="guest@email.com"
                                    value={formData.guestEmail}
                                    onChange={handleInputChange}
                                />
                                <ul style={{listStyleType: "none"}}>
                                    {emailElements}
                                </ul>
                            </Col>
                            <Col sm={2}>
                                <Button type="button" onClick={addEmail}>
                                    +
                                </Button>
                            </Col>
                        </FormGroup>


                        <Button color="primary">
                            Send Invitations
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}