import { useEffect, useState } from "react";
import { Card, Statistic, Row, Col } from "antd";
import { fetchData } from "../../fetch"; // Assuming fetchData is a function to fetch data from the API
// import { Line } from "react-chartjs-2";
const Overview: React.FC = () => {
  const [blogCount, setBlogCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(30);
  const [visitCount, setVisitCount] = useState(30);

  useEffect(() => {
    const fetchOverviewData = async () => {
      const { data } = await fetchData<any, any>("/overview"); // Adjust the endpoint as necessary
      if (data) {
        setBlogCount(data.blogCount);
        setCommentCount(data.commentCount);
        setMessageCount(data.messageCount);
        setCategoryCount(data.categoryCount);
        setVisitorCount(data.visitorCount);
        setVisitCount(data.visitCount);
      }
    };
    fetchOverviewData();
  }, []);

  return (
    <div className="overview-container">
      <h1>系统概览</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="博客总数" value={blogCount} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="博客评论数" value={commentCount} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="留言总数" value={messageCount} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="博客分类" value={categoryCount} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="网站访问量" value={visitCount} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="访客数" value={visitorCount} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card title="访客数与访问量曲线图"></Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
