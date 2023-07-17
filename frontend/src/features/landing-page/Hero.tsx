import styles from './Hero.module.css';
import heroImg1 from '../../assets/img-hero-1.jpg';
import heroImg2 from '../../assets/img-hero-2.jpg';

function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={`${styles.hero}`}>
        <div className={styles.heroTextBox}>
          <h1 className='heading-primary'>
            Explore Mendoza's Spectacular Wineries and Vineyards
          </h1>
          <p className={styles.heroDescription}>
            Experience the charm of Mendoza's exquisite wineries and vineyards.
            Immerse yourself in the art of winemaking amidst breathtaking
            landscapes. Unforgettable tours await.
          </p>
          <a className={styles.heroBtn} href=''>
            Explore all tours
          </a>
          <a className={styles.heroBtn} href=''>
            Sign Up
          </a>
        </div>
        <div className={styles.heroImages}>
          <img
            src={heroImg1}
            alt='brown wooden fence near snow-covered mountain during the daytime'
            className={styles.heroImg1}
          />

          <img
            src={heroImg2}
            alt='brown wooden wine racks'
            className={styles.heroImg2}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
