const Gallery = ({
  imageType,
  setImageType,
  images,
  imageTypes,
  setSelectedImageArray,
}) => {
  return (
    <div className="w-full h-[300px] bg-gradient-to-t from-[#283747] shadow-lg rounded-lg px-3 py-3 flex flex-col">
      <div className=" text-gray-300 font-semibold flex justify-between items-center">
        <span>Gallery</span>
        <div className="flex flex-row gap-3 items-center text-gray-400 text-sm">
          {imageTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setImageType(type)}
              className={`${
                imageType === type ? "text-gray-300" : "text-gray-400"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-full px-3 py-3 flex flex-row gap-3 overflow-y-auto">
        {imageType === "Backdrops" &&
          images?.backdrops?.map((image) => (
            <button
              onClick={() => setSelectedImageArray(images?.backdrops)}
              className="flex-shrink-0 w-[300px] h-full overflow-hidden rounded-md shadow-lg hover:scale-105 duration-300"
              key={image.id}
            >
              <img
                className="w-full h-full object-cover"
                src={image?.file_path}
                alt=""
              />
            </button>
          ))}
        {imageType === "Posters" &&
          images?.posters?.map((image) => (
            <button
              onClick={() => setSelectedImageArray(images?.posters)}
              className="flex-shrink-0 w-[300px] h-full overflow-hidden rounded-md shadow-lg hover:scale-105 duration-300"
              key={image.id}
            >
              <img
                className="w-full h-full object-cover"
                src={image?.file_path}
                alt=""
              />
              <span>{image?.file_path}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default Gallery;
