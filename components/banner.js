


const Banner = (props) => {
    return <div className="{styles.container}">
        <h1 className="">
            <span className="text-3xl font-bold underline bg-slate-600">Coffee </span>
            <span className="{styles.title2}">Connoisseur</span>
        </h1>
        <p className="{styles.subTitle}">Discover your local coffee shops!</p>
        <button className="bg-gray-700" onClick = {props.handleOnClick}>{props.buttonText}</button>
    </div>
}

export default Banner;