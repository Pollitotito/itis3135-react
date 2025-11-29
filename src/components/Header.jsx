import { NavLink } from "react-router-dom";
export default function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/Introduction">Introduction</NavLink></li>
          <li><NavLink to="/Introductions">Introductions</NavLink></li>
          <li><NavLink to="/Contract">Contract</NavLink></li>
          <li><NavLink to="../">Back</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}