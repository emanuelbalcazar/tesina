/**
 * Normalize search results
 * @param  {Array} records
 * @return normalized articles
 */
async function normalize(records, originalParams) {

    let results = originalParams;

    results.nextPage = {
        totalResults: records.queries.nextPage[0].totalResults,
        startIndex: records.queries.nextPage[0].startIndex
    };

    results.items = [];
    results.items = records.items.map(item => {
        return {
            title: item.title,
            link: item.link,
            snippet: item.snippet || '',
            metatags: item.pagemap.metatags
        }
    });

    return results;
}

module.exports.normalize = normalize;
