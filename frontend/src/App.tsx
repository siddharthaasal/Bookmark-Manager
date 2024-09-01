import  { useEffect, useState } from "react";
// import "./styles/App.css";
import Header from "./components/Header";
import CategoryList from "./components/CategoryList";
import BookmarkList from "./components/BookmarkList";
import axios from "axios";

const App = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchInitialCategory = async () => {
      const response = await axios.get("http://loclhost:8081/categories");
      if (response.data.length > 0) {
        setSelectedCategoryId(response.data[0].id);
      } else {
        console.log("No category to be fetched");
      }
    };
    fetchInitialCategory();
  }, []);

  return (
    <>
      <Header />
      <>
        <CategoryList
          onSelectCategory={setSelectedCategoryId}
          selectedCategory={selectedCategoryId}
        />
        {selectedCategoryId !== null && (
          <BookmarkList categoryId={selectedCategoryId} />
        )}{" "}
      </>
    </>
  );
};

export default App;
