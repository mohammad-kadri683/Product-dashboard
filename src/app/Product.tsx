'use client'

import { useEffect, useState,useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthServices from "./AuthServices";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface ProductProps {
  searchTerm: string;
}

interface ProductType {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  rating: number;
}


const Product: React.FC<ProductProps> = ({ searchTerm }) => {
  const topRef = useRef<HTMLDivElement | null>(null);
  const all = 'All Products ';
  const itemsPerPage = 12;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setloading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [order, setorder] = useState<string>("desc");
  const [slug, setslug] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [Cat, setCat] = useState<any[]>([]);

  
const ProductsMain = (page: number = 1) => {
  setloading(true);

  AuthServices.GetProduct(searchTerm, order, page, itemsPerPage)
    .then((data) => {
      setProducts(data.products || []);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
      setCurrentPage(page);
    })
    .catch((err) => setError(err.message))
    .finally(() => setloading(false));
};


  const GetCat = () => {
    AuthServices.GetCategory()
      .then((data) => setCat(data))
      .catch((err) => setError(err.message));
  };

 
  const loadProductsByCats = () => {
    setloading(true);
    AuthServices.GetByCAt(slug)
      .then((data) => {
        const allProducts = data.products || [];
        setProducts(allProducts);
        setTotalPages(Math.ceil(allProducts.length / itemsPerPage)); 
        setCurrentPage(1);
      })
      .catch((err) => setError(err.message))
      .finally(() => setloading(false));
  };

  useEffect(() => {
    if (slug) {
      loadProductsByCats();
    } else {
        ProductsMain(1);
    }
  }, [searchTerm, order, slug]);

  useEffect(() => {
    GetCat();
  }, []);

  
const goToPage = (page: number) => {
  if (page < 1 || page > totalPages) return;
  ProductsMain(page);
    topRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  })
};




  
  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisible + 1, 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <Container>
      <Row>
        <div ref={topRef}></div>


        <Col lg={12}>
          <div className="select w-50 mt-4">
            <select
              className='form-select w-50'
              name="orderProducts"
              id="orderProducts"
              value={order}
              onChange={(e) => setorder(e.target.value)}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </Col>

        <Col lg={2} className="mt-4">
          <div>
            <input
              type="radio"
              name="category"
              id="radio-all"
              className="d-none"
              value={all}
              checked={slug === ""}
              onChange={() => setslug("")}
            />
            <label htmlFor="radio-all" className={`CatCustom ${slug === "" ? "activeCat" : ""}`}>
              {all}
            </label>
          </div>

          {Cat.map((item, index) => (
            <div className="category d-flex align-items-center" key={index}>
              <input
                id={"radio-" + index}
                type="radio"
                className="d-none"
                name="category"
                value={item.slug}
                checked={slug === item.slug}
                onChange={(e) => setslug(e.target.value)}
              />
              <label htmlFor={"radio-" + index} className={`CatCustom mt-1 ${slug === item.slug ? "activeCat" : ""}`}>
                {item.name}
              </label>
            </div>
          ))}
        </Col>

        <Col lg={10}>
          <Row className="g-4 mb-5">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
                <div className="spinner-border " style={{ color: "#3f4e72" }} role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : searchTerm && products.length === 0 ? (
              <div className="text-center mt-5">
                <h4 className="mt-5" style={{ color: "#3f4e72" }}>
                  No items match {searchTerm}
                </h4>
              </div>
            ) : (
              products.map((item) => {
                const discountedPrice = (item.price * (1 - item.discountPercentage / 100)).toFixed(2);
                return (
                  <Col lg={3} key={item.id}>
                    <div className="card cardd mt-4 h-100 d-flex flex-column">
                      <div className="imgca">
                        <img src={item.thumbnail} alt={item.title} />
                      </div>

                      <strong className="mt-1">{item.title}</strong>

                      <div className="d-flex justify-content-between mt-auto">
                        <span style={{ color: "red" }}>${item.price}</span>
                        <span style={{ color: "green" }}>${discountedPrice}</span>
                      </div>
                      <div className="mt-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                          if (item.rating >= star) return <FaStar key={star} color="#ffc107" />;
                          else if (item.rating >= star - 0.5) return <FaStarHalfAlt key={star} color="#ffc107" />;
                          else return <FaRegStar key={star} color="#ffc107" />;
                        })}
                      </div>
                    </div>
                  </Col>
                );
              })
            )}
          </Row>


          <div className="d-flex justify-content-center align-items-center gap-2 mb-5">
            <button className="btn btn-light" disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>← Previous</button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                className={`btn ${currentPage === page ? "CustomBtn" : "Basic"}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}

            <button className="btn btn-light" disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}>Next →</button>
          </div>

        </Col>
      </Row>
    </Container>
  );
};

export default Product;
