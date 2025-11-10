import { NavLink } from "react-router-dom";
export default function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/introduction">Introduction</NavLink></li>
          <li><NavLink to="/contract">Contract</NavLink></li>
          <li><NavLink to="../">Back</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}