var url = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=5733cfe169044d3bb4ae73313206992f"

export async function FetchNews(data) {
    let results = fetch(`${url}&page=${data}`)
        .then(res => res.json())
        .then(results => {
            return results;
        }).catch(() => {
            console.log("Requested timeout")
            FetchNews(data);
        })

        return results;
}