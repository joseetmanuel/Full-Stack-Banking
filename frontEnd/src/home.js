import Card from "./card";

const Home = () => {
  let nav = document.getElementById("home")
  nav.classList.add('active');

  return (
    <Card
      header="Banco Nacional de la Nacion"
      title="Bad Bank ;)"
      text="Bienvenidos al Banco"
      body={
        <img
          src={require("./img/bank.jpg")}
          className="img-fluid"
          alt="Responsive image"
        />
      }
    />
  );
};

export default Home;
