import axiosInstance from "@/api/AxiosInstance";
import { useEffect, useState } from "react";

type TCard = {
  imageURL: string;
  name: string;
  about: string;
  _id: string;
};

const getData = async () => {
  try {
    const { data } = await axiosInstance.get("/listings");
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return []; // Return an empty array in case of an error
  }
};
const Home = () => {
  const [data, setData] = useState<TCard[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getData();
        setData(allData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-5">
      {Array.isArray(data) &&
        data.map((card) => (
          <div
            className="card card-side shadow-xl w-full relative"
            key={card._id}
          >
            <figure>
              <img
                src={card.imageURL}
                // src="https://images.pexels.com/photos/20377280/pexels-photo-20377280/free-photo-of-eine-alte-windmuhle.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Album"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{card.name}</h2>
              <p>{card.about}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 absolute top-0 right-3 cursor-pointer text-blue-600"
                onClick={() => {
                  console.log(card._id);
                }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
