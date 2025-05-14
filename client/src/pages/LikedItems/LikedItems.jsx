import React, { useContext, useEffect, useState } from "react";
import apiClient from "api/apiClient";
import CardVariant from "components/CardVariant/CardVariant";
import { AuthContext } from "context/AuthContext";

import "./LikedItems.scss";

function LikedItems() {
  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { contextData } = useContext(AuthContext);
  useEffect(() => {
    const fetchLikedItems = async () => {
      try {
        const response = await apiClient.get("/v1/items/liked", {
          headers: {
            Authorization: `Bearer ${contextData.token}`,
          },
        });
        setLikedItems(response.data);
      } catch (error) {
        console.error("Error fetching liked items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="liked-items-container">
      <h1>Liked Items</h1>
      {likedItems.length === 0 ? (
        <p>No liked items yet</p>
      ) : (
        <div className="items-grid">
          {likedItems.map((item) => (
            <CardVariant
              key={item.id}
              id={item.id}
              image={item.image}
              serviceName={item.serviceName}
              category={item.category}
              description={item.description}
              likeCount={item.likeCount}
              isLiked={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LikedItems;
