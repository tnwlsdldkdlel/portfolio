import Image from "next/image";

export default function InfoSection() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* 프로필 사진 */}
      <div className="mb-16 flex justify-center">
        <div className="relative border-8 border-black transition-colors hover:border-[#35D399] w-[450px] h-[450px] rounded-full overflow-hidden">
          <Image
            src="/images/profile.jpg"
            alt="프로필 사진"
            fill
            className="object-cover"
            priority
            sizes="450px"
          />
        </div>
      </div>
      <div className="text-[45px] font-bold text-text">안녕하세요. <span className="text-[#35D399] font-bold">오수진입니다.</span></div>
      <div className="text-[45px] font-bold text-text">여기에서 제가 작업 중인 것들을 확인할 수 있습니다.</div>
    </div>
  );
}

