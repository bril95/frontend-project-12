import { Container, Navbar, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AuthorizationContext from '../Context/AuthorizationContext';

const HeaderNavbar = ({ showExitButton }) => {
  const { logout } = useContext(AuthorizationContext);
  const { t } = useTranslation();

  const handleExit = () => {
    logout();
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">{t('headers.hexletChat')}</Navbar.Brand>
        {showExitButton && <Button variant="primary" onClick={handleExit}>{t('chatMainPage.exit')}</Button>}
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;
