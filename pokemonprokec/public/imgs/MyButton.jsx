const MyButton = ({ to }) => {

    return (
        <a href={`/${to}`}>
            <button className="my-button">
                 {to === '' ? "Home" : to}
            </button>
        </a>
    )
}

export default MyButton;