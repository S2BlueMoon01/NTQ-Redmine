import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const Issues = () => {
  const { name } = useParams();
  return (
    <>
      <Helmet>
        <title>{`Issues - ${name} - NTQ Redmine`}</title>
        <meta name="description" content="Redmine" />
      </Helmet>
      <h2>Issues</h2>
    </>
  );
};

export default Issues;
