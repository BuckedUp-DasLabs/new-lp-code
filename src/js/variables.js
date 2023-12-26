
const fetchUrl = `https://ar5vgv5qw5.execute-api.us-east-1.amazonaws.com/list/`;
const postUrl = `https://ar5vgv5qw5.execute-api.us-east-1.amazonaws.com/upsell/${urlParams.get("order_uuid")}`
const finishUrl = `https://ar5vgv5qw5.execute-api.us-east-1.amazonaws.com/upsell/${urlParams.get("order_uuid")}/finish`


export { fetchUrl, postUrl, finishUrl }