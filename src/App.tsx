import { Col, Container, Row, Stack } from 'react-bootstrap';
import './App.css'; //APP CSS
import { Header } from './components/Header';
import { WeatherCityUser } from './components/WeatherCityUser';
import { ContextSearchProvider } from './context/ContextSearch';
import { WeatherTimeHour } from './components/WeatherTimeHour';
import { ContextForecastProvider } from './context/ContextForecastWheather';
import { WeatherTimeWeek } from './components/WeatherTimeWeek';
import { useEffect } from 'react';
import { Footer } from './components/Footer';

function App() {
  useEffect(() => {
    // Obtener el idioma del navegador y asignarlo al atributo lang del HTML
    const language = navigator.language;
    if (document.documentElement) {
      document.documentElement.lang = language;
    }
  }, []);

  return (
    <Container fluid className="p-4 z-0" style={{ maxWidth: '2024px', margin: '0 auto' }}>
      <Stack direction="vertical" gap={3} className='min-vh-100'>
        <h1 className="text-white bg-primary rounded-4 text-center shadow fw-bold text-uppercase p-3 display-5">
          Weather City
        </h1>
        <ContextSearchProvider>
          <ContextForecastProvider>
            <Row className="g-4">
              <Col xs={12} md={6} className="bg-body-tertiary p-4">
                <Header />
              </Col>
              <Col xs={12} md={6} className="p-4 bg-success-subtle">
                <WeatherCityUser />
              </Col>
            </Row>
            <Row className="g-4">
              <Col xs={12}>
                <WeatherTimeHour />
              </Col>
            </Row>
            <Row className="g-4">
              <Col xs={12}>
                <WeatherTimeWeek />
              </Col>
            </Row>
          </ContextForecastProvider>
        </ContextSearchProvider>
        <Footer />
      </Stack>
    </Container>

  );
}

export default App;

