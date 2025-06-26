

const Footer = () => {
    const today= new Date();
  return (
   <footer>
      <p>Coyeright Reserved &copy {today.getFullYear()}</p>
   </footer>
  )
}

export default Footer