import { useEffect, useRef, useState } from "react";
import "./App.css";

function AppDos() {
  // TODO HACER EL FETCHING DE LOS DATOS Y MOSTRARLOS EN EL DIV DE DATA PRODUCT
  // ********************************************************************************

  const [product, setProduct] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && hasMore) {
          console.log("entre");
          fetchMoreProducts();
        }
      },
      {
        threshold: 0.5,
      }
    );
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };

    // tengo que  monitorear cuando se cambian los productos o cuando cambia la pagina
  }, [product]);

  const fetchMoreProducts = async () => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=12&skip=${page * 12}`
      );
      const data = await res.json();
      // NO ESTA ENTRANDO A ESTA FUNCION
      if (data.products.length == 0) {
        sethasMore(false);
        console.log(hasMore);
      } else {
        console.log(data.products.length);
        setProduct((prevProduct) => [...prevProduct, ...data.products]);
        setPage((prevPage) => prevPage + 1);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>INFINITE SCROLL</h1>
      <div>
        <div className="mainContainer">
          <div className="container">
            {product.map((item) => (
              <div key={item.id} className="card">
                <div className="imgContainer">
                  <img
                    src={item.images[0]}
                    alt="imagen del producto"
                    className="img"
                  />
                </div>

                <h3>$ {item.price}</h3>
                <p>{item.description}</p>
              </div>
            ))}
            {hasMore && (
              <div ref={ref} className="spincontainer">
                <div className="spin"></div>
              </div>
              // <div ref={ref}>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AppDos;
