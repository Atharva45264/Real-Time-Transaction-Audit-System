const Card = ({ title, children }) => {
  return (
    <div className="card fade-in">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Card;
