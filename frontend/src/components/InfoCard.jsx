const InfoCard = ({ icon, title, description }) => {
  return (
    <div className="info-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default InfoCard;
