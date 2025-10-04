import { useState } from "react";
import { GetStaticProps } from "next";
import Header from "@/components/layout/Header";
import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import { UserProps, UserData } from "@/interfaces";

interface UsersPageProps {
  initialUsers: UserProps[];
}

const Users: React.FC<UsersPageProps> = ({ initialUsers }) => {
  const [users, setUsers] = useState<UserProps[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = (newUserData: UserData) => {
    const newUser: UserProps = {
      ...newUserData,
      id: newUserData.id || Date.now(),
    };
    setUsers([newUser, ...users]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Users</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add User
          </button>
        </div>
        <div className="space-y-6">
          {users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <UserModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddUser}
        />
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users: UserProps[] = await response.json();

    return {
      props: {
        initialUsers: users,
      },
    };
  } catch (error) {
    return {
      props: {
        initialUsers: [],
      },
    };
  }
};

export default Users;
