import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { Col, Image, Row, Typography } from "antd";
import { GlobalOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
}

const { Text } = Typography;

function App() {
  const { data, isLoading } = useQuery(
    ["users"],
    (): Promise<User[]> =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const users = data;
  return (
    <>
      <Row>
        <Col>
          <div>
            {users?.map((user) => {
              return (
                <div key={user.id}>
                  <div>
                    <div>
                      <Image
                        width={200}
                        alt=""
                        src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                      />
                    </div>
                    <div>
                      <div>
                        <h2>{user.name}</h2>
                        <Text type="secondary">
                          <MailOutlined /> {user.email}
                        </Text>
                        <p>
                          <PhoneOutlined /> {user.phone}
                        </p>
                        <p>
                          <GlobalOutlined /> {user.website}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
      {isLoading === true && <div>Loading user data...</div>}
    </>
  );
}

export default App;
