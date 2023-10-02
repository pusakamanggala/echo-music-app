import { Swiper, SwiperSlide } from "swiper/react";
import crackerIslandCover from "../img/banners/cracker-island.webp";
import melodramaCover from "../img/banners/melodrama.webp";
import myFutureCover from "../img/banners/my-future.webp";
import starboyCover from "../img/banners/starboy.webp";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// import required modules
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import useNavigateToAlbumDetails from "../hooks/useNavigateToAlbumDetails";

const Banner = () => {
  const navigateToAlbumDetails = useNavigateToAlbumDetails();

  // banner image, url, artis id
  const bannerData = [
    {
      img: melodramaCover,
      albumID: "2B87zXm9bOWvAJdkJBTpzF",
    },
    {
      img: myFutureCover,
      albumID: "3oxhQpF3Twbkl18oQYfnh5",
    },
    {
      img: crackerIslandCover,
      albumID: "3488fiYQcGSfkKKpr3ttCD",
    },
    {
      img: starboyCover,
      albumID: "2ODvWsOgouMbaA5xf0RkJe",
    },
  ];

  return (
    <section>
      <Swiper
        className="mySwiper rounded-lg"
        pagination={true}
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay, EffectFade]}
      >
        {bannerData.map((banner) => (
          <SwiperSlide key={banner.albumID}>
            <img
              src={banner.img}
              alt="banner"
              className="w-full object-cover sm:h-72 md:h-96 2xl:h-[500px] cursor-pointer"
              onClick={() => navigateToAlbumDetails(banner.albumID)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
