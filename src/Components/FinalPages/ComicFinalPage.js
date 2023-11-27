import React from "react";
import { Row, Col, Card, Button } from "antd";
import { CopyFilled } from "@ant-design/icons";
import copyScreenshotToClipboard from "../Utils/Screenshot";

const FinalPage = () => {
  const imageCount = 10;
  const images = [];

  for (let i = 0; i < imageCount; i++) {
    const imageData = sessionStorage.getItem(`comicStripImage${i}`);
    if (imageData) {
      images.push(imageData);
    } else {
      images.push(null);
    }
  }

  const handleCaptureScreenshot = () => {
    copyScreenshotToClipboard("grid");
  };

  const gridStyle = {
    maxWidth: "1400px",
    margin: "auto",
    marginTop: "20px",
    marginLeft: "100px",
    backgroundColor: "white",
  };

  const cardStyle = {
    width: "250px",
    height: "250px",
    marginBottom: "20px",
    marginTop: "20px",
    marginLeft: "15px",
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <Button type="primary" onClick={handleCaptureScreenshot}>
        <CopyFilled />
      </Button>

      <Row className="grid" gutter={10} style={gridStyle}>
        {images.map((image, index) => (
          <Col key={index} span={4.5}>
            <Card
              hoverable
              style={cardStyle}
              cover={
                <img
                  alt={`Error is Diplaying the Comic Panel: ${index + 1}`}
                  src={image}
                  style={{ width: "100%", height: "100%" }}
                />
              }
            ></Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FinalPage;
