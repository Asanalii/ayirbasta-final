import React, { useContext, useState, useEffect } from "react";
import apiClient from "api/apiClient";
import { AuthContext } from "context/AuthContext";
import debounce from "lodash/debounce";
import icon_search from "../../assets/img/lupa.svg";
import icon_document from "../../assets/img/document.svg";
import CardVariant from "components/CardVariant/CardVariant";
import Pagination from "components/Pagination";
import { PaginationStyled } from "./ProductsAndService.styled";

const ProductsAndService = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchItems = async (params = {}) => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: 5,
        sort: sortBy,
        order: sortOrder,
        search: searchTerm,
        category: selectedCategory,
        ...params,
      });

      const response = await apiClient.get(`/v1/items?${queryParams}`);
      setItems(response.data.items);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //  useEffect to read all URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get("category") || "";
    const urlSearch = params.get("search") || "";
    const urlPage = parseInt(params.get("page")) || 1;
    const urlSortBy = params.get("sortBy") || "name";
    const urlSortOrder = params.get("sortOrder") || "desc";

    setSelectedCategory(urlCategory);
    setSearchTerm(urlSearch);
    setSortBy(urlSortBy);
    setSortOrder(urlSortOrder);
    setPagination((prev) => ({ ...prev, page: urlPage }));

    fetchItems({
      category: urlCategory,
      search: urlSearch,
      page: urlPage,
      sort: urlSortBy,
      order: urlSortOrder,
    });
  }, []);

  // Modify sort handlers
  const handleSortByChange = (newSortBy) => {
    setSortBy(newSortBy);
    updateURL({ sortBy: newSortBy });
    fetchItems({ sort: newSortBy });
  };

  const handleSortOrderChange = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    updateURL({ sortOrder: newOrder });
    fetchItems({ order: newOrder });
  };

  // Update URL helper function
  const updateURL = (params) => {
    const searchParams = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });

    const newURL = `${window.location.pathname}${
      searchParams.toString() ? "?" + searchParams.toString() : ""
    }`;
    window.history.pushState({}, "", newURL);
  };

  // Modify category change handler
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPagination((prev) => ({ ...prev, page: 1 }));
    updateURL({ category, page: 1 });
    fetchItems({ category, page: 1 });
  };

  // Modify debounced search
  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
    setPagination((prev) => ({ ...prev, page: 1 }));
    updateURL({ search: term, page: 1 });
    fetchItems({ page: 1, search: term });
  }, 500);

  // Modify page change handler
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    updateURL({ page: newPage });
    fetchItems({ page: newPage });
  };

  useEffect(() => {
    fetchItems();
  }, [sortBy, sortOrder, selectedCategory]);

  return (
    !isLoading && (
      <div className="products-and-service">
        <div className="products-and-service-filter-container">
          {/* Search Input */}
          <div className="products-and-service-search-bar">
            <img src={icon_search} alt="icon_search" />
            <input
              type="text"
              placeholder="Search something here"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="products-and-service-selecting-button">
            <img src={icon_document} alt="icon_document" />
            <select
              onChange={(e) => handleCategoryChange(e.target.value)}
              value={selectedCategory}
            >
              <option value="All">All Categories</option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Electronic">Electronic</option>
              <option value="Sports">Sports</option>
              <option value="Furniture">Furniture</option>
              <option value="Fashion">Fashion</option>
              <option value="Gaming">Gaming</option>
              <option value="Music">Music</option>
              <option value="Others">Others</option>

              {/* Add other categories */}
            </select>
          </div>

          {/* Sort Options */}
          <div className="products-and-service-selecting-button">
            <select
              onChange={(e) => handleSortByChange(e.target.value)}
              value={sortBy}
            >
              <option value="createdAt">Date</option>
              <option value="name">Name</option>
            </select>
            <button
              onClick={handleSortOrderChange}
              style={{
                position: "absolute",
                left: "10px",
                top: "10px",
                width: "25px",
                height: "25px",
                backgroundColor: "transparent",
              }}
            >
              {sortOrder === "asc" ? (
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "rotate(90deg)" }}
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    fill="white"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    stroke="#909090"
                  />
                  <path
                    d="M18.6663 27L11.9996 20M11.9996 20L18.6663 13M11.9996 20L27.9996 20"
                    stroke="#909090"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "rotate(270deg)" }}
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    fill="white"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    stroke="#909090"
                  />
                  <path
                    d="M18.6663 27L11.9996 20M11.9996 20L18.6663 13M11.9996 20L27.9996 20"
                    stroke="#909090"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="products-and-service-cards-variants-container">
          {items.map((item) => (
            <CardVariant
              key={item.id}
              image={item.image}
              serviceName={item.name}
              category={item.category}
              description={item.description}
              id={item.id}
              isRecommended={item.isRecommended}
              likeCount={item.likeCount}
            />
          ))}
        </div>

        {/* Pagination */}
        <PaginationStyled>
          <div className="pagination">
            <button
              disabled={pagination.page === 1}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              Previous
            </button>

            {[...Array(pagination.pages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={pagination.page === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={pagination.page === pagination.pages}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              Next
            </button>
          </div>
        </PaginationStyled>
      </div>
    )
  );
};

export default ProductsAndService;
