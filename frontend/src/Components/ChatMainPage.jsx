import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetChannelsQuery } from '../usersApi';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../Slice/authSlice';
import { setChannels } from '../Slice/channelsSlice';
import { Container, Navbar, Button, Nav, ListGroup } from 'react-bootstrap';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token !== null) {
      dispatch(setAuthToken(token));
    }

    if (token === null) {
      navigate("/login");
    }
  }, [token, dispatch, navigate]);

  const { data, error } = useGetChannelsQuery();

  useEffect(() => {
    if (error) {
      console.error(error);
    }

    if (data) {
      dispatch(setChannels(data));
      console.log(data);
    }
  }, [data, error, dispatch]);

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button variant="primary">Выйти</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="flex-grow-1 my-4 rounded shadow">
        <div className="row h-100 bg-white">
          <div className="col-4 col-md-2 border-end bg-light p-0">
            <div className="d-flex justify-content-between p-4">
              <b>Каналы</b>
              <Button variant="primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3H4a.5.5 0 0 1 0-1h3V4A.5.5 0 0 1 8 4"></path>
                </svg>
                <span className="visually-hidden">+</span>
              </Button>
            </div>
            <ListGroup className="px-2 mb-3 overflow-auto h-100">
              <ListGroup.Item action variant="secondary">#general</ListGroup.Item>
              <ListGroup.Item action>#random</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col p-0 d-flex flex-column">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b># general</b></p>
              <span className="text-muted">0 сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5"></div>
            <div className="mt-auto px-5 py-3">
              <form noValidate="" className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <input
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 form-control"
                    value=""
                  />
                  <Button type="submit" disabled="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
      <div className="Toastify"></div>
    </div>
  );
};

export default MainPage;
