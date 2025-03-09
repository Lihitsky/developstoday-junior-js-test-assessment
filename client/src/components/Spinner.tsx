import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Flex } from "antd";

interface SpinnerProps {
  size?: "small" | "default" | "large";
  fontSize?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = "default", fontSize }) => {
  const indicator = fontSize ? (
    <Flex align="center" justify="center" gap="middle">
      <LoadingOutlined style={{ fontSize }} spin />
    </Flex>
  ) : (
    <Flex align="center" justify="center" gap="middle">
      <LoadingOutlined spin />
    </Flex>
  );

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Spin indicator={indicator} size={size} />
    </Flex>
  );
};

export default Spinner;
