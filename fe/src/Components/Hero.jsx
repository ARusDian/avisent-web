import COVER_IMAGE from "../assets/turetgun.jpg";

const Hero = () => {
  return (
    <div className="bg-[#F2F4F8]">
      <div className="flex mx-auto">
        <div className="flex flex-wrap items-center justify-between py-4 px-6">
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-3xl font-bold font-roboto mb-4">AvianSentry</h1>
            <p className="text-lg text-justify">
              Produk AviSent yang akan dibuat merupakan turret mencakup kumpulan
              fungsi dan fitur yang akan diintegrasikan ke dalam sistem. Produk
              ini dirancang untuk mendeteksi keberadaan hama dengan menggunakan
              teknologi Internet of Things (IoT). Lingkup produk ini mencakup
              berbagai aspek, termasuk fungsionalitas dan karakteristik yang
              akan diaplikasikan dalam sistemnya.
            </p>
          </div>

          <div className="w-full md:w-1/2 p-4 flex justify-center">
            <img
              src={COVER_IMAGE}
              alt="COVER_IMAGE"
              className="max-w-full h-auto rounded-lg shadow-lg "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
