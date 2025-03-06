import { Col, Container, Row, Stack } from 'react-bootstrap';
import './App.css'; //APP CSS
import { Header } from './components/Header';
import { WeatherCityUser } from './components/WeatherCityUser';
import { ContextSearchProvider } from './context/ContextSearch';
// COMPONENTE APP
function App() {
  // RENDER
  return (
    <Container className='p-4'>
      <Stack direction='vertical' gap={3}>
        <h1 className='text-bg-info rounded-2 text-center mb-2 p-1'>Clima City</h1>
        <Row>
          <ContextSearchProvider>
            <Col xs='6'>
              <Header />
            </Col>
            <Col xs='6'>
              <WeatherCityUser />
            </Col>
          </ContextSearchProvider>
        </Row>
      </Stack>
    </Container>
  );
}

export default App;
