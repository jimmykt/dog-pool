import "./PoolCard.scss";
import { Link } from "react-router-dom";
import { DirectionsService } from "@react-google-maps/api";
import Distance from "../Map/Distance";
export default function PoolCard(props) {
  const { dog_name, photo, address, city, first_name, owner_id } = props.dog;
  const userAdress = props.user.user.address + ", " + props.user.user.city;
  const destinationAddress = address + ", " + city;

  return (
    <article className="poolcard">
      <div>
        <p className="poolcard__dog-name">{dog_name}</p>
        <img className="poolcard__photo" src={photo} alt="dog"></img>
      </div>

      <div>
        <div className="poolcard__distance">
          <Distance destination={destinationAddress} origin={userAdress} />
        </div>
        <Link className="poolcard__pool-button" to={"/pool-me/" + owner_id}>
          Pool Me
        </Link>
      </div>
    </article>
  );
}
