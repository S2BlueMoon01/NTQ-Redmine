import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const CalendarDetail = () => {
  const { name } = useParams();
  return (
    <>
      <Helmet>
        <title>{`Calendar - ${name} - NTQ Redmine`}</title>
        <meta name="description" content="Redmine" />
      </Helmet>
      <h2>Calendar</h2>
    </>
  );
};

export default CalendarDetail;
