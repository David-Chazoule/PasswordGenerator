import React, { useEffect, useState } from "react";
import {
  lowerCaseList,
  upperCaseList,
  numberList,
  symbolList,
} from "../CharactereList";
import { ToastContainer, toast } from "react-toastify";
import copied from "../styles/img/copied.png";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwordLength, setPasswordLength] = useState(20);
  const [selectedChoices, setSelectedChoices] = useState([
    "lowercase",
    "uppercase",
    "numbers",
    "symbols",
  ]);

  useEffect(() => {
    generatePassword();
  }, [passwordLength]);

  const handleCheckBox = (type) => {
    let tempChoices = selectedChoices;
    if (tempChoices.includes(type)) {
      const index = tempChoices.indexOf(type);
      tempChoices.splice(index, 1);
    } else {
      tempChoices.push(type);
    }
    setSelectedChoices(tempChoices);
  };

  const generatePassword = () => {
    let characterList = "";

    if (lowerCase) {
      characterList += lowerCaseList;
    }
    if (upperCase) {
      characterList += upperCaseList;
    }
    if (numbers) {
      characterList += numberList;
    }
    if (symbols) {
      characterList += symbolList;
    }

    let tempPassword = "";
    const characterListlength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListlength);
      tempPassword += characterList.charAt(characterIndex);
    }

    setPassword(tempPassword);
  };

  const copyPassword = async () => {
    const copiedText = await navigator.clipboard.readText();
    if (password.length && copiedText !== password) {
      navigator.clipboard.writeText(password);
      toast.success("mot de passe copié !!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "Dark",
      });
    }
  };

  return (
    <div className="generator-container">
      <div className="generator-card">
        <div className="password-box">
          <span id="result">{password}</span>
          <div className="img-box" onClick={copyPassword}>
            <img src={copied} alt="copied-icone" />
          </div>
        </div>

        <div className="settings">
          <h3>Custome ton mot de passe</h3>
          <div>
            <div className="setting">
              <label>inclure lettres majuscules(A-Z)</label>
              <input
                type="checkbox"
                id="lowercase"
                checked={lowerCase}
                disabled={
                  selectedChoices.length === 1 &&
                  selectedChoices.includes("lowercase")
                }
                onChange={() => {
                  setLowerCase(!lowerCase);
                  handleCheckBox("lowercase");
                }}
              />
            </div>
            <div className="setting">
              <label>inclure lettres minuscules (a-z)</label>
              <input
                type="checkbox"
                id="uppercase"
                checked={upperCase}
                disabled={
                  selectedChoices.length === 1 &&
                  selectedChoices.includes("uppercase")
                }
                onChange={() => {
                  setUpperCase(!upperCase);
                  handleCheckBox("uppercase");
                }}
              />
            </div>
          </div>
          <div>
            <div className="setting">
              <label>inclure nombres(0-9)</label>
              <input
                type="checkbox"
                id="number"
                checked={numbers}
                disabled={
                  selectedChoices.length === 1 &&
                  selectedChoices.includes("numbers")
                }
                onChange={() => {
                  setNumbers(!numbers);
                  handleCheckBox("numbers");
                }}
              />
            </div>
            <div className="setting">
              <label>inclure symboles (&-#) </label>
              <input
                type="checkbox"
                id="symbol"
                checked={symbols}
                disabled={
                  selectedChoices.length === 1 &&
                  selectedChoices.includes("symbols")
                }
                onChange={() => {
                  setSymbols(!symbols);
                  handleCheckBox("symbols");
                }}
              />
            </div>
          </div>
          <div className="setting-length">
            <label className="password-length">Longueur du mot de passe</label>
            <div className="length-box">
              <input
                type="range"
                id="length"
                className="input-length"
                defaultValue={passwordLength}
                min={4}
                max={20}
                onChange={(e) => setPasswordLength(e.currentTarget.value)}
              />
              <span>{passwordLength}</span>
            </div>
          </div>
        </div>

        <button className="btn-generate" onClick={generatePassword}>
          Generer un mot de passe
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
