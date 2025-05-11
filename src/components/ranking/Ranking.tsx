export default function Ranking() {
  const users = [
    {
      id: 1,
      name: "Emily Jones",
      points: 1234,
      avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    },
    {
      id: 2,
      name: "David Lee",
      points: 987,
      avatar: "https://randomuser.me/api/portraits/men/40.jpg",
    },
    {
      id: 3,
      name: "Sophia Williams",
      points: 876,
      avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    },
    {
      id: 4,
      name: "Michael Chen",
      points: 765,
      avatar: "https://randomuser.me/api/portraits/men/83.jpg",
    },
    {
      id: 5,
      name: "Mia Davis",
      points: 654,
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    },
    {
      id: 6,
      name: "Emily Jones",
      points: 1234,
      avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    },
    {
      id: 7,
      name: "David Lee",
      points: 987,
      avatar: "https://randomuser.me/api/portraits/men/40.jpg",
    },
    {
      id: 8,
      name: "Sophia Williams",
      points: 876,
      avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    },
    {
      id: 9,
      name: "Michael Chen",
      points: 765,
      avatar: "https://randomuser.me/api/portraits/men/83.jpg",
    },
    {
      id: 10,
      name: "Mia Davis",
      points: 654,
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-100 py-4 px-6">
          <h2 className="text-2xl font-bold text-gray-800">Top Users</h2>
        </div>

        <ul className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {users.map((user, index) => (
            <li
              key={user.id}
              className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition"
            >
              <span className="text-gray-500 text-lg font-semibold w-6 text-center">
                {index + 1}.
              </span>
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={user.avatar}
                alt={`Avatar de ${user.name}`}
              />
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-medium text-gray-800">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-600">{user.points} points</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
