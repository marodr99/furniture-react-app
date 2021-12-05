import "./pageSwitcher.css"

const PageSwitcher = ({totalNumberOfPages, page, setPage}) => {
    return (
        <div className="page-switcher-container p-3">
            <label>Page</label>
            <input className="page-switcher-input-box" type="number" onChange={(e) => {
                if (isNaN(e.target.value) || e.target.value < 1 || e.target.value > totalNumberOfPages)
                    return
                setPage(e.target.value)
            }} value={page}/> of {totalNumberOfPages}
        </div>
    )
}

export default PageSwitcher;