import { useState } from "react";
function Content() {
  const [name, setName] = useState('');

  const handleShow = () => {
    const names = ['Bob', 'Ram', 'Dave'];
    const id = Math.floor(Math.random() * names.length);
    setName(names[id]);
  };

  const handleClick = () => {
    console.log('Button clicked');
  };

  const handleClick2 = () => {
    handleShow();
    console.log(`${name} was clicked`);
  };

  return (
    <>
      <div className="input-container">
                           NAME
        <input type='text' placeholder='Enter your Name' value={name} onChange={(e) => setName(e.target.value)} />
        <br/>
                           EMAIL
        <input type='email' placeholder='Enter your Email' />
        <br/>
                        PASSWORD
        <input type='password' placeholder='Enter your Password' />
      </div>
      <main>
        <p> Hello {name}</p>
        <button className="show-button" onClick={handleShow}>Show</button>
      </main>
      <div>
        <br/>
        <button onClick={handleClick}>Console</button><br/>
        <button onClick={handleClick2}>Display</button>
      </div>
    </>
  );
}

export default Content