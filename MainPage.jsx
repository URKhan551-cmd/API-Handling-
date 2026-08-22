
// option = ["a", "b", "c", "d"]

const MainPage = ({onClick}) => {
    return (
        <>
        <div className="bg-gray-600 text-fuchsia-700 m-3 p-4 rounded-lg">
            <button type="button" onClick={onClick}>Go To Weather Board</button>
        </div>
        </>
    )
}
export default MainPage
