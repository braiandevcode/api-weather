import { Col, Container, Row, Stack } from 'react-bootstrap';
import './App.css'; //APP CSS
import { Header } from './components/Header';
import { WeatherCityUser } from './components/WeatherCityUser';
import { ContextSearchProvider } from './context/ContextSearch';
import { WeatherTimeHour } from './components/WeatherTimeHour';
import { ContextForecastProvider } from './context/ContextWheatherExtend';
import { WeatherTimeWeek } from './components/WeatherTimeWeek';

// COMPONENTE APP
function App() {
  // RENDER
  return (
    <Container className='p-4'>
      <Stack direction='vertical' gap={3}>
        <h1 className="text-white bg-primary rounded-4 text-center shadow fw-bold text-uppercase p-3 display-5">
          Clima City
        </h1>
        <Row className='g-4'>
          <ContextSearchProvider>
            <ContextForecastProvider>
              <Row className='g-1'>
                <Col xs={12} lg={12} xl={6} xxl={6} className='bg-body-tertiary p-4'>
                  <Header />
                </Col>
                <Col xs={12} lg={12} xl={6} xxl={6} className='p-4 bg-success-subtle'>
                  <WeatherCityUser />
                </Col>
              </Row>
              <Col xs='12'>
                <WeatherTimeHour />
              </Col>
              <Col xs='12'>
                <WeatherTimeWeek />
              </Col>
            </ContextForecastProvider>
          </ContextSearchProvider>
        </Row>
      </Stack>
    </Container>
  );
}

export default App;
