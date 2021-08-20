import React, { useEffect, useState } from "react";
// import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";
import { continents, price } from "./Sections/Data";

import "./LandingPage.css";

// import bannerImg from "../../../../public/imgSrc/nft-banner-image1.png";
import bannerImg from "./imgSrc/nft-banner-image1.png";

function LandingPage() {
  // DB에 있는 data의 개수만큼 Card를 생성해야 하므로 useState를 사용한다
  // Skip: 어디서부터 데이터를 가져오는지에 대한 위치
  // Limit: 처음 데이터를 가져올 때와 더보기 버튼을 눌러서 가져올 때 얼마나 가져오는지에 대한 값
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    // console.log("LP", body.skip, body.limit);
    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패했습니다.");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);

    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    // console.log("product", product);

    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResuls = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };

    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    // filters는 checkbox 컴포넌트에서 check된 것들의 id가 담겨져 있는 array를 포함한다
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    console.log("filters", filters);

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    showFilteredResuls(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  return (
    <div className="root" style={{ width: "75%", margin: "3rem auto" }}>
      <div className="banner" style={{ height: "380px" }}>
        <div className="banner-container">
          <div className="banner-col1-title" style={{}}>
            <h1 className="banner-title-header">
              Discover, collect, and sell extraordinary NFTs
            </h1>
            <h3 className="banner-title-subheader" style={{}}>
              on the world's first &#38; largest NFT marketplace
            </h3>
          </div>

          <div className="banner-col2-image">
            <img className="banner-image" alt="nft-image" src={bannerImg} />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="filter" style={{ justifyContent: "center" }}>
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <CheckBox
              list={continents}
              handleFilters={(filters) => handleFilters(filters, "continents")}
            />
          </Col>
          <Col lg={12} xs={24}>
            <RadioBox
              list={price}
              handleFilters={(filters) => handleFilters(filters, "price")}
            ></RadioBox>
          </Col>
        </Row>
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>

      {/* Cards */}

      <Row gutter={[16, 16]}>{renderCards}</Row>

      <br />
      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
