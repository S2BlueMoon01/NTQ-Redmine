import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const MemberProject = () => {
  const { name } = useParams();
  return (
    <>
      <Helmet>
        <title>{`MemberProject - ${name} - NTQ Redmine`}</title>
        <meta name="description" content="Redmine" />
      </Helmet>
      <h2>MemberProject</h2>
    </>
  );
};

export default MemberProject;
