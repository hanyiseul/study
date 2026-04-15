import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, createUser } from './api/usersApi';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function App() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  const mutation = useMutation({
    mutationFn: createUser,

    onMutate: async function (newName) {
      await queryClient.cancelQueries({ queryKey: ['users'] });

      const previous = queryClient.getQueryData(['users']);

      queryClient.setQueryData(['users'], function (old) {
        return [
          ...old,
          { id: Date.now(), name: newName }
        ];
      });

      return { previous };
    },

    onError: function (error, newName, context) {
      queryClient.setQueryData(['users'], context.previous);
    },

    onSettled: function () {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  function handleAdd(name) {
    mutation.mutate(name);
  }

  if (isLoading) return <p>로딩 중</p>;
  if (error) return <p>오류 발생</p>;

  return (
    <div>
      <UserForm onAdd={handleAdd} />

      {mutation.isPending && <p>저장 중</p>}

      <UserList users={data} />
    </div>
  );
}

export default App;