import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-center mt-5">
      <Link to={"create"}>
        <button className="btn btn-primary text-white">Create School</button>
      </Link>
    </div>
  );
};

export default Header;
