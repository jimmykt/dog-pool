import "./PoolCard.scss";

export default function PoolCard({ dog_name, photo }) {
  return (
    <article className="poolcard">
      <div>
        <p className="poolcard__dog-name">{dog_name}</p>
        <img className="poolcard__photo" src={photo} alt="dog"></img>
      </div>

      <div>
        <button className="poolcard__pool-button">Pool Me</button>
      </div>
    </article>
  );
}
