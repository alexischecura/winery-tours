import Cellar from '../features/landing-page/Cellar';
import Header from '../features/landing-page/Header';
import Hero from '../features/landing-page/Hero';

const cellars = [
  {
    name: 'Bodegas Bianchi',
  },
];

function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {cellars.map((cellar) => (
          <Cellar cellar={cellar} key={cellar.name} />
        ))}
      </main>
    </>
  );
}

export default LandingPage;
