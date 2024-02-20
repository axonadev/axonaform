import React, { useState, useRef } from "react";
import classes from "../style/Login.module.css";
import { normalizeToken } from "axonalib";
import { Button, Card } from "axonaui";

/**
 * Insert text at cursor position.
 *
 * @param {string} logo
 * @param {string} urlApi
 * @param {string} piva
 * @public
 */

const Login = ({ logo, onSubmit, urlApi, piva }) => {
  const pivaInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function submitHandler(event) {
    event.preventDefault();

    const enteredPiva = piva ? piva : pivaInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    setIsError(false);

    //fetch login
 
    await fetch(
      urlApi ,
       { method: "post",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        
        //make sure to serialize your JSON body
        body: JSON.stringify({
          azienda:  (enteredPiva === "" ? "A" : enteredPiva),
          user:enteredEmail,
        password: enteredPassword
        })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.Errore.length > 0) {
          console.log(data.Errore);
          setIsError(data.Errore);
          localStorage.removeItem("axn_token");
          localStorage.removeItem("axn_piva");
          localStorage.removeItem("axn_exptime");
          localStorage.removeItem("axn_v_moduli");
        } else {
          const normT = normalizeToken(data.Token);
          const moduli = data.Itemset.v_moduli;
          const expirationTime = new Date(new Date().getTime() + 14400 * 1000);
          localStorage.setItem("axn_token", normT);
          localStorage.setItem("axn_piva", enteredPiva);
          localStorage.setItem("axn_exptime", expirationTime);
          localStorage.setItem("axn_v_moduli", JSON.stringify(moduli));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
    onSubmit();
  }

  return (
    <React.Fragment>
      <Card>
        <img src={logo} alt="" className={classes.authlogo}></img>
        <form onSubmit={submitHandler}>
          {!piva && (
            <div className={classes.control}>
              <label htmlFor="piva">Piva</label>
              <input type="text" id="piva" ref={pivaInputRef} />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <Button
                onClick={() => {
                  document.getElementById("btnsubmit").click();
                }}
              >
                {isLogin ? "Login" : "Create Account"}
              </Button>
            )}
            {isLoading && <p>Sending request...</p>}
            {isError && <p>{isError}</p>}
            {isNewUser && (
              <Button type="button" onClick={switchAuthModeHandler}>
                {isLogin ? "Create new account" : "Login with existing account"}
              </Button>
            )}
          </div>
          <button id="btnsubmit" type="submit" className={classes.hidden}>
            go
          </button>
        </form>
      </Card>
    </React.Fragment>
  );
};
export default Login;
