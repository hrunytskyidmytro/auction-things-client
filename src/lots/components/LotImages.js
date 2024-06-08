import React from "react";
import { Paper } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Fancybox from "../components/FancyBox";

const LotImages = ({ images }) => {
  return (
    <Paper elevation={5} sx={{ mb: 1, borderRadius: 4 }}>
      {images && images.length > 0 && (
        <Fancybox>
          <Carousel showStatus={false} autoPlay interval={3000} infiniteLoop>
            {images.map((image, index) => (
              <div
                key={image}
                data-fancybox="gallery"
                data-src={`http://localhost:5001/${image}`}
                data-thumb-src={`http://localhost:5001/${image}`}
                data-caption={`Фото ${index + 1}`}
              >
                <img
                  src={`http://localhost:5001/${image}`}
                  alt={`Фото ${index + 1}`}
                  style={{
                    width: "100%",
                    maxHeight: "500px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </div>
            ))}
          </Carousel>
        </Fancybox>
      )}
    </Paper>
  );
};

export default LotImages;
