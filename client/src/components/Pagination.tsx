import { Pagination } from "antd";

interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  current,
  total,
  pageSize,
  onChange,
}) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
      />
    </div>
  );
};

export default PaginationComponent;
