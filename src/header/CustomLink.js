import { Link, useMatch, useResolvedPath } from "react-router-dom";

function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <Link className={isActive ? "clicked" : ""} to={to}>
      {children}
    </Link>
  );
}

export default CustomLink;
