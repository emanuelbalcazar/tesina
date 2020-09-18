/**
 * @class Util
 * @author Emanuel Balcazar
 */
class Util {

    /**
     * Creates an instance of Util.
     * @memberof Util
     */
    constructor() { };

    /**
     * @param  {Equation} eq equation from database
     * @return normalized equation
     * @memberof Util
     */
    normalizeEquation(eq) {
        let selectors = [];

        if (eq.site && eq.site.selectors) {
            selectors = eq.site.selectors.map(selector => {
                return { selector: selector.selector, section: selector.section };
            });
        }

        let record = {
            equation: {
                id: eq.id,
                q: eq.query.q || "",
                siteSearch: eq.site.site || "",
                siteSearchFilter: eq.query.siteSearchFilter || "i",
                start: eq.start || 1
            },
            selectors: selectors
        }

        return record;
    }
}

module.exports = Util;
