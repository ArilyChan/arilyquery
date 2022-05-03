const axios = require('axios');
const { Recent, User, Best } = require("./Structs");

class Api {
    /**
     * @param {object} options 设置
     * @param {string} options.base api网址，默认为"https://info.osustuff.ri.mk/api"
     */
    constructor(options) {
        this.base = options?.base ?? "https://info.osustuff.ri.mk/api";
    }

    /**
     * 获取玩家信息
     * @param {object} params 参数
     * @param {string} params.user 玩家名或id
     * @param {"bancho"|"sb"} [params.server] 服务器
     * @param {string} [params.mode] 游戏模式
     * @returns {User}
     */
    async getUser(params) {
        let user = params?.user;
        let server = params?.server;
        let mode = params?.mode;
        let sp = new URLSearchParams({ server });
        for (let key of sp.keys()) {
            if ((sp.get(key) === "undefined") || (sp.get(key) === "null")) sp.delete(key);
        }
        const response = await axios.get(`${this.base}/users/${user}/${mode || ''}`, {
            params: sp
        });
        if (!response?.data) throw "获取数据失败";
        if (response?.data?.error) throw response?.error?.message;
        // if (response?.data?.messages?.length > 0) throw response?.messages?.join("\n");
        if (!response?.data?.user) throw "查不到玩家 " + user + ((mode) ? "在 " + mode + " 下" : "") + " 的信息";
        return new User(response?.data?.user, server, mode);
    }

    /**
     * @param {{year:number, month:number, day:number}} d 
     * @returns {string}
     */
    date2urlparam(d) {
        if (!d) return undefined;
        return d.year + "-" + d.month + "-" + d.day;
    }

    /**
     * 获取最佳成绩
     * @param {object} params 参数
     * @param {string} params.user 玩家名或id
     * @param {"bancho"|"sb"} [params.server] 服务器
     * @param {string} [params.mode] 游戏模式
     * @param {object} [params.find] 搜索条件
     * @param {number} [params.find.id] 指定id
     * @param {number} [params.find.last] 过去多长小时内
     * @param {object} [params.find.date] 搜索日期范围
     * @param {{year:number, month:number, day:number}} [params.find.date.from] 起始日期
     * @param {{year:number, month:number, day:number}} [params.find.date.to] 截止日期
     * @returns {Best}
     */
    async getBest(params) {
        let user = params?.user;
        let server = params?.server;
        let mode = params?.mode;
        let find = (params?.find) ? {
            start: this.date2urlparam(params?.find?.date?.from),
            end: this.date2urlparam(params?.find?.date?.to),
            startHoursBefore: params?.find?.last,
            endHoursBefore: undefined
        } : {};
        let sp = new URLSearchParams({ server, ...find });
        for (let key of sp.keys()) {
            if ((sp.get(key) === "undefined") || (sp.get(key) === "null")) sp.delete(key);
        }
        const response = await axios.get(`${this.base}/best/${user}/${mode || ''}`, {
            params: sp
        });
        if (!response?.data) throw "获取数据失败";
        if (response?.data?.error) throw response?.error?.message;
        // if (response?.data?.messages?.length > 0) throw response?.messages?.join("\n");
        if (!response?.data?.scores || response?.scores?.length <= 0) throw "查不到玩家 " + user + ((mode) ? "在 " + mode + " 下" : "") + " 的bp";
        return new Best(response?.data, server, mode);
    }

    /**
     * 获取玩家最近成绩
     * @param {object} params 参数
     * @param {string} params.user 玩家名或id
     * @param {"bancho"|"sb"} [params.server] 服务器
     * @param {string} [params.mode] 游戏模式
     * @returns {Recent}
     */
    async getRecentScore(params) {
        let user = params?.user;
        let server = params?.server;
        let mode = params?.mode;
        let sp = new URLSearchParams({ server });
        for (let key of sp.keys()) {
            if ((sp.get(key) === "undefined") || (sp.get(key) === "null")) sp.delete(key);
        }
        const response = await axios.get(`${this.base}/recent/${user}/${mode || ''}`, {
            params: sp
        });
        if (!response?.data) throw "获取数据失败";
        if (response?.data?.error) throw response?.error?.message;
        // if (response?.data?.messages?.length > 0) throw response?.messages?.join("\n");
        if (!response?.data?.score) throw "查不到玩家 " + user + ((mode) ? "在 " + mode + " 下" : "") + " 的最近成绩";
        return new Recent(response?.data, server, mode);
    }

    /**
     * 按id获取具体成绩
     * @param {object} params 参数
     * @param {number} params.id 成绩id
     * @param {string} params.mode 游戏模式
     * @param {"bancho"|"sb"} [params.server] 服务器
     * @returns {Recent} Recent和Score返回结果格式相同，为了省事直接用Recent
     */
     async getScore(params) {
        let id = params?.id;
        let server = params?.server;
        let mode = params?.mode;
        let sp = new URLSearchParams({ server });
        for (let key of sp.keys()) {
            if ((sp.get(key) === "undefined") || (sp.get(key) === "null")) sp.delete(key);
        }
        const response = await axios.get(`${this.base}/scores/${mode}/${id}`, {
            params: sp
        });
        if (!response?.data) throw "获取数据失败";
        if (response?.data?.error) throw response?.error?.message;
        // if (response?.data?.messages?.length > 0) throw response?.messages?.join("\n");
        if (!response?.data?.user) throw "查不到id为 " + id + " 的成绩信息";
        return new Recent(response?.data, server, mode);
    }

}

module.exports = Api;
