import "./App.css";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
}

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
      {isLoading === true && <div>Loading user data...</div>}
      <div className="div">
        {users?.map((user) => {
          return (
            <div key={user.id}>
              <div>
                <div>
                  <img
                    src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                  />
                </div>
                <div>
                  <div>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{user.website}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
