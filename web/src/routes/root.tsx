import { Outlet, Link } from "react-router-dom";


export default function Root() {
  return (
    <>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}