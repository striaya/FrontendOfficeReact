export default function Header() {
    return (
        <header className="bg-yellow shadow px-4 py-3 flex items-center justify-between">
            <button className="md:hidden">
                Menu
            </button>
            <h1 className="font-semibold text-lg">Administrator</h1>
        </header >
    )
}