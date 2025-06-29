import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export default function ProfilePage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-300">
      <div className="flex w-[850px] h-[80%] bg-white rounded-lg shadow-lg">
        <div className="h-[100%] w-1/10 bg-gray-200 rounded-l-lg"></div>
        <div className="h-[100%] w-8/10  rounded-r-lg  flex justify-center items-center flex-col">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt=""
            className="h-[150px] w-[150px] rounded-2xl"
          />
          <div>
            <div className="flex items-center justify-center mt-10">
              <FaUser className="h-12 w-12 p-3  border border-r-0 bg-gray-50 text-gray-600 rounded-l-xl" />
              <p className="h-12 w-[200px] text-xl border border-l-0 rounded-r-xl px-4 py-2  flex">
                User Name
              </p>
            </div>
            <div className="flex items-center justify-center mt-2">
              <MdEmail className="h-12 w-12 p-3  border border-r-0 bg-gray-50 text-gray-600 rounded-l-xl" />
              <p className="h-12 w-[200px] text-xl border border-l-0 rounded-r-xl px-4 py-2  flex">
                User Email
              </p>
            </div>
            <div className="flex items-center justify-center mt-2">
              <RiLockPasswordLine className="h-12 w-12 p-3  border border-r-0 bg-gray-50 text-gray-600 rounded-l-xl" />
              <p className="h-12 w-[200px] text-xl border border-l-0 rounded-r-xl px-4 py-2  flex">
                ********
              </p>
            </div>
          </div>
        </div>
        <div className="h-[100%] w-1/10 bg-gray-200 rounded-r-lg"></div>
      </div>
    </div>
  );
}
