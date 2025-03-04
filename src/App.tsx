import { Col, Container, Row, Stack } from 'react-bootstrap';
import './App.css'; //APP CSS
import { Header } from './components/Header';
import { SectionWeatherCityUser } from './components/SectionWeatherCityUser';
// COMPONENTE APP
function App() {
  // RENDER
  return (
    <Container className='p-4'>
      <Stack direction='vertical' gap={3}>
        <h1 className='text-bg-info rounded-2 text-center mb-2 p-1'>Clima City</h1>
        <Row>
          <Col xs='6'>
            <Header />
          </Col>
          <Col xs='6'>
            <SectionWeatherCityUser />
          </Col>
        </Row>
      </Stack>
    </Container>
  );
}

export default App;
