/**
 * @Description check is given string is anagram of other strings
 * @param {String} str1 
 * @param {String} str2 
 * @returns {Boolean} true/false
 */
exports.isAnagram = (str1, str2) => {
    try {
        if (str1.length !== str2.length) {
            return false;
        } else if (str1.split('').sort().join('') == str2.split('').sort().join('')) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }

};