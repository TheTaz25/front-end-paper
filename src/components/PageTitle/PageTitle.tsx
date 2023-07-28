import { Divider, Title } from "@mantine/core";

const PageTitle: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div className="top">
      <Title order={1}>{children}</Title>
      <Divider mb={32} mt={8} />
    </div>
  );
};

export default PageTitle;
