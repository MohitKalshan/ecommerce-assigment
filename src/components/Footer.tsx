export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-600 text-sm">
            © {currentYear} Product Dashboard. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span>Built with React & Redux</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
