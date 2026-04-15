function SummaryCard({ title, value, subText, icon }) {
  return (
    <article className="summary-card">
      <div className="summary-card-top">
        <h3 className="summary-card-title">{title}</h3>
        <div className="summary-card-icon-box">{icon}</div>
      </div>

      <div className="summary-card-body">
        <p className="summary-card-value">{value}</p>
        {subText ? (
          <p className="summary-card-subtext">{subText}</p>
        ) : null}
      </div>
    </article>
  );
}

export default SummaryCard;