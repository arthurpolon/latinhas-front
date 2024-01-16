import Image from "next/image";

const Header = () => {
  return (
    <header className="w-screen bg-[#232120]">
      <div className="container">
        <Image
          src="/logo.png"
          width={150}
          height={70}
          priority
          alt="Company logo"
          className="object-contain"
        />
      </div>
    </header>
  );
};

export default Header;
