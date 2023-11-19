import { useState } from 'react';
import { Link } from 'react-router-dom'
 
function Create(){
    const [longUrlInput, setLongUrlInput] = useState("");

    function handleInput(event){
        setLongUrlInput(event.target.value);
    }

    const [isLoading, setIsloading] = useState(false);
    const [shortUrl, setShortUrl] = useState("");
    const [showCopyBtn, setShowCopyBtn] = useState(false);
    function handleCreate(){
        if(longUrlInput.length === 0) return;

        const getLocalToken = localStorage.getItem("localToken");

        setIsloading(true);
        setShowCopyBtn(false);
        document.getElementById("input_url").value = "Processing...";
        fetch("https://short.nonlnwza.xyz/api/create/short-url", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: longUrlInput,
                userToken: getLocalToken
            }),
        }).then(response => response.json()).then(response =>{
            setIsloading(false);
            document.getElementById("input_url").value = response.data.short_url;
            setShortUrl(response.data.short_url);
            setShowCopyBtn(true);
        });
    }

    function handleCopy(event){
        console.log(event.target.innerHTML)
        navigator.clipboard.writeText(shortUrl);
        event.target.innerHTML = `<i class="fa-solid fa-copy"></i> Copied`
        setTimeout(() => event.target.innerHTML = `<i class="fa-solid fa-copy"></i> Copy`, 3000);
    }



    return(
        <>
            <div className="hero min-h-screen">
				<div className="hero-content text-center glass rounded-2xl w-full">
					<div className="w-full my-5">
						<h1 className="text-3xl font-bold mb-2">Time to make your URL-Shorter</h1>
						{/* <p className='text-lg mb-1'>🤑 Have you ever felt like you didn{"'"}t know what to do with your money?  🤑</p>
						<p className='text-sm mb-5'>Just bring it to me. LOL</p> */}
                        <div className="flex-col">
                            <div>
                                <input type="text" placeholder="Paste Your Long URL here" className="input input-bordered input-error text-center w-full max-w-lg mr-2" onChange={(event) => handleInput(event)} id='input_url' />
                                {showCopyBtn ? 
                                    <button className="btn btn-neutral  text-white font-normal uppercase w-96 mt-3 md:w-28 md:mt-0 md:mr-5" onClick={(e) => handleCopy(e)}>
                                        <i className="fa-solid fa-copy"></i> Copy
                                    </button>   
                                    :
                                    <></>
                                }
                                
                                {/* {isLoading ? 
                                    <span className="loading loading-bars loading-md mt-3 md:mt-0 md:ml-1"></span>
                                    :
                                    <></>
                                } */}
                            </div> 
                            <div>
                                <button className="btn bg-orange-600 btn-error text-white font-normal uppercase mt-3 w-96 md:w-44 md:mr-5" onClick={() => handleCreate()}>
                                    <i className="fa-solid fa-link"></i>Shorter
                                </button>
                                <Link to={"/dashboard"} className="btn btn-primary text-white font-normal uppercase mt-3 w-96 md:w-auto" >
                                    <i className="fa-solid fa-list-ul"></i> Dashboard
						        </Link>
                            </div>
                        </div>
					</div>
				</div>
			</div>
        </>
    );
}

export default Create;