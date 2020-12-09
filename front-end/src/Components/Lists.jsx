/** @format */

import React, { Component } from "react";
import { Col, Row, Container, Card, Nav } from "react-bootstrap";
import { fetchListOfStudents } from "./index.js";
import uniqid from "uniqid";

export class Lists extends Component {
  state = {
    students: [],
  };

  componentDidMount = async () => {
    const students = await fetchListOfStudents();
    console.log(students);
    this.setState({ students });
  };

  render() {
    return (
      <Container>
        <Row>
          {this.state.students.length > 0 &&
            this.state.students.map((student) => {
              const {
                name,
                description,
                liveUrl,
                repoUrl,
                ID,
                modifiedAt,
              } = student;
              return (
                <Col className="mt-5 mb-5" xs={3} key={uniqid()} id="name-col">
                  <Card>
                    <Card.Title style={{ color: "black" }} className="title">
                      {name}
                    </Card.Title>
                    <Card.Text style={{ color: "black" }}>
                      {description}
                    </Card.Text>
                    <Nav.Link href={liveUrl}>Live URL</Nav.Link>
                    <Nav.Link href={repoUrl}>Repo URL</Nav.Link>
                    <Card.Footer>
                      <small className="text-muted">StudentID: {ID}</small>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">
                        At: {modifiedAt.slice(0, 10)} &nbsp; On:{" "}
                        {modifiedAt.slice(11, 16)}
                      </small>
                    </Card.Footer>
                  </Card>{" "}
                </Col>
              );
            })}
        </Row>
      </Container>
    );
  }
}

export default Lists;
