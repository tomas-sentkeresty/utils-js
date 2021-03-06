import world from '../world';

export default function Schema(obj) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
        throw new Error('api-obj');
    }
    this.rules = obj;
}
Schema.prototype = {
    prepareValidate: function(o) {
        if (Object.prototype.toString.call(o) !== '[object Object]') {
            throw new Error('api-o');
        }
        var err = {};
        for (var k in this.rules) {
            if (this.rules.hasOwnProperty(k)) {
                var rule = this.rules[k];
                var v = o[k];
                if (typeof(rule.prepare) === 'function') {
                    v = rule.prepare(v, o);
                    o[k] = v;
                }
                if (rule.validate && !rule.validate(v, o)) {
                    err[k] = true;
                }
            }
        }
        return err;
    },
    clean: function(o) {
        if (Object.prototype.toString.call(o) !== '[object Object]') {
            throw new Error('api-o');
        }
        var tmp = {};
        for (var k in this.rules) {
            if (this.rules.hasOwnProperty(k)) {
                tmp[k] = o[k];
            }
        }
        return tmp;
    }
};
if (!world.Cor) world.Cor = {};
world.Cor.Schema = Schema;
