/**
 * Normalize extracted results
 * @param  {Array} records
 * @return normalized articles
 */
async function normalize(records, originalParams) {
    let results = originalParams;

    console.log(JSON.stringify(records, null, 3))

    return records;
}

module.exports.normalize = normalize;
