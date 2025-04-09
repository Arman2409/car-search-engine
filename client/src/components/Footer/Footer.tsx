const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-1 fixed bottom-0 w-full">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Arman Ghazaryan. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;