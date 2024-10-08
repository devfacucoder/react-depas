import "./components.css";

function CardDepa({imgUrl,title,precio,location}) {

  return (
    <div className="CardDepa">

      <div className="box_CardDepa">
        <div className="box_img">
          <img
            src={imgUrl[0]? imgUrl[0].url:"https://i.pinimg.com/564x/d7/b6/1c/d7b61c00c68643c2dc0e849a8202c290.jpg"}
            alt=""
          />
        </div>
        <div className="box_info">
          <h3>{title}</h3>
          <p><b>{precio}</b></p>
          <p>{location}, San Juan</p>
        </div>
      </div>
    </div>
  );
}

export default CardDepa;
