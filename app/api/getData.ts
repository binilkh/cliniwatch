export const getData = async(cityCode:string, days:string)=>{
    console.log("ds",cityCode)
    const API_END_POINT = `https://api.corona-zahlen.org/districts/${cityCode}/history/cases/${days}`;
    return await fetch(API_END_POINT)
                .then(res => res.json())
                .then(res => {
                        return res.data[cityCode].history.reverse() ; 
                })    
    //return result;
}