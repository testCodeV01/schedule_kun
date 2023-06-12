import { Button, Container, Dropdown, Form, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap';

import styles from './styles.module.css';

const Dashboard = ({ children }: { children: any }) => {
  const expand = 'lg';

  return (
    <>
      <Navbar className={styles.navbar} bg="light" expand={expand}>
        <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
            className="offcanvas-size-sm"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <div className={`h-100 clearfix ${styles.contents}`}>
        <div className={`d-none d-${expand}-block float-start overflow-auto ${styles.sidebar}`}>
          <div className="p-3">
            <Button className={`w-100 ${styles.sideMenuButton}`}>Home</Button>
            <Button className={`w-100 ${styles.sideMenuButton}`}>Link</Button>
            <Dropdown>
              <Dropdown.Toggle className={`w-100 ${styles.sideMenuDropdown}`}>Dropdown</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className={styles.sideMenuDropdownItem}>Action</Dropdown.Item>
                <Dropdown.Item className={styles.sideMenuDropdownItem}>Another action</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item className={styles.sideMenuDropdownItem}>Something else here</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className={`h-100 pl-sidebar pl-${expand}-sidebar ${styles.mainContents}`}>
          <div className="p-3">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;