class utils {
    /**
     * 整数每3位加逗号
     * @param {number} n 
     * @returns {string}
     */
    static format_number(n) {
        const b = parseInt(n).toString();
        const len = b.length;
        if (len <= 3) return b;
        const r = len % 3;
        return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
    }

    /**
     * 日期格式化输出
     * @param {Date} date 
     * @returns {string}
     */
    static format_time(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const dates = date.getDate();
        const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const day = date.getDay();
        let hour = date.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let seconds = date.getSeconds();
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return year + '年' + month + '月' + dates + '日(' + arr[day] + ") " + hour + ':' + minutes + ':' + seconds;
    }

    /**
     * 时长格式化输出
     * @param {number} play_time 秒数
     * @returns {string}
     */
    static getUserTimePlayed(play_time) {
        const s = parseInt(play_time);
        if (s <= 0) return "从来没玩过";
        const day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
        const hour = Math.floor((s - day * 24 * 3600) / 3600);
        const minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
        const second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
        let output = "";
        if (day > 0) output = output + day + "天";
        if (hour > 0) output = output + hour + "小时";
        if (minute > 0) output = output + minute + "分";
        if (second > 0) output = output + second + "秒";
        return output;
    }

    /**
     * 对比时间
     * @param {Date} startTime 
     * @param {Date} endTime 
     * @returns {String}
     */
    static getCompareInterval(startTime, endTime = new Date()) {
        const interval = endTime.getTime() - startTime.getTime();
        if (interval <= 0) return "现在";
        if (interval > (30 * 24 * 3600 * 1000)) return this.format_time(startTime);
        const day = Math.floor(interval / (24 * 3600 * 1000));
        if (day > 0) return day + " 天前";
        const hour = Math.floor(interval / (3600 * 1000));
        if (hour > 0) return hour + " 小时前";
        const minute = Math.floor(interval / (60 * 1000));
        if (minute > 0) return minute + " 分钟前";
        return this.format_time(startTime);
    }

    /**
     * 获取指定数据的统计信息
     * @param {Array<number>} arr 数据
     * @param {Array<number>} lines 标准线，用于统计符合不同标准线的数据个数，默认按数据大小平均分为5段
     * @return {{min: number, max: number, sum: number, average: number, cv: number, groups: {lines: Array<number>, counts: Array<number>}}}
     */
    static getNumArrayStatistics(arr, lines = []) {
        if (arr.length <= 0) return null;
        let min = Math.min(...arr);
        let max = Math.max(...arr);
        if (lines.length <= 0) {
            lines.push(max);
            lines.push((max - min) / 4 * 3 + min);
            lines.push((max + min) / 2);
            lines.push((max - min) / 4 + min);
            lines.push(min);
        }
        let counts = lines.map(() => 0);
        let sum = 0;
        arr.map((num) => {
            sum += num;
            lines.map((value, index) => {
                if (num >= value) counts[index] += 1;
            });
        });
        let average = sum / arr.length;
        let cv = Math.sqrt(arr.reduce((total, num) => {
            return total += Math.pow(num - average, 2);
        }, 0) / arr.length) / average * 100;
        return { min, max, sum, average, cv, groups: { lines, counts } };
    }

    /**
     * 获取Mods的统计信息
     * @param {Array<Array<string>>} arr 
     * @param {Array<number>} pp 
     * @return {{mods_count, totalMods_count}} mods_count: {mod: {count, maxpp}}, totalMods_count: {mods: {count, maxpp}}
     */
    static getModsArrayStatistics(arr, pp) {
        /** 单mod统计 */
        let mods_count = { None: { count: 0, maxpp: 0 } };
        /** 整体mod统计 */
        let totalMods_count = { None: { count: 0, maxpp: 0 } };
        arr.map((mods, index) => {
            if (mods.length <= 0) {
                mods_count.None.count += 1;
                if (pp[index] > mods_count.None.maxpp) mods_count.None.maxpp = pp[index];
                totalMods_count.None.count += 1;
                if (pp[index] > totalMods_count.None.maxpp) totalMods_count.None.maxpp = pp[index];
            }
            else {
                mods.map((mod) => {
                    if (!mods_count[mod]) {
                        mods_count[mod] = { count: 1, maxpp: pp[index] }
                    }
                    else {
                        mods_count[mod].count += 1;
                        if (pp[index] > mods_count[mod].maxpp) mods_count[mod].maxpp = pp[index];
                    }
                });
                let totalmods = mods.join("");
                if (!totalMods_count[totalmods]) totalMods_count[totalmods] = { count: 1, maxpp: pp[index] };
                else {
                    totalMods_count[totalmods].count += 1;
                    if (pp[index] > totalMods_count[totalmods].maxpp) totalMods_count[totalmods].maxpp = pp[index];
                }
            }
        });
        if (mods_count.None.count === 0) delete mods_count.None;
        if (totalMods_count.None.count === 0) delete totalMods_count.None;
        return { mods_count, totalMods_count };
    }
}

module.exports = utils;
