import { useContext, useEffect, useState } from "react";
import { AllData } from "../../hooks/Data";
import { useParams } from "react-router-dom";
import Banner from "../../components/details/Banner";
import ProductCard from "../../components/generalCoponents/card/ProductCard";
import DetailTab from "../../components/details/DetailTab";

const Detail = () => {
  const { id } = useParams(); //getting the id from url
  const { getDetails, products, getData } = useContext(AllData);
  const [detailData, setDetailData] = useState([]); //store the single product details
  const [search, setSearch] = useState(""); //store the search query
  const [filteredProducts, setFilteredProducts] = useState([]); //store all the products based on the search query

  //calling getData to get the product initially , to render all the products in the detail page
  useEffect(() => {
    if (!products) {
      getData();
    }
    //function to get the single product detail based on the id
    const fetchData = async () => {
      const data = await getDetails(id);
      setDetailData(data);
    };
    fetchData();
  }, [id]);

  //redering the ProductCard component based on the search query. setting the filtered products if data is available acording to the search query otherwise return [products] as itis
  useEffect(() => {
    if (products && search) {
      const filtered = products.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, search]);

  return (
    <>
      {detailData.length > 0 && (
        <>
          {/* !-------! */}
          <Banner
            title={detailData[0].title}
            rating={detailData[0].rating}
            image={detailData[0].image}
          />

          {/* running search query */}
          <DetailTab setSearch={setSearch} search={search} />

          {/* !-------! */}
          {filteredProducts?.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard
                key={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                id={item.id}
                wholeData={item}
              />
            ))
          ) : (
            <NoItem />
          )}
        </>
      )}
    </>
  );
};

export default Detail;

//component to render if there is not item available while performing a search query.
function NoItem() {
  return (
    <div className="flex flex-col items-center gap-3 p-5 content">
      <img
        src="https://b.zmtcdn.com/data/web_assets/92ee94aa8441af56a34dc5a61547c50a1591338812.png"
        alt=""
        className="max-w-[16rem] max-h-[26rem]"
      />
      <p>No items found that match your search/filter. </p>
    </div>
  );
}
