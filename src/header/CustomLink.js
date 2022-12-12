import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./CustomLink.css";
function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <Link className={isActive ? "medium clicked" : "medium"} to={to}>
      {children}
    </Link>
  );
}

export default CustomLink;
