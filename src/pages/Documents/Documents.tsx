import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const Documents = () => {
  const { name } = useParams();
  return (
    <>
      <Helmet>
        <title>{`Documents - ${name} - NTQ Redmine`}</title>
        <meta name="description" content="Redmine" />
      </Helmet>
      <h2>Documents</h2>
    </>
  );
};

export default Documents;
