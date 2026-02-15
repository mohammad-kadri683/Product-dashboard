'use client'
import { CiHeart } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Searchbar from "./Searchbar";
import { CiSearch } from "react-icons/ci";
import { Container, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

interface NavProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Nav: React.FC<NavProps> = ({ searchTerm, setSearchTerm }) => {

  return (
    <div className="nav ps-5 pe-5 d-flex align-items-center justify-content-between">

      <h5 style={{ color: "#fff" }}>Product Dashboard</h5>

      <Searchbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="d-flex align-items-center gap-3">
        <button className="customB">
          <CiHeart style={{ fontSize: "30px", color: "white" }} />
        </button>
        <button className="customB">
          <AiOutlineShoppingCart style={{ fontSize: "30px", color: "white" }} />
        </button>
        <div className="img_profile">
          <img src="/image/Photo.png" alt="profile user" />
        </div>
      </div>

    </div>
  );
};

export default Nav;
