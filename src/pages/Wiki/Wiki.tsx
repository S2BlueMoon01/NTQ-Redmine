import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const Wiki = () => {
  const { name } = useParams();
  return (
    <>
      <Helmet>
        <title>{`Wiki - ${name} - NTQ Redmine`}</title>
        <meta name="description" content="Redmine" />
      </Helmet>
      <h2>Wiki</h2>
    </>
  );
};

export default Wiki;
