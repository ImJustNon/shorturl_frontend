import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard(){
    const [localToken, setLocalToken] = useState("");
    
    useEffect(() =>{
        const getLocalToken = localStorage.getItem("localToken");
        setLocalToken(getLocalToken);
    }, []);

    const [refresh, setRefresh] = useState(0);
    const [shortUrlDataList, setShortUrlDataList] = useState([]);
    useEffect(() =>{
        const getLocalToken = localStorage.getItem("localToken");
        fetch("https://short.nonlnwza.xyz/api/get/user-history", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userToken: getLocalToken
            }),
        }).then(response => response.json()).then(response =>{
            if(response.status === "SUCCESS"){
                if(response.data.results.length !== 0){
                    const sortNewestToOldest = (response.data.results).sort((a, b) => parseInt(b.id) - parseInt(a.id));
                    setShortUrlDataList(sortNewestToOldest);
                }
                else {
                    setShortUrlDataList([{
                        id: "NotFound",
                        short_url: "NotFound",
                        use_count: "NotFound",
                        last_use: "NotFound",
                        original_url: "NotFound",
                        create_at: "NotFound",
                    }]);
                }
            }
            
        });
    }, [refresh]);

    function handleDelete(url_id){
        const getLocalToken = localStorage.getItem("localToken");
        fetch("https://short.nonlnwza.xyz/api/delete/user-history", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userToken: getLocalToken,
                url_id: url_id
            }),
        }).then(response => response.json()).then(response =>{
            setRefresh(Math.random());
        });
    }

    return(
        <>
            <div className="hero min-h-screen">
				<div className="hero-content text-center glass rounded-lg flex-col w-96 md:w-full mt-10">
                    <div>
                        <Link to={"/"} className="btn btn-primary text-white font-normal uppercase mt-3 md:w-auto mb-3" >
                            <i className="fa-solid fa-plus"></i> Create More
                        </Link>
                    </div>
                    <div className="w-96 px-3 mb-5 md:w-full md:px-0">
                        <div className="overflow-x-auto">
                            
                            
                            <table className="table table-xs md:table-md">
                                <thead>
                                    <tr className="md:text-md text-white">
                                        <th>ID</th> 
                                        <th>Short URL</th> 
                                        <th>Use Count</th> 
                                        <th>Last Use</th> 
                                        <th>Original URL</th> 
                                        <th>Create At</th> 
                                    </tr>
                                </thead> 
                                <tbody className="text-black">
                                    {shortUrlDataList.map((shortDetail, i) =>(
                                        <tr key={i}>
                                            <td>{shortDetail.id}</td> 
                                            <td>
                                                <a href={shortDetail.short_url} className="hover:underline" target="_blank">{shortDetail.short_url}</a>
                                            </td> 
                                            <td>{shortDetail.use_count}</td> 
                                            <td>{new Date(parseInt(shortDetail.last_use)).toLocaleString()}</td> 
                                            <td>
                                                <a href={shortDetail.original_url} className="hover:underline" target="_blank">{shortDetail.original_url}</a>
                                            </td> 
                                            <td>{new Date(parseInt(shortDetail.create_at)).toLocaleString()}</td> 
                                            <td>
                                                <div>
                                                    <button onClick={() => handleDelete(shortDetail.url_id)}><i className="fa-solid fa-trash"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody> 
                                <tfoot>
                                    <tr className="md:text-md text-white">
                                        <th>ID</th> 
                                        <th>Short URL</th> 
                                        <th>Use Count</th> 
                                        <th>Last Use</th> 
                                        <th>Original URL</th> 
                                        <th>Create At</th> 
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
					</div>
				</div>
			</div>
        </>
    );
}

export default Dashboard;