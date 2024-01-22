import Card from "./card";
import React, { useState } from "react";

const CreateAccount = () => {
  let ctx = JSON.parse(localStorage.getItem("users"));
  if (!ctx) ctx = [];

  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let nav = document.getElementById("createAccount");
  nav.classList.add("active");
  let nav2 = document.getElementById("home");
  nav2.classList.remove("active");

  const handleCreate = () => {
    if (!validate(name, "nombre")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    let user = {
      id: ctx.length ? ctx.length : 0,
      name: name,
      email: email,
      password: password,
      saldo: 0
    };
    ctx = [...ctx, user];
    console.log(ctx);
    localStorage.setItem("users", JSON.stringify(ctx));


    setStatus("Cuenta creada!");
    setTimeout(() => setStatus(""), 3000);
    setName("");
    setEmail("");
    setPassword("");
  };

  const validate2 = (field, label) => {
    if (!field) {
      setStatus("Falta el campo: " + label);
    } else {
      setStatus("");
      validate(field, label);
    }
  };

  const validate = (field, label) => {
    let isValid = false;
    if (label === "email") {
      isValid = String(field)
        .toLowerCase()
        .match(/\S+@\S+\.\S+/);
      setStatus(isValid ? "" : "El email no es valido");
    }
    if (label === "password") {
      isValid = field.length >= 6;
      setStatus(isValid ? "" : "El password es muy corto");
    }
    if (label === "nombre") {
      isValid = field.length >= 2;
      setStatus(isValid ? "" : "El nombre es muy corto");
    }
    return isValid;
  };

  return (
    <Card
      header="Crea tu cuenta"
      status={status}
      color={status === "Cuenta creada!" ? "green" : "red"}
      body={
        <>
          Nombre
          <br />
          <input
            type="input"
            className="form-control"
            id="name"
            placeholder="Escibe tu nombre"
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
              validate2(e.currentTarget.value, "nombre");
            }}
            onBlur={(e) => {
              validate2(e.currentTarget.value, "nombre");
            }}
          />
          <br />
          Email
          <br />
          <input
            type="input"
            className="form-control"
            id="email"
            placeholder="Escribe tu email"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
              validate2(e.currentTarget.value, "email");
            }}
            onBlur={(e) => {
              validate2(e.currentTarget.value, "email");
            }}
          />
          <br />
          Password
          <br />
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Ecribe tu password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
              validate2(e.currentTarget.value, "password");
            }}
            onBlur={(e) => {
              validate2(e.currentTarget.value, "password");
            }}
          />
          <br />
          <button
            type="submit"
            disabled={name && email && password ? false : true}
            className="btn btn-light"
            onClick={handleCreate}
          >
           Crear cuenta
          </button>
        </>
      }
    />
  );
};

export default CreateAccount;
