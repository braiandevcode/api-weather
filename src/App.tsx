import './App.css';
import { Header } from './components/Header';
import { SectionWeatherCityUser} from './components/SectionWeatherCityUser';

function App() {
  // RENDER
  return (
    <main>
      <>
        <Header />
        <SectionWeatherCityUser />
      </>
    </main>
  );
}

export default App;
