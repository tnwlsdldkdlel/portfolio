export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-right">
            <p className="text-sm mb-2">
              데이터와 측정 도구를 통해 비즈니스 문제를 해결하는 퍼포먼스 엔지니어
            </p>
            <p className="text-xs text-gray-600">© {currentYear} All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

