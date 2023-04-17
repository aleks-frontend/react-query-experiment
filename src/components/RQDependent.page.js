import axios from "axios";
import { useQuery } from "react-query";

const fetchUserById = (id) => {
  return axios(`http://localhost:4000/users/${id}`);
};

const fetchCoursesByChanelId = (channelId) => {
  return axios(`http://localhost:4000/channels/${channelId}`);
};

const RQDependentPage = ({ userId }) => {
  const { data: userData, isLoading: userDataIsLoading } = useQuery(
    ["user", userId],
    () => fetchUserById(userId)
  );

  const channelId = userData?.data.channelId;

  const { data: channelData, isLoading: channelDataIsLoading } = useQuery(
    ["channel", channelId],
    () => fetchCoursesByChanelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  if (userDataIsLoading) {
    return <p>User data is loading...</p>;
  }

  if (channelDataIsLoading) {
    return <p>Loading channel data...</p>;
  }

  return (
    <div>
      {channelData &&
        channelData.data.courses.map((course) => (
          <div key={course}>{course}</div>
        ))}
    </div>
  );
};

export default RQDependentPage;
