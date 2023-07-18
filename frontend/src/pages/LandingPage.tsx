import Cellar from '../features/landing-page/Winery';
import Header from '../features/landing-page/Header';
import Hero from '../features/landing-page/Hero';
import SubHeading from '../ui/SubHeading';
import WineryGallery from '../features/landing-page/WineryGallery';

const wineries = [
  {
    name: 'Bodega Bianchi',
  },
];

const wineImages = [
  {
    id: 'udj2tD3WKsY',
    alt: 'people tossing their clear wine glasses',
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzA1ODl8MHwxfHNlYXJjaHwxfHx3aW5lcnl8ZW58MHx8fHwxNjg5NjQwNDc1fDA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: 'zDlusnb3G3Q',
    alt: 'wine barrel lot',
    url: 'https://images.unsplash.com/photo-1572913017567-02f0649bc4fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzA1ODl8MHwxfHNlYXJjaHwyfHx3aW5lcnl8ZW58MHx8fHwxNjg5NjQwNDc1fDA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: 'IQVFVH0ajag',
    alt: 'grass field',
    url: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzA1ODl8MHwxfHNlYXJjaHwzfHx3aW5lcnl8ZW58MHx8fHwxNjg5NjQwNDc1fDA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: '2cRXSWyMHA8',
    alt: 'green trees during daytime',
    url: 'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzA1ODl8MHwxfHNlYXJjaHw0fHx3aW5lcnl8ZW58MHx8fHwxNjg5NjQwNDc1fDA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: 'H3QKtIhVbyw',
    alt: 'black round fruits on green grass field during daytime',
    url: 'https://images.unsplash.com/photo-1593535388526-a6b8556c5351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzA1ODl8MHwxfHNlYXJjaHw1fHx3aW5lcnl8ZW58MHx8fHwxNjg5NjQwNDc1fDA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: 'aF1NPSnDQLw',
    alt: 'clear wine glass overlooking orchard during daytime',
    url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzA1ODl8MHwxfHNlYXJjaHw2fHx3aW5lcnl8ZW58MHx8fHwxNjg5NjQwNDc1fDA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: 'apZFS9OrA8k',
    alt: 'blue berries on green leaf',
    url: 'https://images.unsplash.com/photo-1596991456771-234e380e63bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzA1ODl8MHwxfHNlYXJjaHw3fHx3aW5lcnl8ZW58MHx8fHwxNjg5NjQwNDc1fDA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: 'jyii09cghJE',
    alt: 'brown wooden barrels on brown brick wall',
    url: 'https://images.unsplash.com/photo-1615780324244-29b71ae12f7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzA1ODl8MHwxfHNlYXJjaHw4fHx3aW5lcnl8ZW58MHx8fHwxNjg5NjQwNDc1fDA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: 'MMOXoxE_Gj0',
    alt: 'bread and bread on brown wooden chopping board',
    url: 'https://images.unsplash.com/photo-1598306442928-4d90f32c6866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzA1ODl8MHwxfHNlYXJjaHw5fHx3aW5lcnl8ZW58MHx8fHwxNjg5NjQwNDc1fDA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: 'm87FcHMYtyM',
    alt: 'brown leaves on the ground during sunset',
    url: 'https://images.unsplash.com/photo-1583803804313-cf4b9ecd674b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzA1ODl8MHwxfHNlYXJjaHwxMHx8d2luZXJ5fGVufDB8fHx8MTY4OTY0MDQ3NXww&ixlib=rb-4.0.3&q=80&w=400',
  },
];

function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SubHeading title='wineries' />
        {wineries.map((winery) => (
          <Cellar winery={winery} key={winery.name} />
        ))}
        <WineryGallery images={wineImages} />
      </main>
    </>
  );
}

export default LandingPage;
