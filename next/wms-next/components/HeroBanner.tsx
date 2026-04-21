type Props = {
  title: string;
};

export default function HeroBanner({ title }: Props) {
  return (
    <section className="hero-banner">
      <h2 className="hero-title">{title}</h2>
      <button type="button" className="hero-button">
        Create New Project
      </button>
    </section>
  );
}