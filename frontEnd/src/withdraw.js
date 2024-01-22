import Card from "./card";
import React, { useState } from "react";

const Withdraw = () => {
  let ctx = JSON.parse(localStorage.getItem("users"));
  let saldo_tmp = 0;
  const [id, setId] = useState(0);
  if (!ctx) ctx = [];
  else saldo_tmp = ctx[id].saldo;
  const [saldo_final, setSaldo_final] = useState("Saldo: $ " + saldo_tmp);
  const [status, setStatus] = useState("");
  const [cta, setCta] = useState(ctx[id]);
  const [retiro, setRetiro] = useState(0);

  let nav = document.getElementById("withdraw");
  nav.classList.add("active");
  let nav2 = document.getElementById("home");
  nav2.classList.remove("active");

  const change = (e) => {
    setId(Number(e.target.value));
    const new_cta = ctx[e.target.value];
    setCta(new_cta);
    setSaldo_final("Saldo: $ " + new_cta.saldo);
  };

  const handleCreate = () => {
    if (retiro <= 0) return;
    const saldo = Number(cta.saldo) - Number(retiro);
    let mov = cta.mov?cta.mov:[];
    mov.push({tipo:"Retiro", monto: retiro});
    const new_cta = { ...cta, saldo: saldo, mov };
    setCta(new_cta);
    setSaldo_final("Saldo: $ " + new_cta.saldo);
    ctx[id] = new_cta;
    localStorage.setItem("users", JSON.stringify(ctx));
    setRetiro(0);
  };

  const validate = (field) => {
    if (!cta) setStatus("Cargue primero una cuenta.");
    else if (field === "") setStatus("El retiro debe ser número.");
    else if (Number(field) < 0) setStatus("No se permiten retiros negativos.");
    else if (Number(field) === 0) setStatus("El retiro debe ser mayor a 0.");
    else if (Number(field) > cta.saldo)
      setStatus("El retiro NO puede ser mayor al saldo.");
    else setStatus("");
  };

  return (
    <Card
      header="Selecciona una cuenta para hacer un retiro"
      body={
        <>
          Cuenta
          <br />
          <select className="form-control" onChange={change}>
            {ctx.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <br />
          Retiro
          <br />
          <input
            type="number"
            className="form-control"
            id="retiro"
            value={retiro}
            style={{ textAlign: "right" }}
            onChange={(e) => {
              setRetiro(e.currentTarget.value);
              validate(e.currentTarget.value);
            }}
            onBlur={(e) => {
              validate(e.currentTarget.value);
            }}
          />
          <br />
          <button
            type="submit"
            disabled={!status && retiro > 0 && cta ? false : true}
            className="btn btn-light"
            onClick={handleCreate}
          >
            Retirar
          </button>
        </>
      }
      title={saldo_final}
      status={status}
      color="red"
    />
  );
};

export default Withdraw;
