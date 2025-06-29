function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 px-2 text-center w-full min-h-[60px] flex flex-col items-center justify-center border-t border-gray-700 shadow-inner">
            <p className="copyright">© 2025 Esboço Alóctone. Transformando vidas através da tecnologia e diversidade cultural. 🇧🇷</p>
            <p>Todos os direitos reservados.</p>
            <a
                href="https://www.esbocoalocone.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-blue-300 hover:text-blue-400 transition-colors underline"
            >
                Visite nosso site
            </a>
        </footer>
    )
}
export default Footer;