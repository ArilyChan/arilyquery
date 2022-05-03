const Api = require("./lib/Api");

class ArilyQuery {
    /**
     * @param {string} base api网址，默认为"https://info.osustuff.ri.mk/api"
     */
    constructor(base) {
        this.api = new Api({ base });
    }

    /**
     * 获取玩家信息
     * @param {object} params api参数
     * @param {string} params.user 玩家名或id
     * @param {"bancho"|"sb"} [params.server] 服务器
     * @param {string} [params.mode] 游戏模式
     * @returns {string}
     */
    async stat(params) {
        try {
            let r = await this.api.getUser(params);
            return r?.toString() ?? "";
        }
        catch (ex) {
            return ex;
        }
    }

    /**
     * 获取最佳成绩
     * @param {object} params api参数
     * @param {string} params.user 玩家名或id
     * @param {"bancho"|"sb"} [params.server] 服务器
     * @param {string} [params.mode] 游戏模式
     * @param {object} [params.find] 搜索条件
     * @param {number} [params.find.id] 指定id
     * @param {number} [params.find.last] 过去多长小时内
     * @param {object} [params.find.date] 搜索日期范围
     * @param {{year:number, month:number, day:number}} [params.find.date.from] 起始日期
     * @param {{year:number, month:number, day:number}} [params.find.date.to] 截止日期
     * @param {"min"|"noraml"} [type] 输出成绩列表时每个成绩的形式，"min" = 最简形式（单行），"noraml" = 谱面行+成绩行（默认）
     * @param {number} [maxCount] 输出成绩列表时最多输出的成绩数量，不提供则无限制
     * @returns {string}
     */
    async best(params, type, maxCount) {
        try {
            let r = await this.api.getBest(params);
            if (params?.find?.id) return r?.getScore(params.find.id) ?? "";
            if (type === "min") return r?.toMinString(maxCount) ?? "";
            else return r?.toSimpleString(maxCount) ?? "";
        }
        catch (ex) {
            return ex;
        }
    }

    /**
     * 获取最佳成绩的统计信息
     * @param {object} params api参数
     * @param {string} params.user 玩家名或id
     * @param {"bancho"|"sb"} [params.server] 服务器
     * @param {string} [params.mode] 游戏模式
     * @param {object} [params.find] 搜索条件
     * @param {number} [params.find.last] 过去多长小时内
     * @param {object} [params.find.date] 搜索日期范围
     * @param {{year:number, month:number, day:number}} [params.find.date.from] 起始日期
     * @param {{year:number, month:number, day:number}} [params.find.date.to] 截止日期
     * @returns {string}
     */
    async beststat(params) {
        try {
            let r = await this.api.getBest(params);
            return r?.getStatistics() ?? "";
        }
        catch (ex) {
            return ex;
        }
    }

    /**
     * 获取玩家最近成绩
     * @param {object} params 参数
     * @param {string} params.user 玩家名或id
     * @param {"bancho"|"sb"} [params.server] 服务器
     * @param {string} [params.mode] 游戏模式
     * @returns {string}
     */
    async recent(params) {
        try {
            let r = await this.api.getRecentScore(params);
            return r.toString();
        }
        catch (ex) {
            return ex;
        }
    }

    /**
     * 按id获取具体成绩
     * @param {object} params 参数
     * @param {number} params.id 成绩id
     * @param {string} params.mode 游戏模式
     * @param {"bancho"|"sb"} [params.server] 服务器
     * @returns {string}
     */
    async score(params) {
        try {
            let r = await this.api.getScore(params);
            return r.toString();
        }
        catch (ex) {
            return ex;
        }
    }

}

module.exports = ArilyQuery;
