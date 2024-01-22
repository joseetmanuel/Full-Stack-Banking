import Card from "./card";
import React from "react";

const AllData = () => {
  let ctx = JSON.parse(localStorage.getItem("users"));
  if (!ctx) ctx = [];

  let nav = document.getElementById("allData");
  nav.classList.add("active");
  let nav2 = document.getElementById("home");
  nav2.classList.remove("active");

  return (
    <div>
      {ctx.map((u) => (
        <Card
          key={u.id}
          header={"Cuenta no. " + (u.id + 1)}
          title={u.name}
          body={
            <div>
              <p>Email: {u.email}</p>
              {u.mov && (
                <div>
                  <p>Movimientos:</p>
                  <ul className="list-group">
                    {u.mov.map((m) => (
                      <li key={m.id} className="list-group-item d-flex">
                        {m.tipo} : $ {m.monto}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          }
          status={"Saldo: $ " + u.saldo}
          color="green"
        />
      ))}
    </div>
  );
};

export default AllData;
