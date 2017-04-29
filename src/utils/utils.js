/**
 * Created by ebundala on 4/29/2017.
 */
export function shortenText(text,length) {
    if (text.length > (length||18)) {
        return text.substr(0, length||18) + '…';
    } else {
        return text;
    }
}