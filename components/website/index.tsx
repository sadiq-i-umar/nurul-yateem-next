import "./style.css";

export const HeroSection = () => {
  return (
    <div className="container">
      <h2 className="subtitle">EMPOWERING ORPHANS FOR A BRIGHT FUTURE.</h2>
      <h1 className="title">
        Turning Compassion into Opportunities for Orphaned Children
      </h1>
      <div className="image-container">
        <img src="image.jpg" alt="Orphaned Children" />
      </div>
      <a href="#" className="btn">
        Sponsor A Child Today
      </a>
    </div>
  );
};
