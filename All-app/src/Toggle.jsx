import { useEffect, useState } from "react";

function Toggle() {
  // Theme toggle
  const [on, setOn] = useState(false);
  const [themeText, setThemeText] = useState("");

  // Text input
  const [inputValue, setInputValue] = useState("");

  // Password toggle
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  // API data
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(true);

  // API call
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((result) => {
        setIp(result.ip);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Theme handlers
  function toggleOn() {
    setOn(true);
    setThemeText("You are now in Dark Mode");
  }

  function toggleOff() {
    setOn(false);
    setThemeText("You are now in Light Mode");
  }

  // Input handlers
  function handleTextChange(e) {
    setInputValue(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function togglePassword() {
    setShow((prev) => !prev);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: on ? "black" : "white",
        color: on ? "white" : "black",
      }}
    >
      {/* Theme Toggle */}
      <button onClick={on ? toggleOff : toggleOn}>
        {on ? "Switch to Light" : "Switch to Dark"}
      </button>

      <h2>{themeText}</h2>

      <hr />

      {/* Text Input */}
      <input
        type="text"
        placeholder="Enter your text"
        value={inputValue}
        onChange={handleTextChange}
      />
      <h3>{inputValue}</h3>

      <hr />

      {/* Password Toggle */}
      <input
        type={show ? "text" : "password"}
        placeholder="Enter password"
        value={password}
        onChange={handlePasswordChange}
      />
      <br />
      <button onClick={togglePassword}>
        {show ? "Hide Password" : "Show Password"}
      </button>

      <hr />

      {/* API Data */}
      <h3>Your IP Address:</h3>
      <p>{ip}</p>
    </div>
  );
}

export default Toggle;
