export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0b0b0f]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-zinc-400 md:grid-cols-4 md:px-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">CineFlix</h3>
          <p>Premium streaming experiences for bold stories and unforgettable nights.</p>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">Company</h4>
          <ul className="space-y-2">
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">Help</h4>
          <ul className="space-y-2">
            <li>FAQ</li>
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">Need help?</h4>
          <p>Questions? Contact us at support@cineflix.demo</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-zinc-500">
        © 2026 CineFlix. Demo content for educational portfolio use.
      </div>
    </footer>
  )
}
