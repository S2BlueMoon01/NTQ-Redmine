import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const IssuesCreate = () => {
  const { name } = useParams();
  return (
    <>
      <Helmet>
        <title>{`New Issue - ${name} - NTQ Redmine`}</title>
        <meta name="description" content="Redmine" />
      </Helmet>
      <h2>New Issue</h2>
    </>
  );
};

export default IssuesCreate;
