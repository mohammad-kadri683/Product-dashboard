'use client'

import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "./Nav";
import Product from "./Product";

export default function Home() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <header>
        <Nav 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </header>

      <main>
     
          
              <Product searchTerm={searchTerm} />
          
       
      </main>
    </>
  );
}
