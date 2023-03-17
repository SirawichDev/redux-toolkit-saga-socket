import { Skeleton } from "antd";
import { FC } from "react";

type SkeletonProps = {
  loading: boolean;
  row: number;
  children: React.ReactNode;
};
const SkeletonList: FC<SkeletonProps> = ({ children, loading, row }) => {
  return (
    <>
      <Skeleton
        loading={loading}
        active
        paragraph={{ rows: row }}
        className="page-skeleton"
      >
        {children}
      </Skeleton>
    </>
  );
};

export default SkeletonList;
