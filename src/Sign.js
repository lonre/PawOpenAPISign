import sha256 from 'js-sha256'
import 'url-search-params-polyfill'

@registerDynamicValueClass
class Sign {
    static identifier = "me.wanglong.PawExtensions.Sign";
    static title = "Open API Sign";
    static help = "https://paw.cloud/docs/extensions/create-dynamic-value";
    static inputs = [
        DynamicValueInput('key', 'Key', "SecureValue")
    ]

    evaluate(context) {
        const requestUuid = context.getCurrentRequest().id;
        const dv = new DynamicValue('com.luckymarmot.RequestRawBodyDynamicValue', {
            request: requestUuid,
        });
        const body = decodeURIComponent(dv.getEvaluatedString());
        const params = new URLSearchParams(body);
        params.sort();
        const toSign = this.paramsString(params) + '&key=' + this.key;
        const hash = sha256.create();
        hash.update(toSign);
        return hash.hex().toUpperCase();
    }

    paramsString(params) {
        var query = [];
        for (var key of params.keys()) {
            query.push(key + '=' + params.get(key));
        }
        return query.join('&');
    };
}
