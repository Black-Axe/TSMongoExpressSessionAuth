import React, {useState, useEffect} from "react";

import {  useNavigate } from "react-router-dom";
import SVG from "react-inlinesvg";
//import { useAuth } from "../context/Auth.context";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function UserPage() {
 // const {isAuthenticated,logout, profile} = useAuth();
 // console.log(isAuthenticated + "isAuthenticated");

  const [user, setUser] = useState({});
 // const [anon, setAnon] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
   //   let response = await profile();
     // console.log(response);
     // if(response.verified){
     //   setUser(response);
     //   setLoading(false);
     // }else{
     //   console.log("not verified");
     //   setAnon(true);
     //   setLoading(false);
     // }

     //for now until connected to backend
      setUser({
        name: "John Doe",
        email: "sample@doe.com",
        verified: true,
      });
      setLoading(false);


    }
    fetchData();
    return () => {
      //console.log("unmount");
      setLoading(true);
      setUser({});
    };

  }, []);

  async function handleSubmit(e) {
    //logout
    e.preventDefault();
   // await logout();
    navigate("/");
    


  };
  return (

    loading ? (
      <div>Loading...</div>
    ) : 

    <>
      <Container fluid>
        <div className="section-image" data-image={""}>
          {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          <Container>
            <Row>
              <Col md="8" sm="6">
                <Form action="" className="form" method="">
                  <Card>
                    <Card.Header>
                      <Card.Header>
                        {
                          user.message ? <Card.Title as="h4">{user?.message.toUpperCase()}{" "}{user?.user?.username}{" ["}{user?.access}{"]"}</Card.Title>
                            : <Card.Title as="h4">Not Logged In</Card.Title>
                        }
                          </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="px-1" md="6">
                          <Form.Group>
                            <label>Username</label>
                            <Form.Control
                              defaultValue={user?.user?.username}
                              placeholder="Username"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                          <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <Form.Control
                              placeholder="Email"
                              type="email"
                              defaultValue={user?.user?.email}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>First Name</label>
                            <Form.Control
                              defaultValue=""
                              placeholder="Company"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                          <Form.Group>
                            <label>Last Name</label>
                            <Form.Control
                              defaultValue=""
                              placeholder="Last Name"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>Address</label>
                            <Form.Control
                              defaultValue=""
                              placeholder=""
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            <label>City</label>
                            <Form.Control
                              defaultValue=""
                              placeholder="City"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                          <Form.Group>
                            <label>Country</label>
                            <Form.Control
                              defaultValue=""
                              placeholder="Country"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label>Postal Code</label>
                            <Form.Control
                              placeholder="ZIP Code"
                              type="number"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>About Me</label>
                            <Form.Control
                              cols="80"
                              defaultValue=""
                              placeholder="Here can be your description"
                              rows="4"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                        onClick={()=>{
                          navigate("/");
                        }}
                      >
                       home
                        
                      </Button>
                     
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                        onClick={handleSubmit}
                      >
                        Logout
                        
                      </Button>

                     
                      <div className="clearfix"></div>
                    </Card.Body>
                  </Card>
                </Form>
              </Col>
              <Col md="4">
                <Card className="card-user">
                  <Card.Header className="no-padding">
                    <div className="card-image">
                      <img
                        alt="..."
                        src={
                          "https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                        }
                      ></img>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="author">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        {//render html svg

                          <SVG src={user?.user?.avatar} />
                       

                        }
                        
                        <Card.Title as="h5">{user?.user?.username}</Card.Title>
                      </a>
                      <p className="card-description">{user?.user?.email}</p>
                    </div>
                    <p className="card-description text-center">
                    Access Levels: 
                    {user?.access ? user.acess : "Not Logged In"}
                    </p>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="button-container text-center">
                      <Button
                        className="btn-simple btn-icon"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        variant="link"
                      >
                        <i className="fab fa-facebook-square"></i>
                      </Button>
                      <Button
                        className="btn-simple btn-icon"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        variant="link"
                      >
                        <i className="fab fa-twitter"></i>
                      </Button>
                      <Button
                        className="btn-simple btn-icon"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        variant="link"
                      >
                        <i className="fab fa-google-plus-square"></i>
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default UserPage;
