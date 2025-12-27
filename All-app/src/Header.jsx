import { useState } from "react";



// // 1. Counter App

// Task

// Create a counter

// Buttons: Increment, Decrement, Reset

// Concepts

// useState

// Updating state with previous value

export default function Header(){
   
    const [count, setCount] = useState(0);

    function  incrmenthandleClick(){
       setCount((prev) => prev + 1)
       console.log(count)
    }
   
     
    function decrementhandleclick(){
        setCount((prev) => prev - 1)
        console.log(count)
    }

   


  return (
    <>
      <button onClick={incrmenthandleClick}>Increment</button>
      <button onClick={decrementhandleclick}>Decrement</button>
    </>

  )

}