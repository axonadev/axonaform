import React, { useState, useRef } from "react";
import classes from "../style/Login.module.css";
import { normalizeToken } from "axonalib";
import { Button, Card } from "axonaui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";

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

  // ERRORI PER VALIDAZIONE INPUT
  const [inputsErrors, setInputsErrors] = useState({
    erroreMail: "",
    errorePassword: "",
    errorePiva: "",
  });

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function submitHandler(event) {
    event.preventDefault();

    // PULISCE ERRORI
    setInputsErrors({});
    // INPUT
    const enteredPiva = piva ? piva : pivaInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // COSTANTI VALIDAZIONE
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    // VALIDAZIONE EMAIL
    if (enteredEmail.trim() === "") {
      setInputsErrors((prev) => ({
        ...prev,
        erroreMail: "Il campo mail è obbligatorio!",
      }));
    } else if (!emailRegex.test(enteredEmail)) {
      isValid = false;
      setInputsErrors((prev) => ({
        ...prev,
        erroreMail: "Mail non corretta.",
      }));
    }

    // VALIDAZIONE PASSWORD
    if (enteredPassword.length < 8) {
      isValid = false;
      setInputsErrors((prev) => ({
        ...prev,
        errorePassword: "La password deve contenere almeno 8 caratteri!",
      }));
    }

    setIsLoading(true);
    setIsError(false);

    // FETCH LOGIN
    await fetch(urlApi, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        azienda: enteredPiva === "" ? "A" : enteredPiva,
        user: enteredEmail,
        password: enteredPassword,
      }),
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
      <div className={classes.loginContainer}>
        <div className={classes.cardContainer}>
          <Card>
            <img src={logo} alt='' className={classes.authlogo} />
            <form onSubmit={submitHandler}>
              {/* PIVA */}
              {!piva && (
                <div
                  className={
                    inputsErrors.errorePiva ? classes.error : classes.control
                  }
                >
                  <FontAwesomeIcon icon={faBuilding} className={classes.icon} />
                  <input
                    type='text'
                    id='piva'
                    ref={pivaInputRef}
                    placeholder='Partita IVA'
                  />
                </div>
              )}

              {/* EMAIL */}
              <div
                className={
                  inputsErrors.erroreMail ? classes.error : classes.control
                }
              >
                <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
                <input
                  type='email'
                  id='email'
                  required
                  ref={emailInputRef}
                  placeholder='Email'
                />
              </div>

              {/* PASSWORD */}
              <div
                className={
                  inputsErrors.errorePassword ? classes.error : classes.control
                }
              >
                <FontAwesomeIcon icon={faLock} className={classes.icon} />
                <input
                  type='password'
                  id='password'
                  required
                  ref={passwordInputRef}
                  placeholder='Password'
                />
              </div>

              {/* BOTTONI */}
              {/* <div className={classes.actions}>
                {!isLoading && (
                  <Button
                    onClick={() => {
                      document.getElementById("btnsubmit").click();
                    }}
                  >
                    {isLogin ? "Login" : "Crea Account"}
                  </Button>
                )}
                {isLoading && <p>Sending request...</p>}
                {isError && <p>{isError}</p>}
                {isNewUser && (
                  <Button onClick={switchAuthModeHandler}>
                    {isLogin ? "Crea Account" : "Login"}
                  </Button>
                )}
              </div> */}

              {inputsErrors.errorePassword && (
                <p>{inputsErrors.errorePassword}</p>
              )}
              {inputsErrors.erroreMail && (
                <p className={classes.error_message}>
                  {inputsErrors.erroreMail}
                </p>
              )}
              {inputsErrors.errorePiva && <p>{inputsErrors.errorePiva}</p>}

              <Button type='submit'>Login</Button>
            </form>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
