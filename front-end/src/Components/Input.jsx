/** @format */

import React, { Component } from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { createStudent } from "./index.js";
import "./Input.css";

export class Input extends Component {
  state = {
    student: { name: "", repoUrl: "", liveUrl: "", description: "" },
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    alert("post submited");
    await createStudent(this.state.student);
    this.setState({
      student: { name: "", repoUrl: "", liveUrl: "", description: "" },
    });
  };

  updateForm = (e) => {
    let object = { ...this.state.student };
    let currentId = e.currentTarget.id;
    object[currentId] = e.currentTarget.value;
    this.setState({ student: object });
  };
  render() {
    return (
      <>
        <Container>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group>
              <Form.Label>Repository URL</Form.Label>
              <Form.Control
                id="repoUrl"
                value={this.state.student.repoUrl}
                onChange={this.updateForm}
                placeholder="Paste your Repository URL here"
              />
              <Form.Text className="text-muted">
                We'll never share your url with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Live URL</Form.Label>
              <Form.Control
                id="liveUrl"
                value={this.state.student.liveUrl}
                onChange={this.updateForm}
                placeholder="Paste your Live URL here"
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Control
                  id="name"
                  value={this.state.student.name}
                  onChange={this.updateForm}
                  placeholder="Full name"
                />
              </Col>
              <Col>
                <Form.Control
                  id="description"
                  value={this.state.student.description}
                  onChange={this.updateForm}
                  placeholder="Description"
                />
              </Col>
            </Row>
            <div className="d-flex">
              <Button type="submit" className="px-5 my-4 mx-auto rounded-pill">
                yeet
              </Button>
            </div>
          </Form>
        </Container>
      </>
    );
  }
}

export default Input;
