const moment = require('moment');

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
                q: this.getQueryFromDate(eq.dateToFind, eq.site.dateFormat),
                siteSearch: eq.site.site || "",
                siteSearchFilter: eq.siteSearchFilter || "i",
                start: eq.start || 1
            },
            selectors: selectors
        }

        return record;
    }

    getQueryFromDate(dateToFind, dateFormat) {
        let date = moment(dateToFind).locale('es').format(dateFormat);
        return date.toLowerCase();
    }
}

module.exports = Util;
