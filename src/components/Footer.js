import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Footer = () => {

  const location = useLocation();

  return (
    <footer>
        <p>Copyright &copy; 2023</p>
        <Link to="/about">About</Link>
        <p>
          {
            location.pathname === "/completedTasks" ?  <Link to="/">Home</Link> :  <Link to="/completedTasks">Completed Tasks</Link>
          }
         
        </p>
    </footer>
  )
}

export default Footer
