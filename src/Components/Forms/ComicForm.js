import { React, useState } from "react";
import { Form, Input, Button, Row, Col, Card, Typography } from "antd";
import DOMPurify from "dompurify";
import { generateComicStrip } from "../Utils/Request";
import { useNavigate } from "react-router-dom";

const ComicForm = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    const sanitizedValues = Object.keys(values).map((key) =>
      DOMPurify.sanitize(values[key])
    );
    console.log("Received values of form:", sanitizedValues);
    setIsLoading(true);
    generateComicStrip(sanitizedValues)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        navigate("/final", { state: { length: response } });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error in generateComicStrip:", error);
      });
  };

  const panelInputs = [];
  for (let i = 1; i <= 10; i++) {
    panelInputs.push(
      <Form.Item
        key={`panel${i}`}
        name={`panel${i}`}
        label={`Panel ${i}`}
        rules={[
          { required: true, message: `Please input text for panel ${i}` },
        ]}
      >
        <Input.TextArea rows={3} placeholder={`Text for panel ${i}`} />
      </Form.Item>
    );
  }

  const formStyle = {
    fontFamily: "Roboto, sans-serif",
    padding: "20px",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
  };

  const descriptionStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "grey",
  };

  return (
    <Row
      justify="center"
      style={{ marginTop: "20px", fontFamily: "Roboto, sans-serif" }}
    >
      <Col xs={24} md={18} lg={12}>
        <Card style={formStyle}>
          <Typography.Title level={2} style={headingStyle}>
            Create Your Comic
          </Typography.Title>
          <Typography.Paragraph style={descriptionStyle}>
            Fill out the text for each panel to generate your comic strip
          </Typography.Paragraph>
          {isLoading ? (
            <div
              style={{
                fontSize: "50px",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(255, 255, 255, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>Loading... It can take upto few minutes!</span>
            </div>
          ) : (
            <Form
              form={form}
              name="comic_creator_form"
              onFinish={onFinish}
              layout="vertical"
              autoComplete="off"
            >
              {panelInputs}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Generate Comic
                </Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ComicForm;
