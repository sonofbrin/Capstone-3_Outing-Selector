import axios from "axios";
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
  import { baseUrl } from "../../Shared/baseUrl";

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
        const config = {
            headers: { Authorization: `Bearer ${props.token}` }
        }
        const data = {
            dateTime: formData.outingTime,
            decisionTime: formData.decisionDeadline,
            outingGuests: formData.emails.map(email => ({"guestEmail": email}))
        }
        axios.post(baseUrl + "/outing?location=" + props.location, data, config)
        .then(response => {
            if (response.status === 201) {
                alert("Outing created successfully")
                props.toggle();
            }
        })
        .catch((error) => alert("more information needed to create invite"))
        props.toggle();
    }

    return (
        <div
            className="invitation"
            style={{display: 'block', width: 700, padding: 30}}
        >
            <Modal isOpen={props.show} toggle={props.toggle}>
                <ModalHeader>
                    Choose outing guests and times
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
                        <Button color="primary">Send Invitations</Button>
                    </Form>
                    <Button onClick={props.toggle}>Close</Button>
                </ModalBody>
            </Modal>
        </div>
    )
}