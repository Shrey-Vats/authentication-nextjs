export const ProfilePage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-300">
      <div className="flex w-[850px] h-[80%] bg-white rounded-lg shadow-lg">
        <div className="h-[100%] w-2/5 bg-gray-200 rounded-l-lg"></div>
        <div className="h-[100%] w-3/5  rounded-r-lg ">
          <form className="flex flex-col justify-center items-center p-10">
            <div className="flex justify-center items-center w-[100%] mt-10">
              <hr className="w-full bg-gray-900 px-4" />
              <h2 className="text-2xl font-bold px-4">Profile</h2>
              <hr className="w-full bg-gray-900 px-4" />
            </div>
            {/* Profile details can be added here */}
          </form>
        </div>
      </div>
    </div>
  );
};
