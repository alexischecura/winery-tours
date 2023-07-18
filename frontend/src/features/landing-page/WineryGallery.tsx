import styles from './WineryGallery.module.css';

type Image = {
  id: string;
  url: string;
  alt: string;
};

type Props = {
  images: Image[];
};

function WineryGallery({ images }: Props) {
  return (
    <section className={styles.sectionGallery}>
      <h3 className={styles.titleGallery}>
        <span>50+</span> Wineries to visit
      </h3>
      <div className={styles.gallery}>
        {images.map((img, id) => (
          <figure
            className={`${styles.galleryItem} ${
              styles[`galleryItem--${id + 1}`]
            }`}
            key={img.id}
          >
            <img src={img.url} alt={img.alt} className={styles.galleryImg} />
          </figure>
        ))}
      </div>
    </section>
  );
}

export default WineryGallery;
