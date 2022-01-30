import "./PoolCard.scss";
import { Link } from "react-router-dom";

export default function PoolCard({ dog_name, photo, owner_id }) {
  return (
    <article className="poolcard">
      <div>
        <p className="poolcard__dog-name">{dog_name}</p>
        <img className="poolcard__photo" src={photo} alt="dog"></img>
      </div>

      <div>
        <Link className="poolcard__pool-button" to={"/pool-me/" + owner_id}>
          Pool Me
        </Link>
      </div>
    </article>
  );
}
