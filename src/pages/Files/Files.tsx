import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const Files = () => {
  const { name } = useParams();
  return (
    <>
      <Helmet>
        <title>{`Files - ${name} - NTQ Redmine`}</title>
        <meta name="description" content="Redmine" />
      </Helmet>
      <h2>Files</h2>
    </>
  );
};

export default Files;
