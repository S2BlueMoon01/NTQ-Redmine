import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const Settings = () => {
  const { name } = useParams();
  return (
    <>
      <Helmet>
        <title>{`Settings - ${name} - NTQ Redmine`}</title>
        <meta name="description" content="Redmine" />
      </Helmet>
      <h2>Settings</h2>
    </>
  );
};

export default Settings;
